import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
  ERROR_RECEIVE_USERS: 'ERROR_RECEIVE_USERS',
};

const getUsersData = (users) => ({
  type: ActionType.RECEIVE_USERS,
  payload: {
    users,
  },
});

const isRegisterUser = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

export { ActionType, getUsersData, isRegisterUser };