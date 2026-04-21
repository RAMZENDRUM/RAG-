"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, User, Sparkles, Settings, Archive } from 'lucide-react';

/**
 * AURA LUXURY-ELITE UI (v4.1)
 * Optimized for CENTERED editorial viewing.
 */
export default function AuraLuxuryUI() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Luxury is defined by intentionality, heritage, and the rejection of the superfluous. Welcome to the Aura experience.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const text = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...messages, { role: 'user', content: text }] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'assistant', content: "Aura is syncing! Re-fetching knowledge vault..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-light selection:bg-[#C5A059] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap');
        .serif { font-family: 'Playfair Display', serif; }
        .sans { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* NAVBAR */}
      <nav className="w-full py-8 px-12 flex justify-between items-center border-b border-gray-100 bg-white">
        <h1 className="serif italic text-2xl text-[#C5A059] font-normal tracking-tight">Aura Concierge</h1>
        <div className="flex gap-10 text-sm font-medium text-gray-500 sans tracking-wide uppercase text-[11px]">
          <button className="hover:text-[#C5A059] transition-colors leading-none tracking-widest">Archive</button>
          <button className="hover:text-[#C5A059] transition-colors leading-none tracking-widest">Settings</button>
          <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-[#C5A059]">
            <User className="w-4 h-4" />
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-4xl mx-auto pt-20 pb-12 text-center">
        <h2 className="serif text-[4rem] font-normal leading-tight mb-4 text-[#000]">Experience Refinement</h2>
        <p className="sans text-gray-400 text-sm max-w-sm mx-auto leading-relaxed tracking-wide font-normal">
          Aura is your personal architectural companion, designed to distill complex inquiries into elegant solutions.
        </p>
      </header>

      {/* CHAT CANVAS (CENTERED MESSAGES) */}
      <main className="max-w-4xl mx-auto px-6 pb-48">
        <div 
          ref={scrollRef} 
          className="space-y-24 pt-10"
        >
          {messages.map((m, i) => (
            <div key={i} className="flex flex-col items-center text-center group animate-in fade-in duration-1000">
                <div className={`sans text-[15px] leading-[1.8] max-w-2xl ${m.role === 'user' ? 'bg-[#F2F1EF] p-6 rounded-2xl text-[#666] font-medium' : 'serif text-[1.75rem] text-[#1A1A1A] font-normal tracking-tight'}`}>
                    {m.content}
                </div>
                <div className="flex items-center gap-4 mt-6 opacity-40 group-hover:opacity-100 transition-opacity">
                    {m.role === 'assistant' ? (
                        <div className="bg-[#C5A059] p-1.5 rounded-full text-white">
                            <Sparkles className="w-3 h-3" />
                        </div>
                    ) : (
                        <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold italic">Member Inquiry • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    )}
                </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <span className="serif italic text-gray-400 text-lg">Consulting the institutional vault...</span>
                <div className="flex gap-2">
                    <div className="w-1 h-1 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-1 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-1 h-1 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
            </div>
          )}
        </div>
      </main>

      {/* FLOATING LUXURY INPUT */}
      <footer className="fixed bottom-12 left-0 right-0 flex justify-center px-6">
        <div className="w-full max-w-3xl bg-white border border-gray-100 rounded-full px-8 py-5 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] flex items-center gap-4 focus-within:ring-2 ring-[#C5A059]/10 transition-all">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Inquire about college excellence..."
            className="flex-1 sans text-[16px] focus:outline-none placeholder:text-gray-300 text-gray-700 bg-transparent"
          />
          <button className="text-gray-300 hover:text-[#C5A059] transition-colors px-2 border-r border-gray-100 h-6">
             <Paperclip className="w-4 h-4" />
          </button>
          <button 
             onClick={handleSend}
             disabled={!input.trim() || isTyping}
             className="bg-[#C5A059] text-white p-3 rounded-full hover:bg-[#B38F4D] active:scale-95 transition-all shadow-lg group disabled:opacity-30"
          >
            <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
}
