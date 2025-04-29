import { ActionType } from './action';

const handleVoteArray = (array, userId) => {
  return array.includes(userId)
    ? array.filter((id) => id !== userId)
    : array.concat(userId);
};

const handleVotes = (threadDetail, userId, voteType) => {
  const { upVotesBy, downVotesBy } = threadDetail;

  if (voteType === 'up') {
    return {
      upVotesBy: handleVoteArray(upVotesBy, userId),
      downVotesBy: downVotesBy.filter((id) => id !== userId)
    };
  }

  if (voteType === 'down') {
    return {
      upVotesBy: upVotesBy.filter((id) => id !== userId),
      downVotesBy: handleVoteArray(downVotesBy, userId)
    };
  }

  return {
    upVotesBy: upVotesBy.filter((id) => id !== userId),
    downVotesBy: downVotesBy.filter((id) => id !== userId)
  };
};

const handleCommentVote = (comments, commentId, userId, voteType) => {
  return comments.map((comment) => {
    if (comment.id !== commentId) return comment;

    return {
      ...comment,
      ...handleVotes(comment, userId, voteType)
    };
  });
};

const threadDetailReducer = (threadDetail = null, action = {}) => {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;

  case ActionType.UP_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      ...handleVotes(threadDetail, action.payload.userId, 'up')
    };

  case ActionType.DOWN_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      ...handleVotes(threadDetail, action.payload.userId, 'down')
    };

  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      ...handleVotes(threadDetail, action.payload.userId, 'neutral')
    };

  case ActionType.CREATE_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments]
    };

  case ActionType.UP_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: handleCommentVote(
        threadDetail.comments,
        action.payload.commentId,
        action.payload.userId,
        'up'
      )
    };

  case ActionType.DOWN_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: handleCommentVote(
        threadDetail.comments,
        action.payload.commentId,
        action.payload.userId,
        'down'
      )
    };

  case ActionType.NEUTRALIZE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: handleCommentVote(
        threadDetail.comments,
        action.payload.commentId,
        action.payload.userId,
        'neutral'
      )
    };

  default:
    return threadDetail;
  }
};

export default threadDetailReducer;