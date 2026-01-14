import React, { useState, useRef, useEffect } from 'react';
import { askBusinessAdvisor } from '../services/geminiService';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GeminiStatus } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const BusinessAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();
  
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update greeting when language changes or first load
  useEffect(() => {
    if (messages.length === 0 || (messages.length === 1 && messages[0].role === 'bot')) {
        setMessages([{role: 'bot', text: t.assistant.greeting}]);
    }
  }, [language, t.assistant.greeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setStatus(GeminiStatus.LOADING);

    const answer = await askBusinessAdvisor(userMsg);
    
    setMessages(prev => [...prev, {role: 'bot', text: answer}]);
    setStatus(GeminiStatus.SUCCESS);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-solok-green text-white p-4 rounded-full shadow-2xl hover:bg-green-800 transition-all transform hover:scale-110 flex items-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
        <span className="font-semibold text-sm hidden md:inline">{t.assistant.btn_label}</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 animate-slide-up">
          {/* Header */}
          <div className="bg-solok-green p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">{t.assistant.header_title}</h3>
                <p className="text-[10px] text-green-100">Powered by Gemini AI</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-solok-green text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {status === GeminiStatus.LOADING && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-solok-green" />
                  <span className="text-xs text-gray-500">{t.assistant.thinking}</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.assistant.placeholder}
                className="flex-grow border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-solok-green focus:ring-1 focus:ring-solok-green"
              />
              <button 
                onClick={handleSend}
                disabled={status === GeminiStatus.LOADING || !input.trim()}
                className="bg-solok-green text-white p-2 rounded-xl hover:bg-green-800 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};