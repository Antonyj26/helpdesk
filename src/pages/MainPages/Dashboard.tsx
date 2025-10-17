import logo from "../../assets/Logo_Name.png";

export function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full border rounded-2xl border-gray-500">
      <img src={logo} alt="Logo" className="mb-4" />
      <h1 className="text-blue-dark text-xl mb-4">Bem-vindo ao HelpDesk</h1>
      <p className="text-gray-100 text-lg text-center">
        Use o menu lateral para navegar.
      </p>
    </div>
  );
}
