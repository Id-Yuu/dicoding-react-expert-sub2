import { ActionType } from './action';

const usersReducer = (users = [], action = {}) => {
  const handlers = {
    [ActionType.RECEIVE_USERS]: () => action.payload.users,
    default: () => users
  };

  return (handlers[action.type] || handlers.default)();
};

export default usersReducer;