import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { getUsersData } from '../users/action';
import { fetchThreadsUsers } from '../threads/action';

const fetchAllLeaderBoards = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(getUsersData(users));
      dispatch(fetchThreadsUsers(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export default fetchAllLeaderBoards;