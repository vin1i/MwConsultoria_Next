import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && token === "seu_token_pre_definido";

  return isAuthenticated ? element : <Navigate to="/erro" />;
};

export default PrivateRoute;
