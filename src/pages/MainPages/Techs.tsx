import { TechTable } from "../../components/TechTable/TechTable";
import type { Tech } from "../../components/TechTable/TechTable";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { Loading } from "../../components/Loading/Loading";

export function Techs() {
  const { session } = useAuth();
  const [tech, setTech] = useState<Tech[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleEdit = (techId: string) => {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-blue-dark font-bold text-xl mb-6">Técnicos</h1>
      <TechTable onEdit={handleEdit} techs={tech} />
    </div>
  );
}
