'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, HardDrive, ShieldCheck, Database, Layers, Bot } from 'lucide-react';

export default function TelemetryPage() {
  const [stats, setStats] = useState({
    nvidia: { facts: 0, tokens: 0 },
    gemini: { facts: 0, tokens: 0 },
    lastUpdate: 'Awakening...'
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/telemetry');
        const data = await res.json();
        setStats(data);
      } catch (err) {}
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const totalFacts = stats.nvidia.facts + stats.gemini.facts;
  const progressPercent = Math.min((totalFacts / 22000) * 100, 100);

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-8 font-[Inter] text-gray-800">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1 flex items-center gap-3">
              <Activity className="text-[#6366F1]" />
              Neural Telemetry
            </h1>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Aura Dual-Hydra Realtime Feed</p>
          </div>
          <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Last Sync</p>
              <p className="text-xs font-mono font-bold text-[#6366F1]">{stats.lastUpdate || 'Waiting for heartbeat...'}</p>
          </div>
        </div>

        {/* Global Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Database size={16} className="text-indigo-500" />
                    <span className="text-sm font-bold uppercase tracking-wide">Knowledge Saturation</span>
                </div>
                <span className="text-2xl font-black text-indigo-600">{totalFacts.toLocaleString()} <span className="text-sm text-gray-300">/ 22,000</span></span>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-100 p-0.5">
                <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>

        {/* Model Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* NVIDIA Engine */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={120} />
            </div>
            <div className="relative">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                            <Zap size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight">NV-Link Engine</h2>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active Head A</p>
                        </div>
                    </div>
                    <ShieldCheck className="text-gray-200" />
                </div>
                
                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Process Volume</p>
                        <p className="text-3xl font-black text-gray-900">{stats.nvidia.facts.toLocaleString()} <span className="text-sm font-medium text-gray-300">Facts</span></p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Token Consumption</p>
                        <p className="text-3xl font-black text-indigo-600">{stats.nvidia.tokens.toLocaleString()} <span className="text-sm font-medium text-indigo-200 uppercase tracking-tighter">tk</span></p>
                    </div>
                </div>
            </div>
          </div>

          {/* Gemini Engine */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Layers size={120} />
            </div>
            <div className="relative">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight">Gemini Vertex</h2>
                            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Active Head B</p>
                        </div>
                    </div>
                    <ShieldCheck className="text-gray-200" />
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Process Volume</p>
                        <p className="text-3xl font-black text-gray-900">{stats.gemini.facts.toLocaleString()} <span className="text-sm font-medium text-gray-300">Facts</span></p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Token Consumption</p>
                        <p className="text-3xl font-black text-emerald-600">{stats.gemini.tokens.toLocaleString()} <span className="text-sm font-medium text-emerald-200 uppercase tracking-tighter">tk</span></p>
                    </div>
                </div>
            </div>
          </div>

        </div>

        {/* Footer Hardware Info */}
        <div className="flex justify-center gap-8 border-t border-gray-200 pt-8 opacity-40">
            <div className="flex items-center gap-2">
                <HardDrive size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">1536-D Vector Precision</span>
            </div>
            <div className="flex items-center gap-2">
                <ShieldCheck size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">Secure Institutional Vault</span>
            </div>
        </div>
      </div>
    </div>
  );
}
