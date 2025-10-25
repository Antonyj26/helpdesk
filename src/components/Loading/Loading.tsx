import logoLoadingSvg from "../../assets/Logo_IconDark.svg";

export function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img className="mr-5" src={logoLoadingSvg} alt="Logo" />
      <span className="text-blue-dark font-bold text-xl">Carregando...</span>
    </div>
  );
}
