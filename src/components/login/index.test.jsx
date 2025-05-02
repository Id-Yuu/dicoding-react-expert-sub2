import { describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginInput from './index';

describe('LoginInput Component', () => {
  afterEach(() => {
    cleanup();
  });
  // Tests basic form rendering (inputs, labels, button)
  it('should render login form correctly', () => {
    // Basic Rendering Test
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>
    );

    // - Email input field exists and is labeled
    // - Password input field exists and is labeled
    // - Login button exists with correct text
    // - All required form elements are present
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  // Tests email input field functionality
  it('should handle email input correctly', async () => {
    // Email Input Handling
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>
    );

    // - User can type in email field
    // - Email input value updates correctly
    // - Input maintains typed value
    // - Uses async/await for user interactions
    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  // Tests password input field functionality
  it('should handle password input correctly', async () => {
    // Password Input Handling
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>
    );

    // - User can type in password field
    // - Password input value updates correctly
    // - Input maintains typed value
    // - Uses async/await for user interactions
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'password123');
    expect(passwordInput).toHaveValue('password123');
  });

  // Tests form submission with valid data
  it('should call login function with correct data on form submission', async () => {
    // Form Submission
    const mockLogin = vi.fn();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginInput login={mockLogin} />
      </MemoryRouter>
    );
    // - Form can be submitted
    // - Login callback is called with correct data
    // - Email and password are passed correctly
    // - Form submission works with valid data
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    // Act
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  // Tests form validation for empty fields
  it('should validate required fields before submission', async () => {
    // Form Validation
    const mockLogin = vi.fn();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginInput login={mockLogin} />
      </MemoryRouter>
    );

    // - Empty form cannot be submitted
    // - Login callback is not called with empty fields
    // - Form validation works as expected
    const submitButton = screen.getByRole('button', { name: 'Login' });

    // Act
    await user.click(submitButton);

    // Assert
    expect(mockLogin).not.toHaveBeenCalled();
  });
});