import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import deleteSvg from "../../assets/trash.svg";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";

const bodySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
      .optional(),
    currentPassword: z.string().min(6).optional(),
    newPassword: z
      .string()
      .min(6, { message: "Senha deve conter pelo menos 6 caracteres" })
      .optional(),
  })
  .refine((data) => !(data.newPassword && !data.currentPassword), {
    message: "Você deve informar a senha atual",
    path: ["currentPassword"],
  });

export function ProfileModal() {
  const { session, remove } = useAuth();
  const [name, setName] = useState(session?.name ?? "");
  const [editingPassword, setEditingPassword] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = bodySchema.parse({ name, currentPassword, newPassword });

      await api.patch("/client/profile", data);
      setEditingPassword(false);
      alert("Perfil atualizado com sucesso");
      remove();
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteAccount() {
    const id = session?.id;

    if (confirm("Tem certeza que quer excluir sua conta?")) {
      try {
        await api.delete("/client/delete", { params: { id } });
        remove();
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message);
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-7">
      <div className="flex justify-between gap-2">
        <Input
          legend="nome"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="button"
          variant="danger"
          baseVariant="baseIcon"
          title="Exlcuir conta"
          onClick={handleDeleteAccount}
        >
          <img src={deleteSvg} alt="ícone para excluir conta" />
        </Button>
      </div>
      <Input
        legend="e-mail"
        name="email"
        type="text"
        value={session?.email}
        readOnly
      />
      {editingPassword ? (
        <>
          <h1 className="text-gray-200 text-lg font-bold text-center mt-4">
            Alterar Senha
          </h1>
          <Input
            legend="senha atual"
            type="password"
            placeholder="Digite sua senha atual"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            legend="nova senha"
            type="password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span className="text-gray-400 text-sm italic">
            Minimo de 6 digitos
          </span>
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setEditingPassword(false)}
          >
            Cancelar
          </Button>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <Input
            legend="senha"
            name="password"
            type="password"
            value=".........."
            readOnly
          />
          <Button type="button" onClick={() => setEditingPassword(true)}>
            Alterar
          </Button>
        </div>
      )}
    </form>
  );
}
