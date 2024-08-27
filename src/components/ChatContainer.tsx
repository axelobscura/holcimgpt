import { ChatCompletionRequestMessage } from "openai";
import { useEffect, useState } from "react";
import CursorSVG from "./icons/CursorSVG";
import Markdown from "react-markdown";

interface ChatContainerProps {
  chatHistory: ChatCompletionRequestMessage[];
}

export default function ChatContainer({ chatHistory }: ChatContainerProps) {
  const [displayResponse, setDisplayResponse] = useState("");
  const [completedTyping, setCompletedTyping] = useState(false);

  useEffect(() => {
    if (!chatHistory?.length) {
      return;
    }

    setCompletedTyping(false);

    let i = 0;
    const stringResponse = chatHistory[chatHistory.length - 1].content;

    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i));

      i++;

      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [chatHistory]);

  return (
    <>
    <title>SIKA MÉXICO GPT</title>
    <meta name="description" content="Page description" />
    <div className="max-h-0">
      {chatHistory.map((message, messageIndex) => (
        <div key={messageIndex}>
          {message?.role === "user" && (
            <div className="chat chat-end">
              <span className="chat-bubble whitespace-pre-line">
                <div dangerouslySetInnerHTML={{__html: message?.content}} className="articulo" />
              </span>
            </div>
          )}
          {messageIndex === chatHistory.length - 1 &&
            message?.role === "assistant" && (
              <div className="chat chat-start">
                <span className="chat-bubble whitespace-pre-line">
                  <Markdown>
                    {displayResponse}
                  </Markdown>
                  {!completedTyping && <CursorSVG />}
                </span>
              </div>
            )}
          {message?.role === "assistant" &&
            messageIndex !== chatHistory.length - 1 && (
              <div className="chat chat-start">
                <span className="chat-bubble whitespace-pre-line">
                  <div dangerouslySetInnerHTML={{__html: message?.content}} className="articulo" />
                </span>
              </div>
            )}
        </div>
      ))}
    </div>
    </>
  );
}
