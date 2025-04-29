import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { userShape } from '@components/thread/item';
import { VoteButton } from '@components/votebutton';
import postedAt from '@utils/config';

const ThreadDetail = (props) => {
  const {
    id,
    title,
    body,
    owner,
    category,
    createdAt,
    upVotesBy,
    downVotesBy,
    upVoteThreadDetail,
    downVoteThreadDetail,
    neturalizeVoteThreadDetail,
    authUser,
  } = props;

  return (
    <div className="card-body">
      <p>#{category}</p>
      <h4 className='card-title'>{title}</h4>
      <p>{parse(body)}</p>
      <div className="card-actions">
        <VoteButton
          id={id}
          authUser={authUser}
          upVote={upVoteThreadDetail}
          downVote={downVoteThreadDetail}
          neturalizeVote={neturalizeVoteThreadDetail}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
        />
        <p>
          {postedAt(createdAt)} - Dibuat Oleh {owner.name}
        </p>
      </div>
    </div>
  );
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVoteThreadDetail: PropTypes.func.isRequired,
  downVoteThreadDetail: PropTypes.func.isRequired,
  neturalizeVoteThreadDetail: PropTypes.func.isRequired,
};

export default ThreadDetail;