import { STATUS_SERVICES_STYLE } from "../../utils/statusServicesStyle";

type StatusServicesProps = {
  status: boolean;
};

export function StatusServices({ status }: StatusServicesProps) {
  const current =
    STATUS_SERVICES_STYLE[String(status) as keyof typeof STATUS_SERVICES_STYLE];

  if (!current) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
        {status}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${current.style}`}
    >
      <img src={current.icon} alt={current.label} className="w-4 h-4" />
    </span>
  );
}
