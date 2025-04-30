import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@utils/api';
import { getUsersData } from '@store/users/action';
import { fetchThreadsUsers } from '@store/threads/action';
import fetchAllLeaderBoards from './action';


// - Mocks all external dependencies
// - Tests successful API calls
// - Tests error handling
// - Verifies loading state management
// - Checks dispatch sequence
// - Uses proper arrange/act/assert pattern


// Mock dependencies
vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn()
}));

vi.mock('@utils/api', () => ({
  default: {
    getAllUsers: vi.fn(),
    getAllThreads: vi.fn()
  }
}));

vi.mock('@store/users/action.js', () => ({
  getUsersData: vi.fn()
}));

vi.mock('@store/threads/action', () => ({
  fetchThreadsUsers: vi.fn()
}));

describe('fetchAllLeaderBoards', () => {
  let dispatch;
  const fakeUsers = [{ id: 'user-1', name: 'User 1' }];
  const fakeThreads = [{ id: 'thread-1', title: 'Thread 1' }];

  beforeEach(() => {
    dispatch = vi.fn();
    vi.clearAllMocks();
  });

  it('should dispatch actions correctly when API calls succeed', async () => {

    api.getAllUsers.mockResolvedValue(fakeUsers);
    api.getAllThreads.mockResolvedValue(fakeThreads);
    getUsersData.mockReturnValue({ type: 'GET_USERS' });
    fetchThreadsUsers.mockReturnValue({ type: 'GET_THREADS' });

    // Act
    await fetchAllLeaderBoards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(getUsersData(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsUsers(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should handle errors correctly', async () => {

    const errorMessage = 'Network Error';
    api.getAllUsers.mockRejectedValue(new Error(errorMessage));
    global.alert = vi.fn();

    // Act
    await fetchAllLeaderBoards()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(global.alert).toHaveBeenCalledWith(errorMessage);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});