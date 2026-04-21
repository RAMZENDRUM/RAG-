"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Navigation, BookOpen, GraduationCap, Info, User, Bot } from 'lucide-react';

/**
 * AURA SUPREME v2.0 - THE ELITE CONCIERGE
 * Designed with a Three-Layer Architecture vibe and Institutional Signature Gradient.
 */
export default function AuraSupremeV2() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to **MSAJCE**. I am **Aura**, your Digital Concierge. How can I assist your academic journey today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const QUICK_ACTIONS = [
    { label: 'Bus Routes', icon: <Navigation className="w-3 h-3" />, query: 'Show me the college bus routes' },
    { label: 'Placements', icon: <GraduationCap className="w-3 h-3" />, query: 'Recent placement records?' },
    { label: 'Fee Structure', icon: <BookOpen className="w-3 h-3" />, query: 'Fee structure for IT' }
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (query?: string) => {
    const textToSend = query || input;
    if (!textToSend.trim() || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: textToSend }] }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "*Aura is currently localizing new data.* Please try in 5 seconds." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] font-['Inter',sans-serif]">
      {/* 1. THE SIGNATURE BUBBLE (STITCH SYSTEM) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-5 rounded-full shadow-[0_10px_40px_rgba(79,70,229,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <MessageCircle className="w-6 h-6" />
          <span className="font-semibold text-sm">Aura Concierge</span>
        </button>
      )}

      {/* 2. THE SUPREME INTERFACE */}
      {isOpen && (
        <div className="bg-white w-[400px] h-[650px] rounded-[1.25rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-gray-100 animate-in zoom-in duration-300">
          
          {/* SIGNATURE ANCHOR (MSAJCE ACCENT) */}
          <div className="h-2 w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600" />

          {/* HEADER LAYER */}
          <div className="p-5 flex justify-between items-center bg-white border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 relative">
                <Sparkles className="w-6 h-6 animate-pulse" />
                <div className="absolute bottom-[-2px] right-[-2px] w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-[1.125rem] text-gray-900 leading-tight">Aura Supreme</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">v5.7 High Fidelity</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-gray-50 hover:bg-gray-100 p-2 rounded-xl transition-all text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* BUILDER LAYER (MESSAGES) */}
          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#F9FAFB]"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-[0.625rem] h-fit mt-1 shadow-sm transition-transform hover:scale-110 ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-gray-200'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-[1.25rem] text-sm shadow-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none font-medium'}`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start items-center gap-2 text-indigo-400 ml-2 animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Aura is consulting the vault...</span>
              </div>
            )}
          </div>

          {/* TOOLKIT LAYER (QUICK ACTIONS) */}
          <div className="p-4 bg-[#F9FAFB] flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_ACTIONS.map((action, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(action.query)}
                className="flex flex-col items-center justify-center min-w-[90px] h-[60px] bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all group shrink-0 shadow-sm"
              >
                <div className="text-gray-400 group-hover:text-indigo-600 mb-1 transition-colors">{action.icon}</div>
                <span className="text-[10px] font-semibold text-gray-500 group-hover:text-indigo-700">{action.label}</span>
              </button>
            ))}
          </div>

          {/* PROPERTY LAYER (INPUT) */}
          <div className="p-6 bg-white border-t border-gray-100 flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-[0.75rem] border border-gray-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100/50 transition-all">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Aura anything..."
                className="flex-1 bg-transparent border-none text-sm focus:outline-none text-gray-800 placeholder:text-gray-400 font-medium ml-2"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 shadow-[0_4px_12px_rgba(79,70,229,0.3)] disabled:opacity-30 active:scale-95 transition-all"
              >
                <Send className="w-5 h-5 flex-shrink-0" />
              </button>
            </div>
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help">
                    <Info className="w-3 h-3" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Institutional Privacy Secured</span>
                </div>
                <p className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 uppercase tracking-widest leading-none">MSAJCE Sentinel</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
