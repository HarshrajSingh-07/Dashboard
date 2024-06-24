import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const token = sessionStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={token ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
