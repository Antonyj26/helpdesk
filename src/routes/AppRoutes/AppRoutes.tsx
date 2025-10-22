import { AppLayout } from "../../components/Layouts/AppLayout";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../../pages/MainPages/Dashboard";
import { Tickets } from "../../pages/MainPages/Tickets";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Clients } from "../../pages/MainPages/Clients";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
