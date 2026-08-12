import React, { useState, useRef, useEffect } from 'react';
import apiClient from '../../api/client';
import { MessageCircle, Send, X, AlertTriangle } from 'lucide-react';

const MindBridgeChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there. I am MindBridge. How can I support you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const historyToSend = [...messages, userMessage];
      const response = await apiClient.post('/chat/', { messages: historyToSend });
      
      if (response.data.is_crisis) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response.data.reply,
          isCrisis: true
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response.data.reply 
        }]);
      }
    } catch (err) {
      console.error("Chat error", err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={styles.toggleBtn}
          className="neomorphic"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="neomorphic" style={styles.chatWindow}>
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle size={20} />
              <span style={{ fontWeight: 500 }}>MindBridge Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
              <X size={20} />
            </button>
          </div>

          <div style={styles.messageList}>
            {messages.map((msg, i) => (
              <div 
                key={i} 
                style={{
                  ...styles.messageWrapper,
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  ...styles.messageBubble,
                  backgroundColor: msg.isCrisis ? '#FDECEC' : msg.role === 'user' ? 'var(--text-primary)' : 'var(--bg-surface)',
                  color: msg.isCrisis ? '#D32F2F' : msg.role === 'user' ? 'var(--bg-primary)' : 'var(--text-primary)',
                  border: msg.isCrisis ? '1px solid #D32F2F' : 'none'
                }}>
                  {msg.isCrisis && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                      <AlertTriangle size={16} /> Urgent Support
                    </div>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{...styles.messageWrapper, justifyContent: 'flex-start'}}>
                <div style={{...styles.messageBubble, backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)'}}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={styles.inputArea}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={styles.input}
              className="neomorphic-inset"
            />
            <button type="submit" disabled={loading || !input.trim()} style={styles.sendBtn}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

const styles = {
  toggleBtn: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  chatWindow: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '350px',
    height: '500px',
    borderRadius: '16px',
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    overflow: 'hidden'
  },
  header: {
    padding: '1rem',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--bg-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageList: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  messageWrapper: {
    display: 'flex',
    width: '100%'
  },
  messageBubble: {
    padding: '0.8rem 1rem',
    borderRadius: '12px',
    maxWidth: '80%',
    lineHeight: 1.4,
    fontSize: '0.9rem'
  },
  inputArea: {
    padding: '1rem',
    display: 'flex',
    gap: '0.5rem',
    backgroundColor: 'var(--bg-primary)',
    borderTop: '1px solid rgba(0,0,0,0.05)'
  },
  input: {
    flex: 1,
    padding: '0.8rem',
    border: 'none',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '0.9rem'
  },
  sendBtn: {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    border: 'none',
    borderRadius: '8px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
};

export default MindBridgeChat;
