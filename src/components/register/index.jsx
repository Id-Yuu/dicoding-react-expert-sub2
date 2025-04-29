import React from 'react';
import PropTypes from 'prop-types';
import useInputs from '@hooks/useInputs';

const RegisterInput = ({ onRegister }) => {
  const [name, onNameChange] = useInputs('');
  const [email, onEmailChange] = useInputs('');
  const [password, onPasswordChange] = useInputs('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name,
      email,
      password
    });
  };

  return (
    <fieldset className="fieldset bg-base-300 border-base-100 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Register</legend>
      <form onSubmit={handleSubmit} aria-label="register-form">
        <label className="label" htmlFor="name">
          Nama
        </label>
        <input
          type="text"
          className="input"
          id="name"
          value={name}
          onChange={onNameChange}
          required
        />

        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className="input"
          id="email"
          value={email}
          onChange={onEmailChange}
          required
        />

        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="input"
          id="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
        <button
          className="btn btn-primary mt-4 w-full"
          type="submit"
        >
          Register
        </button>
      </form>
    </fieldset>
  );
};

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;