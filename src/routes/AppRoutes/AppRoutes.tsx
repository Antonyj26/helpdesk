import { AppLayout } from "../../components/Layouts/AppLayout";
import { Routes, Route } from "react-router";

export function AppRotes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}></Route>
    </Routes>
  );
}
