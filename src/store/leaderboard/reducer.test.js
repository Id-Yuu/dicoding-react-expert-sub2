import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

// Handles all action types correctly
// Maintains data integrity
// Processes complex data structures
// Handles edge cases gracefully
// Preserves state when needed

describe('leaderboardsReducer', () => {
  it('should return initial state when given unknown action', () => {
    // Unknown Action Handling
    const initialState = []; // Initial state is an empty array
    const action = { type: 'UNKNOWN_ACTION' }; // Action with an unknown type

    // Tests reducer's behavior with unknown action types
    // Verifies state immutability
    // Ensures initial state is preserved
    // Initial state is an empty array []
    const nextState = leaderboardsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return initial state when given undefined action', () => {
    // Undefined Action Handling
    const initialState = [];

    // Tests default parameter handling
    // Verifies reducer works without an action
    // Ensures initial state is returned
    // Handles edge case of missing action
    const nextState = leaderboardsReducer(initialState); // No action provided
    expect(nextState).toEqual(initialState); // Initial state is an empty array []
  });

  it('should return leaderboards when given RECEIVE_LEADERBOARDS action', () => {
    // Receiving Leaderboards
    const initialState = [];

    // Tests successful leaderboard data reception
    // Verifies correct state update with valid payload
    // Ensures action type is handled properly
    // Tests data structure handling:
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
    expect(nextState).toEqual(leaderboards);
  });

  it('should maintain existing state when given invalid action payload', () => {
    // Invalid Payload Handling
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

    // Tests error handling for invalid payloads
    // Verifies state preservation on invalid data
    // Ensures existing data isn't lost
    // Handles missing payload properties
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {}, // Invalid payload (missing leaderboards)
    };

    // Action
    const nextState = leaderboardsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });
});