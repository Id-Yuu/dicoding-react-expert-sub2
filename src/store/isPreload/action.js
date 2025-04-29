import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAuth } from '@store/authUser/action';
import api from '@utils/api';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

const setIsPreload = (isPreload) => ({
  type: ActionType.SET_IS_PRELOAD,
  payload: {
    isPreload,
  },
});

const isPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const authUser = await api.getOwnProfile();
    dispatch(setAuth(authUser));
  } catch (error) {
    dispatch(setAuth(null));
  } finally {
    dispatch(setIsPreload(false));
    dispatch(hideLoading());
  }
};

export { ActionType, setIsPreload, isPreloadProcess };