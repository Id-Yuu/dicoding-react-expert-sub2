import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from '@store/authUser/reducer';
import isPreloadReducer from '@store/isPreload/reducer';
import leaderboardsReducer from '@store/leaderboard/reducer';
import threadReducer from '@store/threads/reducer';
import threadDetailReducer from '@store/threadDesc/reducer';
import usersReducer from '@store/users/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;