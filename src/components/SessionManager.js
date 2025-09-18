import React from 'react';
import { clearHistory } from '../services/api';

const SessionManager = ({ onReset }) => {
  const handleReset = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      try {
        await clearHistory(sessionId);
        onReset();
      } catch (error) {
        console.error('Error resetting session:', error);
      }
    }
  };

  return (
    <div className="session-manager">
      <button onClick={handleReset}>
        Reset Session
      </button>
    </div>
  );
};

export default SessionManager;