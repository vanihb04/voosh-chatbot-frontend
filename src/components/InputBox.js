import React, { useState } from 'react';
import { sendMessage } from '../services/api';

const InputBox = ({ onNewMessage, setIsLoading, isLoading, sessionId }) => {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    onNewMessage(userMessage);
    setMessage('');
    setIsLoading(true);
    
    try {
      // Send message to backend API
      const response = await sendMessage(message, sessionId);
      onNewMessage({
        ...response,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error('Error sending message:', error);
      onNewMessage({
        type: 'bot',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-box">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here..."
        disabled={isLoading}
      />
      <button onClick={handleSend} disabled={isLoading}>
        Send
      </button>
    </div>
  );
};

export default InputBox;