import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

const getThreadDetail = (threadDetail) => ({
  type: ActionType.RECEIVE_THREAD_DETAIL,
  payload: {
    threadDetail,
  },
});

const upVoteThreadDetailActionCreator = (userId) => ({
  type: ActionType.UP_VOTE_THREAD_DETAIL,
  payload: {
    userId,
  },
});

const downVoteThreadDetailActionCreator = (userId) => ({
  type: ActionType.DOWN_VOTE_THREAD_DETAIL,
  payload: {
    userId,
  },
});

const neutralizeVoteThreadDetailActionCreator = (userId) => ({
  type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
  payload: {
    userId,
  },
});

const createCommentActionCreator = (comment) => ({
  type: ActionType.CREATE_COMMENT,
  payload: {
    comment,
  },
});

const upVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.UP_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const downVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.DOWN_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const neutralizeVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.NEUTRALIZE_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const fetchThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const threadDetail = await api.getThreadDetail(threadId);
    dispatch(getThreadDetail(threadDetail));
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

const getUpVoteThreadDetail = () => async (dispatch, getState) => {
  const { threadDetail, authUser } = getState();
  dispatch(upVoteThreadDetailActionCreator(authUser.id));
  try {
    await api.upVoteThread(threadDetail.id);
  } catch (error) {
    alert(error.message);
  }
};

const getDownVoteThreadDetail = () => async (dispatch, getState) => {
  const { threadDetail, authUser } = getState();
  dispatch(downVoteThreadDetailActionCreator(authUser.id));
  try {
    await api.downVoteThread(threadDetail.id);
  } catch (error) {
    alert(error.message);
  }
};

const getClearVoteThreadDetail = () => async (dispatch, getState) => {
  const { threadDetail, authUser } = getState();
  dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
  try {
    await api.neutralizeThreadVote(threadDetail.id);
  } catch (error) {
    alert(error.message);
  }
};

const fetchCreateComment = ({ content }) => async (dispatch, getState) => {
  dispatch(showLoading());
  const { threadDetail } = getState();
  try {
    const comment = await api.createComment({
      content,
      threadId: threadDetail.id,
    });
    dispatch(createCommentActionCreator(comment));
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

const fetchUpVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  dispatch(upVoteCommentActionCreator(commentId, authUser.id));
  try {
    await api.upVoteComment(threadDetail.id, commentId);
  } catch (error) {
    alert(error.message);
  }
};

const fetchDownVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  dispatch(downVoteCommentActionCreator(commentId, authUser.id));
  try {
    await api.downVoteComment(threadDetail.id, commentId);
  } catch (error) {
    alert(error.message);
  }
};

const fetchClearVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  dispatch(neutralizeVoteCommentActionCreator(commentId, authUser.id));
  try {
    await api.neutralVoteComment(threadDetail.id, commentId);
  } catch (error) {
    alert(error.message);
  }
};

export {
  ActionType,
  fetchThreadDetail,
  getUpVoteThreadDetail,
  getDownVoteThreadDetail,
  getClearVoteThreadDetail,
  fetchCreateComment,
  fetchUpVoteComment,
  fetchDownVoteComment,
  fetchClearVoteComment,
};