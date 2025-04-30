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
    // Arrange
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  it('should set auth user when given SET_AUTH_USER action', () => {
    // Arrange
    const initialState = null;
    const authUser = {
      id: 'user-1',
      name: 'ayyub',
      email: 'ayyub@test.com'
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser }
    };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    // Arrange
    const initialState = {
      id: 'user-1',
      name: 'ayyub',
      email: 'ayyub@test.com'
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER
    };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  it('should return current state for unknown action', () => {
    // Arrange
    const initialState = {
      id: 'user-1',
      name: 'ayyub'
    };
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });
});