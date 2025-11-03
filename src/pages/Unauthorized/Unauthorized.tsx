export function Unauthorized() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-center text-9xl mb-10">👮🛑</p>{" "}
      <h1 className="text-blue-dark font-bold text-3xl mb-10">Acesso negado</h1>
      <p className="text-lg text-gray-100 text-center hover:text-gray-200">
        Você não tem autorização para acessar essa página{" "}
      </p>
    </div>
  );
}
