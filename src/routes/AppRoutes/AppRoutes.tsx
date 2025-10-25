import { AppLayout } from "../../components/Layouts/AppLayout";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../../pages/MainPages/Dashboard";
import { Tickets } from "../../pages/MainPages/Tickets";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Clients } from "../../pages/MainPages/Clients";
import { Unauthorized } from "../../pages/Unauthorized/Unauthorized";
import { ProtectedRoute } from "../ProtectedRoute ";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/clients"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute roles={["admin", "client"]}>
              <Tickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin", "client", "tech"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute roles={["admin", "client", "tech"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
