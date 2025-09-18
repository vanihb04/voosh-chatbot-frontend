import React, { useEffect, useRef } from 'react';

const ChatWindow = ({ messages, isLoading, sessionId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to render articles
  const renderArticles = (articles) => {
    return (
      <div className="articles">
        {articles.map((article, index) => (
          <a 
            key={index} 
            href={article.url} 
            className="article-card" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} />
            )}
            <div className="article-info">
              <h4>{article.title}</h4>
              <p>{article.description}</p>
              <small>{new Date(article.publishedAt).toLocaleDateString()}</small>
            </div>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="welcome-message">
          <h2>Welcome to Voosh News Chatbot!</h2>
          <p>Ask me anything about recent news articles.</p>
          
          {/* News categories */}
          <div className="news-categories">
            <div className="news-category active" data-category="general">General</div>
            <div className="news-category" data-category="business">Business</div>
            <div className="news-category" data-category="technology">Technology</div>
            <div className="news-category" data-category="entertainment">Entertainment</div>
            <div className="news-category" data-category="sports">Sports</div>
            <div className="news-category" data-category="science">Science</div>
            <div className="news-category" data-category="health">Health</div>
          </div>
        </div>
      ) : (
        messages.map((message, index) => {
          // Check if message has articles to display
          if (message.articles && message.articles.length > 0) {
            return (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.content && <p>{message.content}</p>}
                  {renderArticles(message.articles)}
                </div>
                <div className="message-time">
                  {message.timestamp || new Date().toLocaleTimeString()}
                </div>
              </div>
            );
          }
          
          // Regular message without articles
          return (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-content">
                {message.content}
              </div>
              <div className="message-time">
                {message.timestamp || new Date().toLocaleTimeString()}
              </div>
            </div>
          );
        })
      )}
      
      {isLoading && (
        <div className="message bot">
          <div className="message-content typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;