import { Button } from "../Button/Button";
import { Select } from "../Select/Select";
import xSvg from "../../assets/x.svg";
import trashSvg from "../../assets/trash.svg";
import { z, ZodError } from "zod";
import { useState } from "react";
import { api } from "../../services/api";
import { AxiosError } from "axios";

type UpdateModalProps = {
  serviceId: string | null;
  onClose: () => void;
};

const bodySchema = z.object({
  status: z.boolean().optional(),
});

export function UpdateModal({ onClose, serviceId }: UpdateModalProps) {
  const [status, setStatus] = useState<boolean>();

  async function deleteService() {
    if (confirm("Tem certeza que quer excluir esse serviço?")) {
      try {
        await api.delete(`/admin/service/delete/${serviceId}`);
        onClose();
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
      }
    }
  }

  async function updateService() {
    if (confirm("Tem certeza que atualizar?")) {
      try {
        const data = bodySchema.parse({ status });

        await api.patch(`/admin/service/${serviceId}`, data);
        onClose();
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
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

        <div className="flex">
          <Button
            title="Excluir Serviço"
            variant="secondary"
            baseVariant="baseIcon"
            onClick={(e) => {
              e.preventDefault();
              deleteService();
            }}
          >
            <img src={trashSvg} alt="" />
          </Button>
          <Button
            baseVariant="baseIcon"
            variant="secondary"
            title="Fechar"
            onClick={onClose}
          >
            <img src={xSvg} alt="Botão para fechar" />
          </Button>
        </div>
      </div>
      <div className="mb-5">
        <Select onChange={(e) => setStatus(e.target.value === "true")}>
          <option selected disabled>
            Selecione o status
          </option>
          <option value="true">Ativar</option>
          <option value="false">Desativar</option>
        </Select>
      </div>
      <Button
        title="Atualizar"
        onClick={(e) => {
          e.preventDefault();
          updateService();
        }}
      >
        Atualizar
      </Button>
    </form>
  );
}
