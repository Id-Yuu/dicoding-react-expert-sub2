import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

describe('leaderboardsReducer', () => {
  it('should return initial state when given unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return initial state when given undefined action', () => {
    // Arrange
    const initialState = [];

    // Action
    const nextState = leaderboardsReducer(initialState);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return leaderboards when given RECEIVE_LEADERBOARDS action', () => {
    // Arrange
    const initialState = [];
    const leaderboards = [
      {
        user: {
          id: 'user-1',
          name: 'User Test 1',
          email: 'user1@test.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 100,
      },
      {
        user: {
          id: 'user-2',
          name: 'User Test 2',
          email: 'user2@test.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 85,
      },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards,
      },
    };

    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(leaderboards);
  });

  it('should maintain existing state when given invalid action payload', () => {
    // Arrange
    const initialState = [
      {
        user: {
          id: 'user-1',
          name: 'Existing User',
          email: 'existing@test.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 50,
      },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {}, // Invalid payload (missing leaderboards)
    };

    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });
});