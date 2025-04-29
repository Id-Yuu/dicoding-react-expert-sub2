import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { userShape } from '@components/thread/item';
import { VoteButton } from '@components/votebutton';
import postedAt from '@utils/config';

export const CommentItem = (props) => {
  const {
    id,
    content,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
    upVote,
    downVote,
    neturalizeVote,
    authUser,
  } = props;
  return (
    <li className="list-row border-accent-content">
      <div className="avatar">
        <img src={owner.avatar} alt={owner.name} />
      </div>
      <div className="list-col-grow">
        <div className="header">
          <span>{owner.name}</span>
          <span className="text-xs italic opacity-60"> - dibuat pada {postedAt(createdAt)}</span>
        </div>
        <div className="text-xs uppercase font-semibold opacity-60 py-8">{parse(content)}</div>
        <VoteButton
          id={id}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
          neturalizeVote={neturalizeVote}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
        />
      </div>
    </li>
  );
};

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neturalizeVote: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};

export { commentShape };
