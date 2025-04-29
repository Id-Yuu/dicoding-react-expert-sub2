import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '@components/register';
import { isRegisterUser } from '@store/users/action';

const PageRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegister = ({ name, email, password }) => {
    dispatch(isRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="max-w-md">
          <RegisterInput onRegister={onRegister} />
          <p>
        Already have an account? <Link className='link' to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageRegister;