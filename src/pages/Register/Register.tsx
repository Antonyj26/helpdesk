import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export function Register() {
  return (
    <div className="flex flex-col gap-5">
      <form className="border p-7 border-gray-500 rounded-3xl  flex flex-col">
        <h1 className="text-lg font-bold text-gray-200 ">Acesse o portal</h1>
        <p className="text-xs text-gray-300 mb-10">
          Entre usando seu e-mail e senha cadastrados
        </p>
        <div className="flex flex-col gap-4 mb-10">
          <Input
            name="name"
            legend="nome"
            placeholder="Digite o nome completo"
            type="text"
            required
          />
          <Input
            name="email"
            legend="E-mail"
            placeholder="exemplo@mail.com"
            type="email"
            required
          />
          <Input
            name="password"
            legend="Password"
            placeholder="Digite sua senha"
            type="password"
            required
          />
        </div>
        <Button>Entrar</Button>
      </form>
      <div className="border p-7 border-gray-500 rounded-3xl flex flex-col ">
        <h1 className="text-lg font-bold text-gray-200 mb-1">
          Ainda não tem uma conta?
        </h1>
        <p className="text-xs text-gray-300 mb-10 font-bold">
          Já tem uma conta?
        </p>
        <a
          href="/"
          className="bg-gray-500 text-gray-200 flex items-center justify-center w-full h-10 rounded-1xl text-sm font-bold"
        >
          Acessar contar
        </a>
      </div>
    </div>
  );
}
