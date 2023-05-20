import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const Logout = () => {
  const location = useLocation();

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default Logout;
