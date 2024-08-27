import { Dispatch, SetStateAction } from "react";
import UpRightSVG from "./icons/UpRightSVG";

interface InputControlProps {
  getResponse: () => Promise<void>;
  setPrompt: Dispatch<SetStateAction<string>>;
  prompt: string;
  loadingResponse: boolean;
}

export default function InputControl({
  getResponse,
  setPrompt,
  prompt,
  loadingResponse,
}: InputControlProps) {
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getResponse();
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <div className="grow">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Ingrese su consulta aquí"
          className="input w-full border-gray-600"
        />
      </div>
      <button
        type="submit"
        disabled={!prompt || loadingResponse}
        className={`btn border-white ${loadingResponse && "loading"}`}
        style={{
          backgroundColor: "#0473a5",
        }}
      >
        {!loadingResponse && <UpRightSVG />}
      </button>
    </form>
  );
}
