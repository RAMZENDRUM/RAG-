"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Search, Layout, Settings, Sparkles, MessageSquare, 
  ChevronLeft, ChevronRight, Send, User, Bot, 
  MapPin, GraduationCap, BookOpen, AlertCircle, Cpu
} from 'lucide-react';

/**
 * AURA STITCH-ELITE WORKSPACE (v3.0)
 * Implements the Three-Layer Architecture:
 * Left: Toolkit (Categories)
 * Center: Builder (Chat Canvas)
 * Right: Property (AI Insights)
 */
export default function AuraStitchUI() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Aura is ready. Please select an institutional category or start a new dialogue.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const TOOLKIT_ITEMS = [
    { label: 'Admissions', icon: <Plus className="w-4 h-4" /> },
    { label: 'Transport/Bus', icon: <MapPin className="w-4 h-4" /> },
    { label: 'Academic Core', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Placements', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Emergency/SOS', icon: <AlertCircle className="w-4 h-4" /> }
  ];

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
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] text-gray-900 font-['Inter',sans-serif] overflow-hidden">
      
      {/* 1. TOOLKIT LAYER (LEFT) - FIXED w-64 */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 shadow-sm z-10">
        <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <Cpu className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Aura Supreme</h1>
        </div>

        <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Institutional Toolkit</p>
            {TOOLKIT_ITEMS.map((item, idx) => (
                <button key={idx} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all group">
                    <span className="text-gray-400 group-hover:text-indigo-500">{item.icon}</span>
                    {item.label}
                </button>
            ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 px-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold">Admin Portal</span>
                <span className="text-[10px] text-gray-400">v5.7 Production</span>
            </div>
        </div>
      </aside>

      {/* 2. BUILDER LAYER (CENTER) - SCROLLABLE CANVAS */}
      <main className="flex-1 flex flex-col items-center p-8 overflow-y-auto no-scrollbar relative min-w-0">
        
        {/* THE INTERACTION CARD (ELITE STYLING) */}
        <div className="w-full max-w-2xl bg-white rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] flex flex-col min-h-[85vh] relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* SIGNATURE ANCHOR (ACCENT BAND) */}
            <div className="h-[6px] w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

            {/* CARD HEADER */}
            <div className="px-6 py-4 border-b border-[#F3F4F6] flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Building Block</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Sync Active</span>
                </div>
            </div>

            {/* CHAT CONTENT */}
            <div className="flex-1 p-6 space-y-6">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-100 text-indigo-600'}`}>
                                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={`p-4 rounded-xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 font-medium'}`}>
                                {m.content}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-2 items-center text-indigo-400 ml-12 animate-pulse">
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Retrieving Institutional Knowledge...</span>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* INPUT AREA */}
            <div className="p-6 border-t border-[#F3F4F6]">
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-[10px] p-2 focus-within:border-indigo-400 focus-within:ring-1 ring-indigo-100 transition-all">
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type to build knowledge..."
                        className="flex-1 bg-transparent border-none px-2 text-sm focus:outline-none"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-20 active:scale-95 transition-all shadow-sm"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
      </main>

      {/* 3. PROPERTY LAYER (RIGHT) - FIXED w-72 */}
      <aside className="w-72 bg-white border-l border-gray-200 flex flex-col p-6 shadow-sm overflow-y-auto">
        <h3 className="font-bold text-sm mb-6 flex items-center gap-2 tracking-tight">
            <Layout className="w-4 h-4 text-indigo-500" />
            AI Properties
        </h3>

        {/* TAB SYSTEM */}
        <div className="bg-gray-100 p-1 rounded-md flex mb-8">
            <button className="flex-1 py-1.5 text-[10px] font-bold uppercase bg-white rounded shadow-sm">Analysis</button>
            <button className="flex-1 py-1.5 text-[10px] font-bold uppercase text-gray-400">Memory</button>
        </div>

        <div className="space-y-8">
            {/* PERSONA DETECTION */}
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Persona Detection</p>
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-indigo-600">PREDICTED ROLE</span>
                        <span className="text-[10px] font-black text-indigo-400">89% CONF</span>
                    </div>
                    <p className="text-xs font-bold text-indigo-700">Prospective Student</p>
                </div>
            </div>

            {/* KNOWLEDGE STATUS */}
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Knowledge Health</p>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-gray-500 uppercase">Points Synced</span>
                        <span className="font-black text-gray-900">~22,000</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[14%]" />
                    </div>
                </div>
            </div>

            {/* QUICK SETTINGS */}
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Control Layer</p>
                <div className="space-y-2">
                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-600">Marketing Defense</span>
                        <div className="w-8 h-4 bg-indigo-500 rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-600">Auto-Reporting</span>
                        <div className="w-8 h-4 bg-indigo-500 rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-auto pt-6 opacity-30 pointer-events-none">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-center">Engineered for MSAJCE Apex</p>
        </div>
      </aside>
    </div>
  );
}
