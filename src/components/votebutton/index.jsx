import React from 'react';
import PropTypes from 'prop-types';

const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-up"
    viewBox="0 0 16 16"
  >
    <path fillRule="evenodd" d="M8 0l-6.5 6.5h4v5h5v-5h4L8 0z" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-down"
    viewBox="0 0 16 16"
  >
    <path fillRule="evenodd" d="M8 16l6.5-6.5h-4v-5H8v5H4L8 16z" />
  </svg>
);

export const VoteButton = ({
  id,
  upVote,
  downVote,
  neturalizeVote,
  upVotesBy,
  downVotesBy,
  authUser,
}) => {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const handleVoteClick = (voteType) => () => {
    const voteActions = {
      up: () => upVote(id),
      down: () => downVote(id),
      neutral: () => neturalizeVote(id)
    };
    voteActions[voteType]();
  };

  return (
    <div className="vote-button">
      <button
        type="button"
        aria-label='upvote'
        onClick={handleVoteClick(isUpVoted ? 'neutral' : 'up')}
      >
        <ArrowUpIcon />
      </button>
      <span data-testid="upvote-count">{upVotesBy.length}, </span>

      <button
        type="button"
        aria-label='downvote'
        onClick={handleVoteClick(isDownVoted ? 'neutral' : 'down')}
      >
        <ArrowDownIcon />
      </button>
      <span data-testid="downvote-count">{downVotesBy.length}</span>
    </div>
  );
};

VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neturalizeVote: PropTypes.func.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
};