import React, { useState, useRef, useEffect } from 'react';
import { ChatBubble, ArrowRight } from './Icons';
import { generateAIResponse } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hello! I'm Summit. I can help you with pricing, feature details, or scheduling a demo. What would you like to know?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How much does it cost?",
    "Tell me about Summit Voice AI",
    "Is it ONC Certified?",
    "Does it include RCM?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: text }]);
    setInputText('');
    setIsLoading(true);

    const response = await generateAIResponse(text);
    
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setIsLoading(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] h-[600px] mb-4 flex flex-col border border-gray-100 overflow-hidden animate-fade-in-up origin-bottom-right transition-all duration-300 ring-1 ring-black/5">
          {/* Header */}
          <div className="bg-gradient-to-r from-summit-600 to-summit-700 p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-lg font-bold shadow-inner">S</div>
              <div>
                <h3 className="font-bold text-lg">Summit Assistant</h3>
                <div className="flex items-center gap-1.5 opacity-90">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                  <p className="text-sm">Online & Ready</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-base leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-summit-600 text-white rounded-br-sm' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Suggested Questions - Only show if not loading and user hasn't typed a lot yet */}
            {!isLoading && messages.length < 4 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {suggestedQuestions.map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-sm bg-white border border-summit-200 text-summit-700 px-3 py-1.5 rounded-full hover:bg-summit-50 hover:border-summit-300 transition-colors shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-summit-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-summit-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-summit-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 text-base border border-gray-200 bg-gray-50 rounded-full px-4 py-2.5 focus:outline-none focus:border-summit-500 focus:bg-white focus:ring-1 focus:ring-summit-500 transition-all placeholder-gray-400"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputText.trim()}
              className="bg-summit-600 text-white p-2.5 rounded-full hover:bg-summit-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl shadow-summit-900/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-gradient-to-br from-summit-500 to-summit-600 text-white'}`}
      >
        {isOpen ? (
          <span className="text-2xl font-bold leading-none">&times;</span>
        ) : (
          <ChatBubble className="w-7 h-7" />
        )}
      </button>
    </div>
  );
};

export default AIChat;