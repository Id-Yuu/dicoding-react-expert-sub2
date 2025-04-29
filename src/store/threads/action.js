import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NETURALIZE_VOTE_THREAD: 'NETURALIZE_VOTE_THREAD',
};

const fetchThreadsUsers = (threads) => ({
  type: ActionType.RECEIVE_THREADS,
  payload: {
    threads,
  },
});

const createThreadActionCreator = (thread) => ({
  type: ActionType.CREATE_THREAD,
  payload: {
    thread,
  },
});

const upVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.UP_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

const downVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.DOWN_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

const neturalizeVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.NETURALIZE_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

const fetchAddThread = ({ title, body, category }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

const fetchUpVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
};

const fetchDownVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
};

const fetchClearVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neturalizeVoteThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neturalizeVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
};

export {
  ActionType,
  fetchThreadsUsers,
  fetchAddThread,
  fetchUpVoteThread,
  fetchDownVoteThread,
  fetchClearVoteThread,
};