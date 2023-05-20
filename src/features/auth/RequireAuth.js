import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";

import React from "react";

const RequireAuth = () => {
  const currUser = useSelector(selectCurrentUser);
  const location = useLocation();
  return currUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
