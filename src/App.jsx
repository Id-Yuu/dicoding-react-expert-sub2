import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Pages
import PageAddThread from '@pages/PageAddThread';
import PageDetail from '@pages/PageDetail';
import PageHome from '@pages/PageHome';
import PageLeaderboard from '@pages/PageLeaderboard';
import PageLogin from '@pages/PageLogin';
import PageNotFound from '@pages/PageNotFound';
import PageRegister from '@pages/PageRegister';
// Store
import { isPreloadProcess } from '@store/isPreload/action';
import { fetchClearAuth } from '@store/authUser/action';
// Components
import Navbar from '@components/navbar';
import { Loading } from '@components/loading';

const App = () => {
  const { authUser, isPreload = false } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(isPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(fetchClearAuth());
    navigate('/login');
  };

  const renderAuthenticatedRoutes = () => (
    <>
      <Loading />
      <Navbar authUser={authUser} signOut={onSignOut} />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/new" element={<PageAddThread />} />
        <Route path="/leaderboards" element={<PageLeaderboard />} />
        <Route path="/thread/:threadId" element={<PageDetail />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );

  const renderUnauthenticatedRoutes = () => (
    <>
      <Loading />
      <Routes>
        <Route path="/*" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );

  if (isPreload) return <Loading />;

  return authUser === null
    ? renderUnauthenticatedRoutes()
    : renderAuthenticatedRoutes();
};

export default App;