import { ClientTable } from "../../components/ClientTable/ClientTable";
import type { Client } from "../../components/ClientTable/ClientTable";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { Loading } from "../../components/Loading/Loading";

export function Clients() {
  const { session } = useAuth();
  const [client, setClient] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchedClients() {
      try {
        if (!session) {
          return;
        }

        const response = await api.get("/admin/client");

        const data = response.data;

        console.log("Clients recebidos:", data.clients);

        setClient(data.clients);
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchedClients();
  }, [session]);

  const handleEdit = async (userId: string) => {};
  const handleDelete = async (clientId: string) => {
    if (confirm("Tem certeza que deseja excluir esse cliente?")) {
      try {
        await api.delete(`/admin/client/delete/${clientId}`);
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          return alert(
            error.response?.data.message ?? "Erro ao deletar cliente"
          );
        }
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-blue-dark text-xl font-bold mb-6">Clientes</h1>
      <ClientTable
        clients={client}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
