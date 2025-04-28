import React, { useState } from "react";

const MessageInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <textarea
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your health question here..."
        disabled={isLoading}
      />
      <button
        type="submit"
        className="send-button"
        disabled={isLoading || !message.trim()}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default MessageInput;
