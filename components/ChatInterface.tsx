'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  // Managing messages as UIMessages in this version of the SDK
  const { messages, append, status } = useChat() as any;
  const isLoading = status === 'submitted';
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Extract usage from the latest assistant message if available
  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant');
  // @ts-ignore
  const usage = lastAssistantMessage?.usage;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Call the standard SDK append to trigger the API
    await append({
      role: 'user',
      content: input,
    });
    
    setInput('');
  };

  return (
    <div className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen flex flex-col font-jakarta">
      {/* TopNavBar Component */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm sticky top-0 z-50">
        <nav className="flex justify-between items-center px-12 py-4 max-w-6xl mx-auto w-full">
          <div className="text-2xl font-newsreader italic text-[#B8860B] font-medium">Aura Concierge</div>
          <div className="hidden md:flex items-center space-x-12">
            <a className="text-stone-500 font-medium font-newsreader tracking-wide text-lg hover:text-[#B8860B] transition-all" href="#">Archive</a>
            <a className="text-stone-500 font-medium font-newsreader tracking-wide text-lg hover:text-[#B8860B] transition-all" href="#">Settings</a>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-[#B8860B]">
              <span className="material-symbols-outlined text-3xl">account_circle</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center w-full max-w-3xl mx-auto px-6 py-12 mb-32">
        <section className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-medium text-[#1a1c1c] font-newsreader">Experience Refinement</h1>
          <p className="text-[#4f4535] font-light max-w-lg mx-auto leading-relaxed">
            Aura is your personal architectural companion, designed to distill complex inquiries into elegant solutions.
          </p>
          
          {usage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex justify-center gap-4 text-[10px] uppercase tracking-widest text-[#B8860B] font-bold"
            >
              <span>Prompt: {usage.promptTokens} tkn</span>
              <span>•</span>
              <span>Completion: {usage.completionTokens} tkn</span>
              <span>•</span>
              <span>Total: {usage.totalTokens} tkn</span>
            </motion.div>
          )}
        </section>

        <div className="w-full space-y-12">
          {messages.map((m, idx) => (
            <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} w-full group fade-in`}>
              {m.role === 'user' ? (
                <>
                  <div className="max-w-[85%] bg-[#f4f3f3] px-6 py-4 rounded-xl border border-[#d3c4af]/30 text-[#1a1c1c]">
                    <p className="text-sm leading-relaxed">{(m as any).content || (m as any).display}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 mt-2 mr-1">
                    Sent · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#986d00] flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  </div>
                  <div className="flex-grow space-y-6">
                    <div className="font-newsreader text-xl md:text-2xl text-[#785600] leading-tight font-light">
                      {(m as any).content?.split('\n')[0] || (m as any).display}
                    </div>
                    <div className="space-y-4 text-[#4f4535] leading-loose font-jakarta whitespace-pre-wrap">
                      {(m as any).content?.split('\n').slice(1).join('\n')}
                      
                      {idx === messages.length - 1 && !isLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                          <div className="p-4 bg-white border border-[#d3c4af]/20 rounded-lg shadow-sm">
                            <div className="text-[#B8860B] mb-2">
                              <span className="material-symbols-outlined">palette</span>
                            </div>
                            <h4 className="font-newsreader font-semibold text-[#1a1c1c] mb-1">Context Fidelity</h4>
                            <p className="text-xs">Retrieved from college archives for 100% accuracy.</p>
                          </div>
                          <div className="p-4 bg-white border border-[#d3c4af]/20 rounded-lg shadow-sm">
                            <div className="text-[#B8860B] mb-2">
                              <span className="material-symbols-outlined">text_fields</span>
                            </div>
                            <h4 className="font-newsreader font-semibold text-[#1a1c1c] mb-1">Prompt Weight</h4>
                            <p className="text-xs">{usage?.promptTokens || '---'} tokens used in this transaction.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-[#986d00] opacity-50 flex items-center justify-center text-white shrink-0 mt-1">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
              </div>
              <div className="flex-grow h-20 bg-stone-100 rounded-lg"></div>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-6 md:p-10 pointer-events-none">
        <div className="max-w-3xl mx-auto w-full pointer-events-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B8860B]/10 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <form onSubmit={handleSubmit} className="relative flex items-end gap-3 bg-white/90 backdrop-blur-xl border border-stone-200 p-3 pl-6 rounded-2xl shadow-xl">
              <textarea 
                className="flex-grow bg-transparent border-none focus:ring-0 py-3 text-[#1a1c1c] placeholder-stone-400 resize-none font-jakarta text-base outline-none" 
                placeholder="Inquire about design excellence..." 
                rows={1}
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <div className="flex items-center gap-2 pb-1.5 pr-1">
                <button type="button" className="p-2 text-stone-400 hover:text-stone-600 transition-colors">
                  <span className="material-symbols-outlined">attach_file</span>
                </button>
                <button type="submit" className="w-10 h-10 bg-[#B8860B] text-white rounded-xl flex items-center justify-center hover:bg-[#986d00] transition-all shadow-lg active:scale-95 disabled:opacity-50">
                  <span className="material-symbols-outlined">arrow_upward</span>
                </button>
              </div>
            </form>
          </div>
          <div className="text-center mt-4">
            <p className="text-[10px] text-stone-400 tracking-widest uppercase">
              Curated by Aura Concierge AI · GPT-4.1-NANO.ENG
            </p>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(#B8860B_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <style jsx>{`
        .font-newsreader { font-family: var(--font-newsreader); }
        .font-jakarta { font-family: var(--font-jakarta); }
      `}</style>
    </div>
  );
}
