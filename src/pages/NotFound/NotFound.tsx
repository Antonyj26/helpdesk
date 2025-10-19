export function NotFound() {
  return (
    <div className="h-full w-full flex justify-center items-center border border-gray-500 rounded-2xl">
      <div className="flex flex-col">
        <p className="text-center text-9xl mb-10">🥹</p>

        <h1 className="text-blue-dark font-bold text-3xl mb-10">
          Op's! Página não encontrada
        </h1>
        <a
          href="/"
          className="text-lg text-gray-100 text-center hover:text-gray-200 transition ease-linear border rounded-2xl border-gray-500 p-2"
        >
          Voltar para o inicio
        </a>
      </div>
    </div>
  );
}
