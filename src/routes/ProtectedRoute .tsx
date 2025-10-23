import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: React.JSX.Element;
  roles: String[];
};

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { session } = useAuth();
  const userRole = session?.role || "";

  if (!session) {
    return <Navigate to="/" replace />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
