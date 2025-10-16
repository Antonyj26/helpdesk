import { Outlet } from "react-router";
import bgImage from "../../assets/Login_Background.png";
import logoName from "../../assets/Logo_Name.png";

export function AuthLayout() {
  return (
    <div className="relative min-h-screen w-full ">
      <img
        src={bgImage}
        alt="Imagem de Fundo"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative flex items-center justify-end min-h-screen p-8">
        <div className="w-full max-w-md bg-white bg-opacity-90 p-6 rounded-3xl shadow-lg  ">
          <img src={logoName} alt="" className="mx-auto mb-8 mt-12" />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
