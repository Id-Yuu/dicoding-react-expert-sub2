import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from '@components/thread/item';

const LeaderBoardItem = ({ user, score, number }) => {
  return (
    <tr>
      <td>{number}</td>
      <th>
        <div className="avatar">
          <img src={user.avatar} alt="avatar-image" className="avatar-image" />
        </div>
      </th>
      <td>{user.name}</td>
      <td>{score}</td>
    </tr>
  );
};

LeaderBoardItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
};

export default LeaderBoardItem;