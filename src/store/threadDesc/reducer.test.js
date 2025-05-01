import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';
import '@testing-library/jest-dom';

// Maintains data integrity
// Handles all actions correctly
// Manages nested state updates
// Processes votes properly
// Handles comments effectively

describe('threadDetailReducer', () => {
  // Initial Setup
  // - Sets up test data fixtures and initial state
  const initialState = null;
  const mockThreadDetail = {
    id: 'thread-1',
    title: 'Test Thread',
    body: 'Test Body',
    upVotesBy: ['user-1'],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Test Comment',
        upVotesBy: [],
        downVotesBy: []
      }
    ]
  };

  // - Unknown Action Test
  it('should return initial state when given unknown action', () => {
    // Tests reducer behavior with unknown actions
    // Verifies state immutability
    // Ensures initial state preservation
    const action = { type: 'UNKNOWN' };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toBe(initialState);
  });

  // - Thread detail receiving
  it('should return thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    // Tests thread detail data reception
    // Verifies correct state update
    // Validates data structure handling
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: mockThreadDetail }
    };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(mockThreadDetail);
  });

  // Thread voting (up/down/neutral)
  // - Tests upvoting functionality
  // - Tests downvoting functionality
  // - Tests vote neutralization
  // - Verifies vote arrays management
  it('should handle UP_VOTE_THREAD_DETAIL correctly', () => {
    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: { userId: 'user-2' }
    };
    const nextState = threadDetailReducer(mockThreadDetail, action);
    expect(nextState.upVotesBy).toContain('user-2');
    expect(nextState.downVotesBy).not.toContain('user-2');
  });

  it('should handle DOWN_VOTE_THREAD_DETAIL correctly', () => {
    const action = {
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: { userId: 'user-1' }
    };
    const nextState = threadDetailReducer(mockThreadDetail, action);
    expect(nextState.downVotesBy).toContain('user-1');
    expect(nextState.upVotesBy).not.toContain('user-1');
  });

  it('should handle NEUTRALIZE_VOTE_THREAD_DETAIL correctly', () => {
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
      payload: { userId: 'user-1' }
    };
    const nextState = threadDetailReducer(mockThreadDetail, action);
    expect(nextState.upVotesBy).not.toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });

  // Comment creation
  // - Tests adding new comments
  // - Verifies comment data structure
  // - Ensures proper comment integration
  it('should handle CREATE_COMMENT correctly', () => {
    const newComment = {
      id: 'comment-2',
      content: 'New Comment'
    };
    const action = {
      type: ActionType.CREATE_COMMENT,
      payload: { comment: newComment }
    };
    const nextState = threadDetailReducer(mockThreadDetail, action);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  // Comment voting
  // - Tests comment upvoting
  // - Tests comment downvoting
  // - Tests comment vote neutralization
  // - Verifies comment vote state management
  it('should handle comment votes correctly', () => {
    // Test upvote comment
    const upvoteAction = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' }
    };
    let nextState = threadDetailReducer(mockThreadDetail, upvoteAction);
    expect(nextState.comments[0].upVotesBy).toContain('user-1');

    // Test downvote comment
    const downvoteAction = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' }
    };
    nextState = threadDetailReducer(nextState, downvoteAction);
    expect(nextState.comments[0].downVotesBy).toContain('user-1');
    expect(nextState.comments[0].upVotesBy).not.toContain('user-1');

    // Test neutralize vote
    const neutralizeAction = {
      type: ActionType.NEUTRALIZE_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' }
    };
    nextState = threadDetailReducer(nextState, neutralizeAction);
    expect(nextState.comments[0].upVotesBy).not.toContain('user-1');
    expect(nextState.comments[0].downVotesBy).not.toContain('user-1');
  });
});