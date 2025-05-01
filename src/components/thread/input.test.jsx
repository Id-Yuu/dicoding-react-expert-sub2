import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ThreadInput from './input';

describe('ThreadInput Component', () => {
  it('should render thread input form correctly', () => {
    // Form Rendering Test
    render(<ThreadInput addThread={() => {}} />);

    // Title input exists
    // Category input exists
    // Body textarea exists
    // Submit button exists with "Add Thread" text
    // All form elements are accessible

    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Thread' })).toBeInTheDocument();
  });

  it('should handle input changes correctly', async () => {
    // Input Change Handling
    const user = userEvent.setup();
    render(<ThreadInput addThread={() => {}} />);

    // User can type in all form fields
    // Input values update correctly:
    // - Title field accepts "Test Title"
    // - Category field accepts "Test Category"
    // - Body field accepts "Test Body Content"
    // Values persist after typing

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
    // Form Submission
    const mockAddThread = vi.fn();
    const user = userEvent.setup();
    render(<ThreadInput addThread={mockAddThread} />);
    // Form submission works
    // addThread callback receives correct data object
    // All field values are passed correctly
    const titleInput = screen.getByPlaceholderText('Title');
    const categoryInput = screen.getByPlaceholderText('Category');
    const bodyInput = screen.getByPlaceholderText('Body');
    const submitButton = screen.getByRole('button', { name: 'Add Thread' });

    // Act
    await user.type(titleInput, 'Test Title');
    await user.type(categoryInput, 'Test Category');
    await user.type(bodyInput, 'Test Body Content');
    await user.click(submitButton);

    // data object
    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Test Title',
      category: 'Test Category',
      body: 'Test Body Content'
    });
  });

  it('should validate required fields before submission', async () => {
    // Form Validation
    const mockAddThread = vi.fn();
    const user = userEvent.setup();
    render(<ThreadInput addThread={mockAddThread} />);

    // Empty form cannot be submitted
    // addThread is not called with empty fields
    // Form validation prevents invalid submissions
    const submitButton = screen.getByRole('button', { name: 'Add Thread' });

    // Act
    await user.click(submitButton);

    // Assert
    expect(mockAddThread).not.toHaveBeenCalled();
  });
});