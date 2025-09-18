const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const sendMessage = async (message, sessionId) => {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': sessionId
    },
    body: JSON.stringify({ message })
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  return response.json();
};

export const getHistory = async (sessionId) => {
  const response = await fetch(`${API_BASE_URL}/api/history/${sessionId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  
  const data = await response.json();
  return data.history;
};

export const clearHistory = async (sessionId) => {
  const response = await fetch(`${API_BASE_URL}/api/history/${sessionId}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error('Failed to clear history');
  }
  
  return response.json();
};