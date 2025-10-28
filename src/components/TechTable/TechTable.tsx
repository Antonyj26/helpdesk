import penLineSvg from "../../assets/pen-line.svg";

export type Tech = {
  id: string;
  name: string;
  email: string;
  availableHours: string[];
};

type TechTableProps = {
  techs: Tech[];
  onEdit: (techId: string) => void;
};

export function TechTable({ techs, onEdit }: TechTableProps) {
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
              Disponibilidade
            </th>
            <th className="px-6 py-3 text-gray-400 text-left text-sm font-bold">
              Vizualizar
            </th>
          </tr>
        </thead>

        <tbody>
          {techs.map((tech) => (
            <tr key={tech.id}>
              <td className="px-6 py-2 text-sm font-bold">{tech.name}</td>
              <td className="px-6 py-2 text-sm font-bold">{tech.email}</td>
              <td>
                <div className="flex flex-wrap gap-3">
                  {tech.availableHours.map((hour, index) => (
                    <span
                      className="border p-1.5 border-gray-500 rounded-2xl text-gray-400"
                      key={index}
                    >
                      {hour}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-2 text-center">
                <button
                  className="w-12 h-7 bg-gray-500 rounded-1xl flex justify-center items-center cursor-pointer hover:bg-gray-600 transition ease-linear"
                  onClick={() => onEdit(tech.id)}
                >
                  <img src={penLineSvg} alt="Simbole de caneta para edição" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
