import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

// Initial state management
// Default values
// State transitions
// Invalid inputs
// Unknown actions

describe('isPreloadReducer', () => {
  it('should return initial state when given by unknown action', () => {
    // Unknown Action Handling
    const initialState = true;
    const action = { type: 'UNKNOWN_ACTION' };

    // Tests reducer's response to unknown actions
    // Verifies state immutability
    // Ensures initial state is preserved
    // Tests with initialState = true
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toBe(initialState);
  });

  it('should return true as default initial state when given undefined parameters', () => {
    // Default Initial State
    const nextState = isPreloadReducer();

    // Verifies default state initialization
    // Tests reducer without parameters
    // Ensures default state is 'true'
    // Handles undefined state gracefully
    expect(nextState).toBe(true);
  });

  it('should change isPreload state correctly when given SET_IS_PRELOAD action', () => {
    // Set Preload State
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    // Tests setting preload state to false
    // Verifies correct action type handling
    // Tests payload processing
    // Ensures state updates correctly
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toBe(false);
  });

  it('should handle invalid payload in SET_IS_PRELOAD action', () => {
    // Invalid Payload Handling
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {}, // Missing isPreload property
    };

    // Tests error handling for invalid payloads
    // Verifies missing payload properties
    // Ensures graceful handling of 'undefined' values
    // Tests edge cases in payload structure
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toBe(undefined); // Should handle undefined gracefully
  });
});