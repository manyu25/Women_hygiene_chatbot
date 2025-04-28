import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { getGeminiResponse } from "../services/geminiService";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your women's health assistant. Feel free to ask any questions about menstrual health, reproductive health, hormonal balance, hygiene practices, or emotional well-being. How can I help you today?",
      sender: "assistant",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getGeminiResponse(text);

      const assistantMessage = {
        id: messages.length + 2,
        text: response,
        sender: "assistant",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error getting response:", err);
      setError(
        "Sorry, I was unable to process your request. Please try again."
      );

      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I was unable to process your request. Please try again.",
        sender: "assistant",
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <MessageList messages={messages} />
      <div ref={messagesEndRef} />
      {isLoading && <div className="loading-indicator">Thinking...</div>}
      {error && <div className="error-message">{error}</div>}
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
