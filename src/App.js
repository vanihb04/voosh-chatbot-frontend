import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import SessionManager from './components/SessionManager';
import { getHistory } from './services/api';
import './App.scss';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Generate or retrieve session ID
    const storedSessionId = localStorage.getItem('sessionId') || generateSessionId();
    setSessionId(storedSessionId);
    localStorage.setItem('sessionId', storedSessionId);

    // Load chat history
    loadHistory(storedSessionId);
  }, []);

  const generateSessionId = () => {
    return 'session-' + Math.random().toString(36).substr(2, 9);
  };

  const loadHistory = async (sessionId) => {
    try {
      const history = await getHistory(sessionId);
      setMessages(history);
    } catch (error) {
      console.error('Error loading history:', error);
      // Start with welcome message if no history
      setMessages([{
        type: 'bot',
        content: "Welcome to Voosh News Chatbot! Ask me for the latest news in any category.",
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const handleNewMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleReset = () => {
    setMessages([{
      type: 'bot',
      content: "Welcome to Voosh News Chatbot! Ask me for the latest news in any category.",
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  return (
    <div className="chatbot-app">
      <div className="chatbot-header">
        <h1>Voosh News Chatbot</h1>
        <SessionManager onReset={handleReset} />
      </div>
      <ChatWindow 
        messages={messages} 
        isLoading={isLoading} 
        sessionId={sessionId} 
      />
      <InputBox 
        onNewMessage={handleNewMessage}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        sessionId={sessionId}
      />
    </div>
  );
}

export default App;