import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes/AuthRoutes";
import { AppRoutes } from "./AppRoutes/AppRoutes";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading/Loading";

export function Routes() {
  const { session, isLoading } = useAuth();

  function RenderRoute() {
    if (
      session?.role === "admin" ||
      session?.role === "client" ||
      session?.role === "tech"
    ) {
      return <AppRoutes />;
    }

    return <AuthRoutes />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <RenderRoute />
    </BrowserRouter>
  );
}
