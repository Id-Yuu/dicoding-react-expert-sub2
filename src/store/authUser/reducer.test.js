import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import '@testing-library/jest-dom';
import { ActionType } from './action';

// - Initial state handling
// - Setting auth user data
// - Unsetting auth user data
// - Unknown action handling

describe('authUserReducer', () => {
  it('should return null as initial state', () => {
    // Initial State Test
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    // Verifies default state initialization
    // Ensures reducer returns 'null' when state is undefined
    // Handles unknown action types properly
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toBeNull();
  });

  it('should set auth user when given SET_AUTH_USER action', () => {
    // Set Auth User Test
    const initialState = null;

    // Data structure tested:
    const authUser = {
      id: 'user-1',
      name: 'ayyub',
      email: 'ayyub@test.com'
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser }
    };

    // ests user authentication state setting
    // Verifies correct handling of SET_AUTH_USER action
    // Ensures user data is properly stored
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    // Unset Auth User Test
    const initialState = {
      id: 'user-1',
      name: 'ayyub',
      email: 'ayyub@test.com'
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER
    };

    // Tests user logout/authentication clearing
    // Verifies UNSET_AUTH_USER action properly clears state
    // Ensures state returns to null
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toBeNull();
  });

  it('should return current state for unknown action', () => {
    // Unknown Action Test
    const initialState = {
      id: 'user-1',
      name: 'ayyub'
    };
    const action = { type: 'UNKNOWN' };

    // Tests reducer's handling of unknown action types
    // Ensures state immutability
    // Verifies current state is preserved
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });
});