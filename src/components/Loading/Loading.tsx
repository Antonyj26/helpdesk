import { ThreeDot } from "react-loading-indicators";

export function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ThreeDot
        color="#2e3da3"
        size="medium"
        text="Carregando"
        textColor="#2e3da3"
      />
    </div>
  );
}
