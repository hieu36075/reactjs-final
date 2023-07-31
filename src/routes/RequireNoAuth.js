// RequireNoAuth.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireNoAuth = ({ element }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  if (isLogin) {
    // Nếu đã đăng nhập, chuyển hướng đến trang chủ
    return <Navigate to="/" replace />;
  }

  return element;
};

export default RequireNoAuth;
