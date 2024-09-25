import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuth = useSelector((state) => state?.auth?.userData?.token);
  return isAuth ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
