import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import logOutSvg from "../../assets/log-out.svg";
import userSvg from "../../assets/circle-user.svg";

export function SidebarFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  const userName = auth.session?.name;
  const userEmail = auth.session?.email;

  return (
    <div className="relative mt-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-start w-full hover:bg-gray-300 p-3 rounded-2xl cursor-pointer"
      >
        <span className="text-sm text-gray-600">{userName}</span>
        <span className="text-xs text-gray-400">{userEmail}</span>
      </button>
      {isOpen && (
        <div className="absolute left-full bottom-0 w-40 ml-12 bg-gray-100 shadow-lg rounded-lg py-2 z-50">
          <button
            onClick={() => auth.remove()}
            className="w-full px-4 py-2 cursor-pointer flex items-center gap-2  hover:bg-gray-300"
          >
            <img src={logOutSvg} alt="Simbolo de sair" />
            <span className="text-sm font-bold text-feedback-danger text-center">
              Sair
            </span>
          </button>
          <button className="w-full px-4 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-300">
            <img src={userSvg} alt="Simbolo de usuário" />
            <span className="text-sm font-bold text-gray-600 text-center  ">
              Perfil
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
