import { ActionType } from './action';

const authUserReducer = (authUser = null, action = {}) => {
  const handlers = {
    [ActionType.SET_AUTH_USER]: () => action.payload.authUser,
    [ActionType.UNSET_AUTH_USER]: () => null,
    default: () => authUser
  };

  return (handlers[action.type] || handlers.default)();
};

export default authUserReducer;