// ChatWidget.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import "./ChatWidget.css";
import { GoogleGenAI } from "@google/genai";
import { AuthContext } from "../context/AuthContext";
import { marked } from "marked";
import { KoshPrompt } from "./KoshPrompt";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ChatWidget = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "model", text: "Hi! How can I assist you today?" },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);
  const { user, refreshAuthContextHandler } = useContext(AuthContext);
  const navigate = useNavigate();
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
    // console.log(user?.role)
    // console.log(converted);
    converted.unshift({
      role: "model",
      parts: [
        {
          text: `${KoshPrompt.prompt(user)}`,
        },
      ],
    });
    let botReply;
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: converted,
      });
      console.log(response);
      if(response.text.includes('intent') && response.text.includes('parameters')){
        const jsonString = response.text;
        const obj = JSON.parse(jsonString);
        console.log(obj.intent);
        console.log(obj.parameters);
        botReply = `${obj.reply}`;
        try{
          const res = await axios.post(`${apiUrl}/api/v1/ai-operations`, obj, { withCredentials: true });
          botReply = `${res.data.message}`;
          refreshAuthContextHandler();
        }
        catch(err){
          console.log(err);
          botReply = err.response.data.message;
        }
      } 
      else{
        botReply = marked(response.text);
      }
    }

    await main();
    
    setIsThinking(false);
    setMessages((prev) => [
      ...prev,
      { sender: "model", text: botReply },
    ]);
    if(botReply.includes("Navigated to Library Dashboard")){
      navigate("/dashboard");
    }
    else if(botReply.includes("Navigated to Assets Dashboard")){
      navigate("/assets/dashboard");
    }
    else if(botReply.includes("Navigated to Catalog")){
      navigate("/catalog");
    }
    else if(botReply.includes("Navigated to Library Users")){
      navigate("/users");
    }
    else if(botReply.includes("Navigated to Asset Users")){
      navigate("/asset/users");
    }
    else if(botReply.includes("Navigated to Employee Users")){
      navigate("/employees");
    }
    else if(botReply.includes("Navigated to Book List")){
      navigate("/books");
    }
    else if(botReply.includes("Navigated to My Assets")){
      navigate("/my-assets");
    }
    else if(botReply.includes("Navigated to Assignment Logs")){
      navigate("/assets/assignments");
    }
    else if(botReply.includes("Navigated to Repair Logs")){
      navigate("/assets/repairs");
    }
    else if(botReply.includes("Navigated to Asset List")){
      navigate("/assets/list");
    }
    else if(botReply.includes("Navigated to Employee Page")){
      navigate("/employees");
    }
    else if(botReply.includes("Navigated to Employee Onboarding")){
      navigate("/employees/onboard");
    }
    else if(botReply.includes("Navigated to Audit Logs")){
      navigate("/logs");
    }



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
