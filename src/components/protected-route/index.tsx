import { FC, Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isUserLoggedIn = false;
  if (!isUserLoggedIn) return <Navigate to={"/login"} />;

  return <Fragment>{children}</Fragment>;
};
