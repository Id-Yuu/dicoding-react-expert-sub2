import { ActionType } from './action';

const leaderboardsReducer = (leaderboards = [], action = {}) => {
  const handlers = {
    [ActionType.RECEIVE_LEADERBOARDS]: () => action.payload.leaderboards,
    default: () => leaderboards
  };

  return (handlers[action.type] || handlers.default)();
};

export default leaderboardsReducer;