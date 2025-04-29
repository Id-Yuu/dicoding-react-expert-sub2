import React from 'react';
import PropTypes from 'prop-types';
import { ThreadItem, threadItemShape } from './item';

const ThreadsList = (props) => {
  const { threads, upVote, downVote, neturalizeVote } = props;

  return (
    <div className="card">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upVote={upVote}
          downVote={downVote}
          neturalizeVote={neturalizeVote}
        />
      ))}
    </div>
  );
};

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neturalizeVote: PropTypes.func.isRequired,
};

export default ThreadsList;