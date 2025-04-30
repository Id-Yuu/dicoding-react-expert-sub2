import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CommentInput from './input';

describe('CommentInput Component', () => {
  it('should render comment input form correctly', () => {
    // Arrange
    render(<CommentInput addComment={() => {}} />);

    // Assert
    expect(screen.getByPlaceholderText('Add your comment here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(screen.getByText('Tambahkan Komentar')).toBeInTheDocument();
  });

  it('should handle comment input change correctly', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<CommentInput addComment={() => {}} />);
    const commentInput = screen.getByPlaceholderText('Add your comment here...');

    // Act
    await user.type(commentInput, 'Test Comment');

    // Assert
    expect(commentInput).toHaveValue('Test Comment');
  });

  it('should call addComment function when form is submitted', async () => {
    // Arrange
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
    // Arrange
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
    // Arrange
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