import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import { z, ZodError } from "zod";
import { api } from "../../services/api";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { Loading } from "../../components/Loading/Loading";

const registerSchema = z.object({
  name: z.string().trim().min(2, { message: "Informe o nome" }),
  email: z
    .string({ message: "Infome o E-mail" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ message: "Informe a senha" })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = registerSchema.parse({ name, email, password });

      await api.post("/client", data);

      if (confirm("Cadastrado com sucesso. Ir para tela de entrar?")) {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        console.log("Erro da API:", error.response?.data.message);
        return alert(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={onSubmit}
        className="border p-7 border-gray-500 rounded-3xl  flex flex-col"
      >
        <h1 className="text-lg font-bold text-gray-200 ">Crie sua conta</h1>
        <p className="text-xs text-gray-300 mb-10">
          Informe seu nome, e-mail e senha
        </p>
        <div className="flex flex-col gap-4 mb-10">
          <Input
            name="name"
            legend="nome"
            placeholder="Digite o nome completo"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="email"
            legend="E-mail"
            placeholder="exemplo@email.com"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            legend="Password"
            placeholder="Digite sua senha"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
      {isLoading && <Loading />}
      <div className="border p-7 border-gray-500 rounded-3xl flex flex-col ">
        <h1 className="text-lg font-bold text-gray-200 mb-1">
          Já tem uma conta?
        </h1>
        <p className="text-xs text-gray-300 mb-10 font-bold">
          Entre agora mesmo
        </p>
        <a
          href="/"
          className="bg-gray-500 text-gray-200 flex items-center justify-center w-full h-10 rounded-1xl text-sm font-bold hover:bg-gray-600 transition ease-linear"
        >
          Acessar conta
        </a>
      </div>
    </div>
  );
}
