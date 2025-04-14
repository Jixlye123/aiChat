import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatMessage.css"; // for typing animation

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isAi: false }, { text: "...typing", isAi: true }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      // Remove typing placeholder and add actual response
      setMessages(prev => [
        ...prev.slice(0, -1),
        { text: data.message, isAi: true }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { text: 'Sorry, there was an error processing your request.', isAi: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header className="bg-white border-bottom shadow-sm py-3 px-4">
        <div className="container">
          <h1 className="h4 fw-bold m-0 text-primary">Lead Bot Ai <span className="text-dark">Chat Assistant</span></h1>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-grow-1 overflow-auto py-3">
        <div className="container">
          {messages.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center text-muted text-center" style={{ height: '60vh' }}>
              <svg className="mb-3" width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h5 className="mb-1">Start a conversation</h5>
              <p>Ask me anything!</p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message.text} isAi={message.isAi} />
              ))}
              <div ref={messagesEndRef}></div>
            </>
          )}
        </div>
      </main>

      {/* Input */}
      <footer className="bg-white border-top shadow-lg py-3">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-control"
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading || !input.trim()}
              >
                <PaperAirplaneIcon style={{ width: '20px', height: '20px', transform: 'rotate(90deg)' }} />
              </button>
            </div>
            <small className="form-text text-muted text-center mt-2">Press Enter to send your message</small>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
