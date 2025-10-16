import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes/AuthRoutes";
import { AppLayout } from "../components/Layouts/AppLayout";

export function Routes() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
