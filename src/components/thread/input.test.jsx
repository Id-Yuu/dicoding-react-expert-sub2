import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ThreadInput from './input';

describe('ThreadInput Component', () => {
  it('should render thread input form correctly', () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);

    // Assert
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Thread' })).toBeInTheDocument();
  });

  it('should handle input changes correctly', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<ThreadInput addThread={() => {}} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const categoryInput = screen.getByPlaceholderText('Category');
    const bodyInput = screen.getByPlaceholderText('Body');

    // Act
    await user.type(titleInput, 'Test Title');
    await user.type(categoryInput, 'Test Category');
    await user.type(bodyInput, 'Test Body Content');

    // Assert
    expect(titleInput).toHaveValue('Test Title');
    expect(categoryInput).toHaveValue('Test Category');
    expect(bodyInput).toHaveValue('Test Body Content');
  });

  it('should call addThread function with correct data when form is submitted', async () => {
    // Arrange
    const mockAddThread = vi.fn();
    const user = userEvent.setup();
    render(<ThreadInput addThread={mockAddThread} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const categoryInput = screen.getByPlaceholderText('Category');
    const bodyInput = screen.getByPlaceholderText('Body');
    const submitButton = screen.getByRole('button', { name: 'Add Thread' });

    // Act
    await user.type(titleInput, 'Test Title');
    await user.type(categoryInput, 'Test Category');
    await user.type(bodyInput, 'Test Body Content');
    await user.click(submitButton);

    // Assert
    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Test Title',
      category: 'Test Category',
      body: 'Test Body Content'
    });
  });

  it('should validate required fields before submission', async () => {
    // Arrange
    const mockAddThread = vi.fn();
    const user = userEvent.setup();
    render(<ThreadInput addThread={mockAddThread} />);

    const submitButton = screen.getByRole('button', { name: 'Add Thread' });

    // Act
    await user.click(submitButton);

    // Assert
    expect(mockAddThread).not.toHaveBeenCalled();
  });
});