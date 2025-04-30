import { ActionType } from './action';

const leaderboardsReducer = (leaderboards = [], action = {}) => {
  switch (action.type) {
  case 'RECEIVE_LEADERBOARDS':
    return action.payload?.leaderboards ?? leaderboards;
  default:
    return leaderboards;
  }
};

export default leaderboardsReducer;