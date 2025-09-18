import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className={`message ${message.type}`}>
      <div className="message-content">
        {message.content}
      </div>
      <div className="message-time">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;