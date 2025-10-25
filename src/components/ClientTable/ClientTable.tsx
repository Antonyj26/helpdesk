import trashSvg from "../../assets/trash.svg";
import eyeSvg from "../../assets/eye.svg";

export type Client = {
  id: string;
  name: string;
  email: string;
};

type ClientTableProps = {
  clients: Client[];
  onDelete: (ticketId: string) => void;
  OnEdit: (ticketId: string) => void;
};

export function ClientTable({ clients, onDelete, OnEdit }: ClientTableProps) {
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
              Vizualizar
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-6 py-2 text-sm font-bold">{client.name}</td>
              <td className="px-6 py-2 text-sm">{client.email}</td>
              <td className="px-6 py-2 text-center">
                <button
                  className="w-12 h-7 bg-gray-500 rounded-1xl flex justify-center items-center cursor-pointer hover:bg-gray-600 transition ease-linear"
                  onClick={() => onDelete(client.id)}
                >
                  <img src={trashSvg} alt="Icone de lixeira" />
                </button>
              </td>
              <td className="px-6 py-2 text-center">
                <button
                  className="w-12 h-7 bg-gray-500 rounded-1xl flex justify-center items-center cursor-pointer hover:bg-gray-600 transition ease-linear"
                  onClick={() => OnEdit(client.id)}
                >
                  <img src={eyeSvg} alt="Icone de caneta" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
