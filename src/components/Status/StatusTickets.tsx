import { STATUS_STYLE } from "../../utils/statusStyle";

type StatusBadgeProps = {
  status: string;
};

export function StatusTickets({ status }: StatusBadgeProps) {
  const current = STATUS_STYLE[status as keyof typeof STATUS_STYLE];

  if (!current) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
        {status}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${current.style}`}
    >
      <img src={current.icon} alt={status} className="w-4 h-4" />
      {current.label}
    </span>
  );
}
