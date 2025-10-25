import openSvg from "../assets/circle-help.svg";
import inProgressSvg from "../assets/clock-2.svg";
import encerradoSvg from "../assets/circle-check-big.svg";

const STATUS_STYLE = {
  open: {
    label: "Aberto",
    style: "bg-red-100 text-feedback-danger",
    icon: openSvg,
  },
  in_progress: {
    label: "Em andamento",
    style: "bg-blue-200 text-feedback-progress",
    icon: inProgressSvg,
  },
  encerrado: {
    label: "Encerrado",
    style: "bg-green-100 text-feedback-done",
    icon: encerradoSvg,
  },
};

export { STATUS_STYLE };
