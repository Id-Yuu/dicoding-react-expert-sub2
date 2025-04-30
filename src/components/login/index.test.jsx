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

  it('should render login form correctly', () => {
    // Arrange
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should handle email input correctly', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email');

    // Act
    await user.type(emailInput, 'test@example.com');

    // Assert
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password input correctly', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText('Password');

    // Act
    await user.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login function with correct data on form submission', async () => {
    // Arrange
    const mockLogin = vi.fn();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginInput login={mockLogin} />
      </MemoryRouter>
    );

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

  it('should validate required fields before submission', async () => {
    // Arrange
    const mockLogin = vi.fn();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginInput login={mockLogin} />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: 'Login' });

    // Act
    await user.click(submitButton);

    // Assert
    expect(mockLogin).not.toHaveBeenCalled();
  });
});