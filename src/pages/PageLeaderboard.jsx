import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboards } from '@store/leaderboard/action';
import LeaderBoardItem from '@components/leaderboard';

const PageLeaderboard = () => {
  const dispatch = useDispatch();
  const { leaderboards = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  return (
    <div className="hero max-w-md m-auto">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <caption className="text-center text-xl font-bold">Leaderboard</caption>
          <thead>
            <tr>
              <th>No</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {/* number={1,2,3,4} */}
            {leaderboards.map(({ user, score }, index) => (
              <LeaderBoardItem key={user.id} number={index + 1} user={user} score={score} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageLeaderboard;