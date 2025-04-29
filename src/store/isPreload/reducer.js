import { ActionType } from './action';

const isPreloadReducer = (isPreload = true, action = {}) => {
  const handlers = {
    [ActionType.SET_IS_PRELOAD]: () => action.payload.isPreload,
    default: () => isPreload
  };

  return (handlers[action.type] || handlers.default)();
};

export default isPreloadReducer;