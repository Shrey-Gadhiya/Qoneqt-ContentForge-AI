import React, { useState } from 'react';
import { 
  Network, 
  Cpu, 
  Sparkles, 
  Search, 
  FileText, 
  LayoutGrid, 
  Mic, 
  Film, 
  ShieldCheck, 
  Send,
  Zap,
  Activity,
  CheckCircle2,
  Terminal,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AGENTS_DATA } from '../data/mockData';

export default function AiDirectorView() {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS_DATA[0]);

  const iconMap = {
    Search,
    FileText,
    LayoutGrid,
    Sparkles,
    Mic,
    Film,
    ShieldCheck,
    Send
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-cyan-400 border border-purple-500/30">
          <Network className="w-3.5 h-3.5" />
          <span>Multi-Agent Swarm Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-outfit text-white tracking-tight">
          AI Content <span className="text-gradient-neon">Director</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#A8A3B8]">
          An autonomous director orchestrating 8 specialized AI agents with strict inter-agent verification and parallel synthesis.
        </p>
      </div>

      {/* Main Multi-Agent Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Swarm Topology Map (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl glass-panel-glow border border-purple-500/30 p-6 sm:p-10 relative overflow-hidden flex flex-col items-center justify-center min-h-[520px]">
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* SVG Animated Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="directorLineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF007F" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Swarm Circular Container */}
          <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center z-10">
            
            {/* Concentric Glowing Orbit Rings */}
            <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-dashed border-cyan-400/20 pointer-events-none" />
            <div className="absolute inset-20 rounded-full border border-purple-400/15 pointer-events-none" />

            {/* Central Node: AI CONTENT DIRECTOR */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="z-20 w-32 h-32 rounded-3xl bg-gradient-to-tr from-purple-700 via-violet-600 to-pink-600 p-[2px] shadow-glow-purple cursor-pointer flex items-center justify-center text-center relative"
            >
              <div className="w-full h-full bg-[#0D0624] rounded-[22px] p-3 flex flex-col items-center justify-center">
                <div className="relative mb-1">
                  <Cpu className="w-7 h-7 text-cyan-300 animate-pulse" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="font-outfit font-black text-[11px] uppercase tracking-wider text-white leading-tight">
                  AI Content
                </div>
                <div className="font-outfit font-black text-xs uppercase tracking-wider text-cyan-300">
                  Director
                </div>
                <span className="mt-1 text-[8px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Master Node
                </span>
              </div>
            </motion.div>

            {/* 8 Surrounding Agent Nodes */}
            {AGENTS_DATA.map((agent, index) => {
              const Icon = iconMap[agent.icon] || Sparkles;
              const angleRad = (agent.angle * Math.PI) / 180;
              const radiusPercent = 42; // distance from center in %
              const left = 50 + radiusPercent * Math.cos(angleRad);
              const top = 50 + radiusPercent * Math.sin(angleRad);
              const isSelected = selectedAgent.id === agent.id;

              return (
                <div
                  key={agent.id}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 15
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex flex-col items-center justify-center group ${
                      isSelected
                        ? 'bg-purple-600/50 border-cyan-400 shadow-glow-cyan scale-110'
                        : 'bg-[#0E0722]/90 border-purple-500/30 hover:border-purple-400'
                    }`}
                    title={agent.name}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-cyan-300' : 'text-[#A8A3B8] group-hover:text-white'}`} />
                    <span className="text-[9px] font-mono text-white/90 mt-1 max-w-[65px] truncate text-center hidden sm:block">
                      {agent.name.replace(' Agent', '')}
                    </span>
                  </motion.button>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-xs font-mono text-[#A8A3B8] text-center z-10">
            Click on any agent node to inspect telemetry, prompts, and verification status.
          </div>
        </div>

        {/* Right: Selected Agent Inspector (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl glass-panel-glow border border-purple-500/30 p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
            <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
              Agent Telemetry
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {selectedAgent.status}
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-400/40 mb-3">
              <Sparkles className="w-5 h-5 text-cyan-300" />
              <div>
                <h3 className="font-outfit font-extrabold text-base text-white">
                  {selectedAgent.name}
                </h3>
                <span className="text-xs font-mono text-cyan-300">
                  {selectedAgent.role}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A8A3B8] leading-relaxed">
              {selectedAgent.description}
            </p>
          </div>

          {/* Operational Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#09041A] border border-purple-500/20">
              <div className="text-[10px] font-mono text-[#A8A3B8] uppercase">Tasks Handled</div>
              <div className="text-lg font-outfit font-bold text-white mt-0.5">
                {selectedAgent.tasksCompleted}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#09041A] border border-purple-500/20">
              <div className="text-[10px] font-mono text-[#A8A3B8] uppercase">Reliability</div>
              <div className="text-lg font-outfit font-bold text-emerald-400 mt-0.5">
                {selectedAgent.accuracy}
              </div>
            </div>
          </div>

          {/* Verification Protocol Box */}
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-purple-200 font-mono font-bold">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inter-Agent Protocol</span>
            </div>
            <p className="text-[11px] text-[#A8A3B8] font-mono leading-relaxed">
              Autonomous handoff verified through JSON contract schema with QA feedback loop before video compile.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
