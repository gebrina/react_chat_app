import { FC, Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../api";

type ProtectedRouteProps = {
  children: ReactNode;
};
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = getToken();
  if (!token) return <Navigate to={"/login"} />;

  return <Fragment>{children}</Fragment>;
};
