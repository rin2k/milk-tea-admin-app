import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux";

interface ProtectedLayoutProps {
  children?: React.ReactNode;
}
export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <Outlet />;
};
