import { TechTable } from "../../components/TechTable/TechTable";
import type { Tech } from "../../components/TechTable/TechTable";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { Loading } from "../../components/Loading/Loading";
import { Button } from "../../components/Button/Button";
import plusSvg from "../../assets/plus.svg";
import { TechModal } from "../../components/TechModal/TechModal";
import { UpdateTechModal } from "../../components/TechModal/UpdateTechModal";

export function Techs() {
  const { session } = useAuth();
  const [tech, setTech] = useState<Tech[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<Tech | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    async function fetchedTechs() {
      try {
        if (!session) {
          return;
        }

        const response = await api.get("/admin/tech");
        const data = response.data;

        setTech(data.techs);
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchedTechs();
  }, [session]);

  const handleEdit = (techId: string) => {
    const techEdit = tech.find((c) => c.id === techId);

    if (!techEdit) return;

    setSelectedTech(techEdit);
    setUpdateModalOpen(true);
  };

  async function handleDelete(techId: string) {
    const techDelete = tech.find((c) => c.id === techId);

    if (!techDelete) return;

    if (confirm("Tem certeza que quer excluir esse técnico?")) {
      try {
        await api.delete(`/admin/tech/delete/${techId}`);
        setUpdateModalOpen(false);
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          alert(error.response?.data.message ?? "Erro ao excluir técnico");
        }
      }
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-blue-dark font-bold text-xl mb-6">Técnicos</h1>
        <Button
          nameIcon="nameIcon"
          baseVariant="basePage"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={plusSvg}
            className="w-5 h-5
          "
          />
          Novo
        </Button>
      </div>
      <TechTable onEdit={handleEdit} techs={tech} />
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <TechModal onClose={() => setModalOpen(false)} />
        </div>
      )}
      {updateModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <UpdateTechModal
            idTech={selectedTech?.id ?? ""}
            emailTech={selectedTech?.email ?? ""}
            nameTech={selectedTech?.name ?? ""}
            onClose={() => setUpdateModalOpen(false)}
            onDelete={() => handleDelete(selectedTech?.id ?? "")}
          />
        </div>
      )}
    </div>
  );
}
