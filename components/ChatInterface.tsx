'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, Sparkles, Command } from 'lucide-react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Welcome back. I am Aura. How can I assist you with the 22,000 institutional facts today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error connecting to my neural core." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-[Inter] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* 🏙️ THE BUILDER LAYER (Center Card) */}
      <div className="w-full max-w-2xl bg-white rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col relative h-[80vh]">
        
        {/* 🎨 HEADER ACCENT (Signature Anchor) */}
        <div className="h-1.5 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] w-full" />
        
        {/* 🏛️ INSTITUTIONAL BRANDING */}
        <div className="px-6 py-4 border-b border-[#F3F4F6] flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Bot size={20} />
            </div>
            <div>
              <h1 className="text-[14px] font-bold text-gray-900 tracking-tight">Aura Concierge</h1>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">MSAJCE Digital Intelligence</p>
            </div>
          </div>
          <div className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">1536-D Live</span>
          </div>
        </div>

        {/* 🗣️ CONVERSATION STREAM (Isolated inside card) */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide"
        >
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-gray-100' : 'bg-indigo-50 text-indigo-600'}`}>
                  {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                {/* Bubble - Premium Geometric */}
                <div className={`px-4 py-2.5 rounded-[12px] text-[13px] leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-[#6366F1] text-white font-medium rounded-tr-none shadow-md shadow-indigo-100' 
                  : 'bg-[#F9FAFB] text-gray-700 font-medium rounded-tl-none border border-[#F3F4F6] markdown-content'
                }`}>
                  {m.role === 'user' ? (
                    m.content
                  ) : (
                    <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-li:my-1 text-gray-700 markdown-content">
                        <ReactMarkdown>
                            {m.content}
                        </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
                <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-[12px] rounded-tl-none px-4 py-2.5 flex items-center gap-2">
                    <Sparkles size={14} className="text-indigo-400 animate-spin" />
                    <span className="text-[12px] text-gray-400 font-medium">Consulting Vault...</span>
                </div>
            </div>
          )}
        </div>

        {/* ⌨️ INPUT AREA - Integrated */}
        <div className="p-6 bg-white border-t border-[#F3F4F6]">
          <div className="relative group">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your query..."
              className="w-full h-11 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-5 pr-12 text-[13px] font-medium placeholder:text-gray-400 outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-indigo-50 transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1.5 w-8 h-8 rounded-[8px] bg-[#6366F1] hover:bg-[#4F46E5] text-white flex items-center justify-center shadow-lg shadow-indigo-100 transition-all active:scale-90"
            >
              <Send size={14} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 border-t border-[#F3F4F6] pt-4">
              <div className="flex items-center gap-1.5">
                  <Command size={10} className="text-gray-300" />
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Aura V3 Engine</span>
              </div>
          </div>
        </div>
      </div>

      {/* 🏷️ FOOTER BADGE */}
      <div className="mt-8 flex flex-col items-center gap-2">
          <div className="px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[9px] font-extrabold text-gray-500 uppercase tracking-[0.1em]">Knowledge Saturation Active</span>
          </div>
      </div>
    </div>
  );
}
