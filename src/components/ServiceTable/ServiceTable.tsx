import penSvg from "../../assets/pen-line.svg";
import { StatusServices } from "../Status/StatusServices";

export type Service = {
  id: string;
  name: string;
  price: number;
  status: boolean;
};

type ServiceTableProps = {
  services: Service[];
  onEdit: (serviceId: string) => void;
};

export function ServiceTable({ services, onEdit }: ServiceTableProps) {
  return (
    <div className="overflow-x-auto border border-gray-500 rounded-2xl">
      <table className="min-w-full divide-y divide-gray-500 ">
        <thead>
          <tr>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Título
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Valor
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Status
            </th>
          </tr>
        </thead>
        {services.map((service) => (
          <tbody>
            <tr>
              <td className="px-6 py-2 text-sm font-bold text-gray-200">
                {service.name}
              </td>
              <td className="px-6 py-2 text-sm text-gray-200">{`R$ ${service.price}`}</td>
              <td className="px-6 py-4">
                <StatusServices status={service.status} />
              </td>
              <td>
                <button
                  className="bg-gray-500 w-7 h-7 rounded-1xl cursor-pointer flex items-center justify-center hover:bg-gray-600 transition ease-linear mr-2"
                  onClick={() => onEdit(service.id)}
                >
                  <img src={penSvg} alt="Simbolo de caneta para edição" />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
