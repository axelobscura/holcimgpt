import { useCallback, useEffect, useState } from "react";
import InputControl from "./InputControl";
import { openai } from "@/utils/chatgpt";
import ChatContainer from "./ChatContainer";
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";
import Banner from "./Banner";
import WarningAlert from "./WarningAlert";
import ErrorAlert from "./ErrorAlert";

const systemPrompt: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "Este GPT actúa como un asistente experto en SIKA (SIKA)(https://mex.sika.com/), especializado en proporcionar información sobre contenidos de la página web de sika mexico (https://mex.sika.com/) y de la página web https://mex.sika.com/.  Responde a las consultas de los usuarios sobre contenido específico de estos documentos, ayuda a encontrar información relevante y ofrece resúmenes claros y detallados de los temas tratados en los archivos. Además, guía a los usuarios sobre cómo acceder y utilizar la Biblioteca IMCYC (https://imcyc.com/ArchivosPDF/) y de la página web https://mex.sika.com/ de manera efectiva.",
};

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [responseAdded, setResponseAdded] = useState(false);
  const [promptAdded, setPromptAdded] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showError, setShowError] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    ChatCompletionRequestMessage[]
  >([systemPrompt]);

  const handleResponse = useCallback(async () => {
    try {
      setLoadingResponse(true);

      const response = await fetch("/api/chatgpt", {
        method: "POST",
        body: JSON.stringify(chatHistory),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseBody = await response.json();

      setResponse(responseBody.chatGptResponse);

      setResponseAdded(true);
      setPromptAdded(false);
      setLoadingResponse(false);
      setShowError(false);
    } catch (error) {
      setShowError(true);
      setLoadingResponse(false);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (chatHistory?.length && promptAdded) {
      handleResponse();
    }
  }, [chatHistory, handleResponse, promptAdded]);

  useEffect(() => {
    if (response && responseAdded) {
      const newResponse: ChatCompletionResponseMessage = {
        role: "assistant",
        content: response,
      };

      setChatHistory((chatHistory) => [...chatHistory, newResponse]);

      setResponseAdded(false);
    }
  }, [response, responseAdded]);

  const getResponse = async (): Promise<void> => {
    setPromptAdded(true);
    const newPrompt: ChatCompletionRequestMessage = {
      role: "user",
      content: prompt,
    };
    setChatHistory((chatHistory) => [...chatHistory, newPrompt]);
    setPrompt("");
  };

  return (
    <main className="flex min-h-screen flex-col px-4 sm:px-24 gap-y-4 pb-4">
      <Banner 
        chatHistory={chatHistory}
      />
      <div className="grow overflow-y-auto">
        <ChatContainer chatHistory={chatHistory} />
      </div>
      {showError && <ErrorAlert setShowError={setShowError} />}
      <InputControl
        setPrompt={setPrompt}
        prompt={prompt}
        getResponse={getResponse}
        loadingResponse={loadingResponse}
      />
      {showWarning && <WarningAlert setShowWarning={setShowWarning} />}
    </main>
  );
}
