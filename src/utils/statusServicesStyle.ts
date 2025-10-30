import banSvg from "../assets/ban.svg";
import checkSvg from "../assets/circle-check.svg";

const STATUS_SERVICES_STYLE = {
  true: {
    label: "Ativo",
    style: "bg-green-100 text-feedback-done",
    icon: checkSvg,
  },
  false: {
    label: "Inativo",
    style: "bg-red-100 text-feedback-danger",
    icon: banSvg,
  },
};

export { STATUS_SERVICES_STYLE };
