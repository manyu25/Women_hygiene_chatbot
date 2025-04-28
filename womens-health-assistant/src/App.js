import React from "react";
import ChatInterface from "./components/ChatInterface";
import "./styles/styles.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Women's Health Assistant</h1>
        <p>Ask questions about women's health in a safe, private space</p>
      </header>
      <ChatInterface />
      <footer className="app-footer">
        <p>
          This assistant provides general information only. Not a substitute for
          professional medical advice.
        </p>
      </footer>
    </div>
  );
}

export default App;
