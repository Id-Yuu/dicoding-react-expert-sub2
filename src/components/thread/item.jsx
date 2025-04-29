import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import postedAt from '@utils/config';
import { VoteButton } from '@components/votebutton';

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  threadOwner: PropTypes.shape(userShape).isRequired,
};

const ThreadItem = ({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVote,
  downVote,
  neturalizeVote,
  threadOwner,
  authUser,
}) => {
  const navigate = useNavigate();
  const onThreadClick = () => navigate(`/thread/${id}`);

  const renderVoteButton = () => (
    <VoteButton
      id={id}
      authUser={authUser}
      upVote={upVote}
      downVote={downVote}
      neturalizeVote={neturalizeVote}
      upVotesBy={upVotesBy}
      downVotesBy={downVotesBy}
    />
  );

  return (
    <div
      className="card-body bg-base-300 shadow mb-2 cursor-pointer"
    >
      <div className="gap-2" onClick={onThreadClick}>
        <p>#{category}</p>
        <h4 className="card-title">{title}</h4>
        <div className="content">{parse(body)}</div>
      </div>
      <div className="card-actions">
        {renderVoteButton()}
        <p>
          Total Komentar {totalComments}, pada {postedAt(createdAt)} - Dibuat Oleh {threadOwner.name}
        </p>
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  ...threadItemShape,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neturalizeVote: PropTypes.func.isRequired,
};

export { ThreadItem, threadItemShape, userShape };