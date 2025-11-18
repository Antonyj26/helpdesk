import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useState } from "react";
import xSvg from "../../assets/x.svg";
import { z, ZodError } from "zod";
import { api } from "../../services/api";
import { AxiosError } from "axios";

const bodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  price: z
    .number({ message: "Preço inválido" })
    .positive({ message: "Preço deve ser maior que 0" }),
});

type ModalServiceProps = {
  onClose: () => void;
};

export function ModalService({ onClose }: ModalServiceProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();

  async function newService() {
    if (confirm("Tem certeza que quer adicionar esse novo serviço?")) {
      try {
        const data = bodySchema.parse({ name, price });

        await api.post("/admin/service", data);
        onClose();
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message && "Erro ao criar serviço");
        }
        if (error instanceof ZodError) {
          alert(error.issues[0].message);
        }
      }
    }
  }

  return (
    <form className="p-7 w-[380px] flex flex-col gap-3 bg-gray-600 border border-gray-500 rounded-lg">
      <div className="flex justify-between">
        <h1 className="mb-5 font-bold text-gray-100">Cadastro de serviço</h1>
        <Button
          baseVariant="baseIcon"
          variant="secondary"
          title="Fechar"
          onClick={onClose}
        >
          <img src={xSvg} alt="Botão para fechar" />
        </Button>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <Input
          legend="Título"
          placeholder="Nome do serviço"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          legend="Valor"
          type="number"
          placeholder="R$ 0,00"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <Button title="Salvar" onClick={newService}>
        Salvar
      </Button>
    </form>
  );
}
