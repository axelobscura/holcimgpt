import { Dispatch, SetStateAction } from "react";
import CloseSVG from "./icons/CloseSVG";
import WarningSVG from "./icons/WarningSVG";

interface WarningAlertProps {
  setShowWarning: Dispatch<SetStateAction<boolean>>;
}

export default function WarningAlert({ setShowWarning }: WarningAlertProps) {
  return (
    <div className="alert alert-warning shadow-lg">
      <div>
        <WarningSVG />
        <span className="font-light text-sm">
          Asistente concretón es un proyecto desarrollado por el Instituto Mexicano del Cemento y del Concreto A.C.
        </span>
      </div>
      <button
        onClick={() => setShowWarning(false)}
        className="btn btn-ghost btn-xs alertButton"
      >
        <CloseSVG />
      </button>
    </div>
  );
}
