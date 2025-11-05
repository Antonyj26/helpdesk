import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import logOutSvg from "../../assets/log-out.svg";
import userSvg from "../../assets/circle-user.svg";
import closeSvg from "../../assets/x.svg";
import { ProfileModal } from "../ProfileModal/ProfileModal";
import { Button } from "../Button/Button";

export function SidebarFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
            title="Sair"
            onClick={() => auth.remove()}
            className="w-full px-4 py-2 cursor-pointer flex items-center gap-2  hover:bg-gray-300"
          >
            <img src={logOutSvg} alt="Simbolo de sair" />
            <span className="text-sm font-bold text-feedback-danger text-center">
              Sair
            </span>
          </button>
          <button
            title="Abrir perfil"
            onClick={() => setProfileOpen(true)}
            className="w-full px-4 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-300"
          >
            <img src={userSvg} alt="Simbolo de usuário" />
            <span className="text-sm font-bold text-gray-600 text-center  ">
              Perfil
            </span>
          </button>
        </div>
      )}
      {profileOpen && (
        <div className="text-gray-300 fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]">
          <div className="bg-gray-600 p-8 rounded-2xl w-[450px] relative border border-gray-500 border- flex flex-col">
            <div className="flex justify-between">
              <span className="text-gray-100 font-bold">Perfil</span>
              <Button
                onClick={() => setProfileOpen(false)}
                variant="secondary"
                baseVariant="baseIcon"
                title="Fechar"
              >
                <img src={closeSvg} alt="Ícone de fechar"></img>
              </Button>
            </div>

            <ProfileModal />
          </div>
        </div>
      )}
    </div>
  );
}
