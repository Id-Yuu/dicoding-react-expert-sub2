import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import RegisterInput from './index';

describe('RegisterInput Component', () => {
  it('should render register form correctly', () => {
    // Arrange
    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByLabelText('Nama')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('should handle input changes correctly', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText('Nama');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    // Act
    await user.type(nameInput, 'AyyubM');
    await user.type(emailInput, 'Ayyub@mail.com');
    await user.type(passwordInput, 'password123');

    // Assert
    expect(nameInput).toHaveValue('AyyubM');
    expect(emailInput).toHaveValue('Ayyub@mail.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call onRegister function with correct data when form is submitted', async () => {
    // Arrange
    const mockRegister = vi.fn();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterInput onRegister={mockRegister} />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText('Nama');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    // Act
    await user.type(nameInput, 'AyyubM');
    await user.type(emailInput, 'Ayyub@mail.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'AyyubM',
      email: 'Ayyub@mail.com',
      password: 'password123'
    });
  });

  it('should validate required fields before submission', async () => {
    // Arrange
    const mockRegister = vi.fn();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterInput onRegister={mockRegister} />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: 'Register' });

    // Act
    await user.click(submitButton);

    // Assert
    expect(mockRegister).not.toHaveBeenCalled();
  });
});