// ChatWidget.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import "./ChatWidget.css";
import { GoogleGenAI } from "@google/genai";
import { AuthContext } from "../context/AuthContext";
import { marked } from "marked";
import { KoshPrompt } from "./KoshPrompt";
const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "model", text: "Hi! How can I assist you today?" },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);
  const { user } = useContext(AuthContext);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    setIsThinking(true);
    console.log(input);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
    ]);
    setInput("");
    const converted = messages.map((msg) => ({
      role: msg.sender,
      parts: [{ text: msg.text }],
    })).concat({
      role: "user",
      parts: [{ text: input }],
    });
    console.log(user?.role)
    console.log(converted);
    converted.unshift({
      role: "model",
      parts: [
        {
          text: `${KoshPrompt.prompt(user)}`,
        },
      ],
    });
    let botReply;
    const ai = new GoogleGenAI({ apiKey: "AIzaSyB1T-IrYYueecCAYoAeXyLpZycnlHyFjDk" });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: converted,
      });
      console.log(response);
      botReply = marked(response.text);
    }

    await main();
    setIsThinking(false);
    setMessages((prev) => [
      ...prev,
      { sender: "model", text: marked(botReply) },
    ]);



  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className={`chat-container ${open ? "open" : ""}`}>
        <div className="chat-header">💬 KOSH Support Assistant</div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={msg.sender === "user" ? "user-message" : "bot-message"}
            >

              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>

          ))}
          {isThinking && (
            <div className="thinking-indicator-container">
            <div className="thinking-indicator"></div>
            <div className="thinking-indicator"></div>
            <div className="thinking-indicator"></div>
            </div>
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? "Close Chat" : "Chat with KOSH"}
      </button>
    </>
  );
};

export default ChatWidget;
