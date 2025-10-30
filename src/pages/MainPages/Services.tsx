import { useEffect, useState } from "react";
import { ServiceTable } from "../../components/ServiceTable/ServiceTable";
import type { Service } from "../../components/ServiceTable/ServiceTable";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { Loading } from "../../components/Loading/Loading";

export function Services() {
  const { session } = useAuth();
  const [service, setService] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const handleEdit = () => {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-xl text-blue-dark font-bold mb-6">Serviços</h1>
      <ServiceTable services={service} onEdit={handleEdit} />
    </div>
  );
}
