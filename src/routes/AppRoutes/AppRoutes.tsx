import { AppLayout } from "../../components/Layouts/AppLayout";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../../pages/MainPages/Dashboard";
import { Tickets } from "../../pages/MainPages/Tickets";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Clients } from "../../pages/MainPages/Clients";
import { Unauthorized } from "../../pages/Unauthorized/Unauthorized";
import { ProtectedRoute } from "../ProtectedRoute ";
import { Techs } from "../../pages/MainPages/Techs";
import { Services } from "../../pages/MainPages/Services";
import { NewTicket } from "../../pages/MainPages/NewTicket";
import { TechnicianTickets } from "../../pages/MainPages/TechnicianTickets";
import { TechnicianTicketDetails } from "../../pages/Details/TechnicianTicketDetails";

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
          path="/techs"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Techs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newTicket"
          element={
            <ProtectedRoute roles={["client"]}>
              <NewTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technicianTickets"
          element={
            <ProtectedRoute roles={["tech"]}>
              <TechnicianTickets />
            </ProtectedRoute>
          }
        />

        <Route
          path="technicianTickets/details/:id"
          element={
            <ProtectedRoute roles={["tech"]}>
              <TechnicianTicketDetails />
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
