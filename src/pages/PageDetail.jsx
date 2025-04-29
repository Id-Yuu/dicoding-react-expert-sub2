import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchThreadDetail,
  getUpVoteThreadDetail,
  getDownVoteThreadDetail,
  getClearVoteThreadDetail,
  fetchCreateComment,
  fetchUpVoteComment,
  fetchDownVoteComment,
  fetchClearVoteComment,
} from '@store/threadDesc/action';
import ThreadDetail from '@components/thread/detail';
import CommentInput from '@components/comments/input';
import CommentsList from '@components/comments/lists';
import PageNotFound from '@pages/PageNotFound';

const PageDetail = () => {
  const { threadId } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
  }, [threadId, dispatch]);

  const dispatchAction = (action, params = null) => () => {
    dispatch(params ? action(params) : action());
  };

  const onUpVoteThreadDetail = dispatchAction(getUpVoteThreadDetail);
  const onDownVoteThreadDetail = dispatchAction(getDownVoteThreadDetail);
  const onNeturalizeVoteThreadDetail = dispatchAction(getClearVoteThreadDetail);
  const onCommentSubmit = (content) => dispatchAction(fetchCreateComment, { content })();
  const onUpVoteComment = (id) => dispatchAction(fetchUpVoteComment, id)();
  const onDownVoteComment = (id) => dispatchAction(fetchDownVoteComment, id)();
  const onNeturalizeVoteComment = (id) => dispatchAction(fetchClearVoteComment, id)();

  if (!threadDetail) return <PageNotFound />;

  return (
    <div className="container mx-auto">
      <ThreadDetail
        {...threadDetail}
        authUser={authUser.id}
        upVoteThreadDetail={onUpVoteThreadDetail}
        downVoteThreadDetail={onDownVoteThreadDetail}
        neturalizeVoteThreadDetail={onNeturalizeVoteThreadDetail}
      />
      <CommentInput addComment={onCommentSubmit} />
      <span>Total Komentar - ({threadDetail.comments.length})</span>
      <CommentsList
        comments={threadDetail.comments}
        authUser={authUser.id}
        upVoteComment={onUpVoteComment}
        downVoteComment={onDownVoteComment}
        neturalizeVoteComment={onNeturalizeVoteComment}
      />
    </div>
  );
};

export default PageDetail;