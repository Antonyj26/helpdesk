import openSvg from "../assets/circle-help.svg";
import inProgressSvg from "../assets/clock-2.svg";
import encerradoSvg from "../assets/circle-check-big.svg";

const STATUS_STYLE = [
  {
    status: "Aberto",
    style: "bg-red-100 text-feedback-danger",
    icon: openSvg,
  },
  {
    status: "Em andamento",
    style: "bg-blue-200 text-feedback-progress",
    icon: inProgressSvg,
  },
  {
    status: "Encerrado",
    style: "bg-green-100 text-feedback-done",
    icon: encerradoSvg,
  },
];

export { STATUS_STYLE };
