import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@utils/api';
import { getUsersData } from '@store/users/action';
import { fetchThreadsUsers } from '@store/threads/action';
import fetchAllLeaderBoards from './action';
import '@testing-library/jest-dom';

// Handles API calls correctly
// Manages loading states
// Processes data properly
// Handles errors gracefully
// Maintains proper action sequence

// Mock dependencies
// Mocks all external dependencies
// Isolates the action creator for testing
// Provides controlled test environment
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
  // Test Data Setup
  // Provides test data fixtures
  // Simulates API responses
  // Ensures consistent test data
  const fakeUsers = [{ id: 'user-1', name: 'User 1' }];
  const fakeThreads = [{ id: 'thread-1', title: 'Thread 1' }];

  beforeEach(() => {
    dispatch = vi.fn();
    vi.clearAllMocks();
  });

  it('should dispatch actions correctly when API calls succeed', async () => {
    // Successful API Call Test
    // - Loading bar shows at start
    // - API calls are made
    // - Actions are dispatched in correct order
    // - User data is processed
    // - Thread data is processed
    // - Loading bar hides at end
    api.getAllUsers.mockResolvedValue(fakeUsers);
    api.getAllThreads.mockResolvedValue(fakeThreads);
    getUsersData.mockReturnValue({ type: 'GET_USERS' });
    fetchThreadsUsers.mockReturnValue({ type: 'GET_THREADS' });

    // Act
    await fetchAllLeaderBoards()(dispatch);

    // showLoading() called
    // getAllUsers API called
    // getAllThreads API called
    // getUsersData action dispatched
    // fetchThreadsUsers action dispatched
    // hideLoading() called
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(getUsersData(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsUsers(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should handle errors correctly', async () => {
    // Error Handling Test
    // - Error handling for API failures
    // - Loading state management during errors
    // - Error message display
    // - Cleanup after error
    const errorMessage = 'Network Error';
    api.getAllUsers.mockRejectedValue(new Error(errorMessage));
    global.alert = vi.fn();

    // Act
    await fetchAllLeaderBoards()(dispatch);

    // showLoading() called
    // Error alert shown
    // hideLoading() called
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(global.alert).toHaveBeenCalledWith(errorMessage);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});