import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar/Sidebar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-48 flex-shrink-0 bg-gray-100 text-gray-600">
        <Sidebar />
      </aside>
      <main className="flex-1 bg-gray-600 p-12 overflow-y-auto mt-3 rounded-t-2xl shadow-lg">
        <Outlet />
      </main>
    </div>
  );
}
