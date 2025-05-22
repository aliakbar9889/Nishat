'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
  type Message = { role: 'user' | 'bot'; content: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const botMessage: Message = { role: 'bot', content: '' };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botMessage.content += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.role !== 'bot') {
            updated.push(botMessage);
          } else {
            updated[updated.length - 1] = { ...botMessage };
          }
          return updated;
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Sorry, something went wrong!' },
      ]);
      setIsLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Message Icon with Tooltip */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="p-5 mb-24 mr-5 bg-green-600 text-white rounded-full shadow-lg relative overflow-hidden transition-transform transform hover:scale-110 group"
          aria-label="Open Nishat Support Chatbot"
        >
          <MessageCircle size={24} className="relative z-10" />
          <span className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="w-80 bg-white shadow-2xl rounded-lg overflow-hidden animate-fade-in">
          {/* Header with Nishat Branding and Close Button */}
          <div className="flex justify-between items-center p-3 bg-green-600 text-white">
            <h3 className="text-lg font-semibold font-inter">AI CUSTOMER SERVICE</h3>
            <button
              onClick={toggleChatbot}
              className="rounded-full transition-colors"
              aria-label="Close Chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Message Area */}
          <div className="h-64 overflow-y-auto p-4 bg-gray-50 font-manrope">
            {messages.length === 0 && (
              <div className="text-center text-gray-500">
                Welcome to <b>Nishat!</b> Ask about our clothing or 10% discount!
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-gray-200 text-black'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {isLoading && <div className="text-center text-gray-500 font-manrope">Typing...</div>}
          </div>

          {/* Input Area */}
          <div className="flex p-3 bg-white font-manrope">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Type your message..."
            />
            <Send onClick={handleSend} className="mt-2 ml-2 hover:cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}