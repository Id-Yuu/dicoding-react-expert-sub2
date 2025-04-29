import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

const setAuth = (authUser) => ({
  type: ActionType.SET_AUTH_USER,
  payload: {
    authUser,
  },
});

const clearAuth = () => ({
  type: ActionType.UNSET_AUTH_USER,
});

const fetchSetAuth = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      if (!token) {
        throw new Error('Failed to retrieve token');
      }
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuth(authUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

const fetchClearAuth = () => {
  return async (dispatch) => {
    dispatch(clearAuth());
    api.putAccessToken('');
  };
};

export {
  ActionType,
  setAuth,
  clearAuth,
  fetchSetAuth,
  fetchClearAuth,
};