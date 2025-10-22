import trashSvg from "../../assets/trash.svg";
import penSvg from "../../assets/pen-line.svg";

export type User = {
  id: string;
  name: string;
  email: string;
};

type ClientTableProps = {
  users: User[];
  onDelete: (ticketId: string) => void;
  OnEdit: (ticketId: string) => void;
};

export function ClientTable({ users, onDelete, OnEdit }: ClientTableProps) {
  return (
    <div className="overflow-x-auto border border-gray-500 rounded-2xl">
      <table className="min-w-full divide-y divide-gray-500">
        <thead>
          <tr>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Nome
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              E-mail
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Excluir
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Editar
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-2 text-sm font-bold">{user.name}</td>
              <td className="px-6 py-2 text-sm">{user.email}</td>
              <td className="px-6 py-2 text-center">
                <button
                  className="w-12 h-7 bg-gray-500 rounded-1xl flex justify-center items-center cursor-pointer hover:bg-gray-600 transition ease-linear"
                  onClick={() => onDelete(user.id)}
                >
                  <img src={trashSvg} alt="Icone de lixeira" />
                </button>
              </td>
              <td className="px-6 py-2 text-center">
                <button
                  className="w-12 h-7 bg-gray-500 rounded-1xl flex justify-center items-center cursor-pointer hover:bg-gray-600 transition ease-linear"
                  onClick={() => OnEdit(user.id)}
                >
                  <img src={penSvg} alt="Icone de caneta" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
