import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer', () => {
  it('should return initial state when given by unknown action', () => {
    // Arrange
    const initialState = true;
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toBe(initialState);
  });

  it('should return true as default initial state when given undefined parameters', () => {
    // Arrange & Action
    const nextState = isPreloadReducer();

    // Assert
    expect(nextState).toBe(true);
  });

  it('should change isPreload state correctly when given SET_IS_PRELOAD action', () => {
    // Arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toBe(false);
  });

  it('should handle invalid payload in SET_IS_PRELOAD action', () => {
    // Arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {}, // Missing isPreload property
    };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toBe(undefined); // Should handle undefined gracefully
  });
});