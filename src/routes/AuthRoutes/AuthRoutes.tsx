import { Routes, Route } from "react-router";
import { Login } from "../../pages/Login/Login";
import { AuthLayout } from "../../components/Layouts/AuthLayout";
import { Register } from "../../pages/Register/Register";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
