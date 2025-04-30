import React from 'react';
import PropTypes from 'prop-types';
import useInputs from '@hooks/useInputs';

const LoginInput = ({ login }) => {
  const [email, onEmailChange] = useInputs('');
  const [password, onPasswordChange] = useInputs('');
  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Login</legend>
      <form onSubmit={onSubmit}>
        <label className="label" htmlFor='email'>Email</label>
        <input type="email" className="input" placeholder="Email" id="email"
          value={email}
          onChange={onEmailChange}
          required  />
        <label className="label" htmlFor='password'>Password</label>
        <input type="password" className="input" placeholder="Password" id="password"
          value={password}
          onChange={onPasswordChange}
          autoComplete="on"
          required />
        <button className="btn btn-primary mt-4 w-full" type='submit'>Login</button>
      </form>
    </fieldset>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;