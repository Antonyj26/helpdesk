import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useActionState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().trim().min(1, { message: "Informe a senha" }),
});

export function Login() {
  const [state, formAction, isLoading] = useActionState(onLogin, null);
  const auth = useAuth();

  async function onLogin(_: any, formData: FormData) {
    try {
      const data = loginSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      const response = await api.post("/sessions", data);
      auth.save(response.data);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }

      return { message: "Não foi possível entrar" };
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <form
        action={formAction}
        className="border p-7 border-gray-500 rounded-3xl  flex flex-col"
      >
        <h1 className="text-lg font-bold text-gray-200 ">Acesse o portal</h1>
        <p className="text-xs text-gray-300 mb-10">
          Entre usando seu e-mail e senha cadastrados
        </p>
        <div className="flex flex-col gap-4 mb-10">
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
          />

          <p className="text-sm text-feedback-danger text-center  font-bold">
            {state?.message}
          </p>
        </div>
        <Button type="submit" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
      <div className="border p-7 border-gray-500 rounded-3xl flex flex-col ">
        <h1 className="text-lg font-bold text-gray-200 mb-1">
          Ainda não tem uma conta?
        </h1>
        <p className="text-xs text-gray-300 mb-10 font-bold">
          Cadastre agora mesmo
        </p>
        <a
          href="/register"
          className="bg-gray-500 text-gray-200 flex items-center justify-center w-full h-10 rounded-1xl text-sm font-bold  hover:bg-gray-600 transition ease-linear"
        >
          Criar conta
        </a>
      </div>
    </div>
  );
}
