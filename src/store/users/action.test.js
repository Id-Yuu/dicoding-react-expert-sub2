import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '@utils/api';
import { getUsersData, isRegisterUser, ActionType } from './action';

// Tests for user-related actions:
// 1. Create and receive users action
// 2. Register new user with API
// 3. Handle registration errors
// 4. Verify loading states
// 5. Check action dispatch sequence

// Mock external dependencies
// Loading bar functionality
vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn()
}));

// API calls
vi.mock('@utils/api', () => ({
  default: {
    register: vi.fn(),
    getAllUsers: vi.fn()
  }
}));

// Test Case: Action Creation
describe('User Actions', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
    vi.clearAllMocks();
  });

  // Verifies correct action object creation
  describe('getUsersData', () => {
    // Mock data for testing
    // Checks action type and payload structure
    const fakeUsers = [
      {
        id: 'user-1',
        name: 'Ayyub',
        email: 'ayyub@mail.com',
        avatar: 'avatar-url'
      }
    ];

    it('should create action to receive users', () => {
      // Act
      const action = getUsersData(fakeUsers);

      // Assert
      expect(action).toEqual({
        type: ActionType.RECEIVE_USERS,
        payload: {
          users: fakeUsers
        }
      });
    });
  });

  describe('isRegisterUser', () => {
    // Test Data for credentials
    const userCredentials = {
      name: 'Ayyub',
      email: 'ayyub@mail.com',
      password: 'password123'
    };

    it('should handle successful registration', async () => {
      // handle Successful Registration
      api.register.mockResolvedValueOnce({ user: userCredentials });

      // Act
      await isRegisterUser(userCredentials)(dispatch);

      // Loading indicator shows/hides
      // API called with correct credentials
      // Proper sequence of operations
      expect(showLoading).toHaveBeenCalled();
      expect(api.register).toHaveBeenCalledWith(userCredentials);
      expect(hideLoading).toHaveBeenCalled();
    });

    it('should handle registration error', async () => {
      // Error Handling
      const error = new Error('Registration failed');
      api.register.mockRejectedValueOnce(error);
      const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

      // Act
      await isRegisterUser(userCredentials)(dispatch);

      // Error message display
      // Loading state management
      // API error handling
      expect(showLoading).toHaveBeenCalled();
      expect(api.register).toHaveBeenCalledWith(userCredentials);
      expect(mockAlert).toHaveBeenCalledWith('Registration failed');
      expect(hideLoading).toHaveBeenCalled();

      // Cleanup
      mockAlert.mockRestore();
    });

    it('should maintain correct action sequence', async () => {
      // Ensures operations happen in correct order
      const calls = [];
      dispatch.mockImplementation(() => {
        calls.push('dispatch');
      });
      // Dispatch call order
      // State management flow
      api.register.mockResolvedValueOnce({ user: userCredentials });

      await isRegisterUser(userCredentials)(dispatch);

      // Loading indicator sequence
      expect(showLoading).toHaveBeenCalledBefore(hideLoading);
      expect(calls).toEqual(['dispatch', 'dispatch']); // showLoading and hideLoading
    });
  });
});