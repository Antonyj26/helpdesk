import { useEffect, useState } from "react";
import { ServiceTable } from "../../components/ServiceTable/ServiceTable";
import type { Service } from "../../components/ServiceTable/ServiceTable";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { Loading } from "../../components/Loading/Loading";
import { Button } from "../../components/Button/Button";
import plusSvg from "../../assets/plus.svg";
import { ModalService } from "../../components/ModalService/ModalService";
import { UpdateModal } from "../../components/ModalService/UpdateModal";

export function Services() {
  const { session } = useAuth();
  const [service, setService] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function fetchedServices() {
      try {
        if (!session) {
          return;
        }

        const response = await api.get("/admin/service");
        const data = response.data;

        setService(data.services);
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchedServices();
  }, [session]);
  const handleEdit = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setModalUpdateOpen(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl text-blue-dark font-bold mb-6">Serviços</h1>
        <Button
          nameIcon="nameIcon"
          baseVariant="basePage"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={plusSvg}
            alt="Botão para adicionar novo serviço"
            className="w-5 h-5"
          />
          Novo
        </Button>
      </div>
      <ServiceTable services={service} onEdit={handleEdit} />
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <ModalService onClose={() => setModalOpen(false)} />
        </div>
      )}
      {modalUpdateOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <UpdateModal
            serviceId={selectedServiceId}
            onClose={() => setModalUpdateOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
