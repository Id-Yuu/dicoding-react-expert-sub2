import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { VoteButton } from './index';

describe('VoteButton Component', () => {
  const defaultProps = {
    id: 'vote-1',
    upVote: vi.fn(),
    downVote: vi.fn(),
    neturalizeVote: vi.fn(),
    upVotesBy: [],
    downVotesBy: [],
    authUser: 'user-1',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render vote button correctly', () => {
    // Arrange
    render(<VoteButton {...defaultProps} />);

    // Assert
    expect(screen.getByLabelText('upvote')).toBeInTheDocument();
    expect(screen.getByLabelText('downvote')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // votes count
  });

  it('should handle upvote click correctly when not upvoted', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<VoteButton {...defaultProps} />);
    const upvoteButton = screen.getByLabelText('upvote');

    // Act
    await user.click(upvoteButton);

    // Assert
    expect(defaultProps.upVote).toHaveBeenCalledWith('vote-1');
    expect(defaultProps.downVote).not.toHaveBeenCalled();
    expect(defaultProps.neturalizeVote).not.toHaveBeenCalled();
  });

  it('should handle downvote click correctly when not downvoted', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<VoteButton {...defaultProps} />);
    const downvoteButton = screen.getByLabelText('downvote');

    // Act
    await user.click(downvoteButton);

    // Assert
    expect(defaultProps.downVote).toHaveBeenCalledWith('vote-1');
    expect(defaultProps.upVote).not.toHaveBeenCalled();
    expect(defaultProps.neturalizeVote).not.toHaveBeenCalled();
  });

  it('should neutralize vote when clicking upvote button while already upvoted', async () => {
    // Arrange
    const user = userEvent.setup();
    const props = {
      ...defaultProps,
      upVotesBy: ['user-1'],
    };
    render(<VoteButton {...props} />);
    const upvoteButton = screen.getByLabelText('upvote');

    // Act
    await user.click(upvoteButton);

    // Assert
    expect(defaultProps.neturalizeVote).toHaveBeenCalledWith('vote-1');
    expect(defaultProps.upVote).not.toHaveBeenCalled();
    expect(defaultProps.downVote).not.toHaveBeenCalled();
  });

  it('should neutralize vote when clicking downvote button while already downvoted', async () => {
    // Arrange
    const user = userEvent.setup();
    const props = {
      ...defaultProps,
      downVotesBy: ['user-1'],
    };
    render(<VoteButton {...props} />);
    const downvoteButton = screen.getByLabelText('downvote');

    // Act
    await user.click(downvoteButton);

    // Assert
    expect(defaultProps.neturalizeVote).toHaveBeenCalledWith('vote-1');
    expect(defaultProps.upVote).not.toHaveBeenCalled();
    expect(defaultProps.downVote).not.toHaveBeenCalled();
  });

  it('should display correct vote counts', () => {
    // Arrange
    const props = {
      ...defaultProps,
      upVotesBy: ['user-1', 'user-2'],
      downVotesBy: ['user-3'],
    };

    // Act
    render(<VoteButton {...props} />);

    // Assert
    expect(screen.getByTestId('upvote-count')).toHaveTextContent('2');
    expect(screen.getByTestId('downvote-count')).toHaveTextContent('1');
  });
});