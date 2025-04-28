import React from "react";

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${
            message.sender === "user" ? "user-message" : "assistant-message"
          } ${message.isError ? "error" : ""}`}
        >
          <div className="message-content">
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
