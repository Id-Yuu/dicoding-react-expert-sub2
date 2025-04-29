import { ActionType } from './action';

const handleVoteArray = (array, userId) => {
  return array.includes(userId)
    ? array.filter((id) => id !== userId)
    : array.concat(userId);
};

const handleVotes = (thread, { threadId, userId }, voteType) => {
  if (thread.id !== threadId) return thread;

  const { upVotesBy, downVotesBy } = thread;

  const votes = {
    up: {
      upVotesBy: handleVoteArray(upVotesBy, userId),
      downVotesBy: downVotesBy.filter((id) => id !== userId)
    },
    down: {
      upVotesBy: upVotesBy.filter((id) => id !== userId),
      downVotesBy: handleVoteArray(downVotesBy, userId)
    },
    neutral: {
      upVotesBy: upVotesBy.filter((id) => id !== userId),
      downVotesBy: downVotesBy.filter((id) => id !== userId)
    }
  };

  return {
    ...thread,
    ...votes[voteType]
  };
};

const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;

  case ActionType.CREATE_THREAD:
    return [action.payload.thread, ...threads];

  case ActionType.UP_VOTE_THREAD:
    return threads.map((thread) =>
      handleVotes(thread, action.payload, 'up')
    );

  case ActionType.DOWN_VOTE_THREAD:
    return threads.map((thread) =>
      handleVotes(thread, action.payload, 'down')
    );

  case ActionType.NETURALIZE_VOTE_THREAD:
    return threads.map((thread) =>
      handleVotes(thread, action.payload, 'neutral')
    );

  default:
    return threads;
  }
};

export default threadsReducer;