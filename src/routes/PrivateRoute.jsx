import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = () => {
    const role = sessionStorage.getItem('_role') || localStorage.getItem('_role');
    return role === 'Admin';
  };

  return auth() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
