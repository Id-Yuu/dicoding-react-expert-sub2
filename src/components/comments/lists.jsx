import React from 'react';
import PropTypes from 'prop-types';
import { CommentItem, commentShape } from './item';

const CommentsList = (props) => {
  const {
    comments,
    authUser,
    upVoteComment,
    downVoteComment,
    neturalizeVoteComment,
  } = props;
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          upVote={upVoteComment}
          downVote={downVoteComment}
          neturalizeVote={neturalizeVoteComment}
        />
      ))}
    </ul>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
  neturalizeVoteComment: PropTypes.func.isRequired,
};

export default CommentsList;