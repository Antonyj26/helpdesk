import { TechTable } from "../../components/TechTable/TechTable";
import type { Tech } from "../../components/TechTable/TechTable";

const techs: Tech[] = [
  {
    id: "1",
    name: "Antony",
    email: "antony@email.com",
    availableHours: [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
    ],
  },
];

export function Techs() {
  const handleEdit = (techId: string) => {};

  return (
    <div>
      <h1 className="text-blue-dark font-bold text-xl mb-6">Técnicos</h1>
      <TechTable onEdit={handleEdit} techs={techs} />
    </div>
  );
}
