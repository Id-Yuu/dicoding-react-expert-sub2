import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import LoginInput from './index';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>,
    );
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'ayyub@mail.com');

    // Assert
    expect(emailInput).toHaveValue('ayyub@mail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>,
    );
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'ayyub');

    // Assert
    expect(passwordInput).toHaveValue('ayyub');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(
      <MemoryRouter>
        <LoginInput login={mockLogin} />
      </MemoryRouter>,
    );
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'ayyub@mail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'ayyub');
    const loginButton = await screen.getByRole('button', { name: 'Masuk' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'ayyub@mail.com',
      password: 'ayyub',
    });
  });
});