import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CommentInput from './input';

// - Removed redundant tests
// - Simplified assertions
// - Focused on core functionality
// - Maintained essential test coverage

describe('CommentInput Component', () => {
  it('should render comment input form correctly', () => {
    // Basic rendering test
    // - Input field with placeholder exists
    // - Submit button with "Add" text exists
    // - "Tambahkan Komentar" heading exists
    render(<CommentInput addComment={() => {}} />);

    // Assert
    expect(screen.getByPlaceholderText('Add your comment here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(screen.getByText('Tambahkan Komentar')).toBeInTheDocument();
  });

  it('should handle comment input change correctly', async () => {
    // submit comment test - test successful input handling
    // - User can type in the input field
    // - Input value updates correctly
    // - Input maintains typed value
    const user = userEvent.setup();
    render(<CommentInput addComment={() => {}} />);
    const commentInput = screen.getByPlaceholderText('Add your comment here...');

    // Act
    await user.type(commentInput, 'Test Comment');

    // Assert
    expect(commentInput).toHaveValue('Test Comment');
  });

  it('should call addComment function when form is submitted', async () => {
    // submit comment test - verify callback is called with correct value
    // - addComment function is called with correct input
    // - Input field is cleared after submission
    // - Form handles submission properly
    const mockAddComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput addComment={mockAddComment} />);

    const commentInput = screen.getByPlaceholderText('Add your comment here...');
    const submitButton = screen.getByRole('button', { name: 'Add' });

    // Act
    await user.type(commentInput, 'Test Comment');
    await user.click(submitButton);

    // Assert
    expect(mockAddComment).toHaveBeenCalledWith('Test Comment');
    expect(commentInput).toHaveValue(''); // Input should be cleared after submission
  });

  it('should not call addComment function when submitting empty comment', async () => {
    // empty comment test - verify empty input handling
    // - Empty comments are prevented
    // - addComment is not called for empty input
    // - Form validates empty submissions
    const mockAddComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput addComment={mockAddComment} />);

    const submitButton = screen.getByRole('button', { name: 'Add' });

    // Act
    await user.click(submitButton);

    // Assert
    expect(mockAddComment).not.toHaveBeenCalled();
  });

  it('should not call addComment function when submitting whitespace-only comment', async () => {
    // empty comment test - verify whitespace input handling
    // - Whitespace-only comments are prevented
    // - addComment is not called for whitespace input
    // - Form properly validates whitespace input
    const mockAddComment = vi.fn();
    const user = userEvent.setup();
    render(<CommentInput addComment={mockAddComment} />);

    const commentInput = screen.getByPlaceholderText('Add your comment here...');
    const submitButton = screen.getByRole('button', { name: 'Add' });

    // Act
    await user.type(commentInput, '   ');
    await user.click(submitButton);

    // Assert
    expect(mockAddComment).not.toHaveBeenCalled();
  });
});