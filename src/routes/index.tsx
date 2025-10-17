import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes/AuthRoutes";
import { AppRoutes } from "./AppRoutes/AppRoutes";

export function Routes() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
