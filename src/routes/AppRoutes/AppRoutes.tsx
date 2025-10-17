import { AppLayout } from "../../components/Layouts/AppLayout";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../../pages/MainPages/Dashboard";
import { Tickets } from "../../pages/MainPages/Tickets";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
      </Route>
    </Routes>
  );
}
