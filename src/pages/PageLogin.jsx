import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchSetAuth } from '@store/authUser/action';
import LoginInput from '@components/login';

const PageLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogin = async ({ email, password }) => {
    await dispatch(fetchSetAuth({ email, password }));
    if (localStorage.getItem('accessToken') !== '') {
      navigate('/');
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content">
        <div className="max-w-md">
          <LoginInput login={onLogin} />
          <p className="py-6">
        Don't have an account? <Link className="link" to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;