import { ClientTable } from "../../components/ClientTable/ClientTable";
import type { User } from "../../components/ClientTable/ClientTable";

const users: User[] = [
  {
    id: "1",
    name: "Antony",
    email: "antony@email.com",
  },
  {
    id: "2",
    name: "Vitória",
    email: "vitoria@email.com",
  },
];

export function Clients() {
  const handleEdit = (userId: string) => {};
  const handleDelete = (userid: string) => {};
  return (
    <div>
      <h1 className="text-blue-dark text-xl font-bold mb-6"></h1>
      <ClientTable users={users} OnEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
