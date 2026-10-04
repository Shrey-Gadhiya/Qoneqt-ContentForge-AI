import React from 'react';
import { 
  X, 
  Sparkles, 
  ArrowDown, 
  MessageSquareShare, 
  Cpu, 
  Workflow, 
  Smartphone, 
  Globe, 
  Play, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PresentationMode({ 
  onClose, 
  onStartDemo 
}) {
  const steps = [
    {
      step: "01",
      title: "COMMUNITY IDEA",
      subtitle: "Crowdsourced Debates & Trends",
      description: "Qoneqt threads, discussions, and high-velocity community questions serve as the raw spark.",
      icon: MessageSquareShare,
      color: "from-purple-500 to-indigo-500",
      accent: "text-purple-400"
    },
    {
      step: "02",
      title: "AI CONTENT DIRECTOR",
      subtitle: "Multi-Agent Swarm Orchestration",
      description: "8 autonomous agents deconstruct the thesis, conduct fact-checking, and design retention hooks.",
      icon: Cpu,
      color: "from-indigo-500 to-cyan-500",
      accent: "text-cyan-400"
    },
    {
      step: "03",
      title: "CONTENT PIPELINE",
      subtitle: "Autonomous 9-Stage Engine",
      description: "Scripts 5 scenes, synthesizes expressive neural speech, renders motion graphics, and aligns captions.",
      icon: Workflow,
      color: "from-cyan-500 to-teal-500",
      accent: "text-cyan-300"
    },
    {
      step: "04",
      title: "SHORT-FORM VIDEO",
      subtitle: "9:16 Vertical Viral Reel",
      description: "Audited by QA Agent with 94%+ quality score, kinetic word styling, and certified engagement triggers.",
      icon: Smartphone,
      color: "from-pink-500 to-purple-500",
      accent: "text-pink-400"
    },
    {
      step: "05",
      title: "QONEQT GLOBAL FEED",
      subtitle: "Instant Ecosystem Reach",
      description: "One-click deployment to global audiences, converting casual readers into high-retention video viewers.",
      icon: Globe,
      color: "from-emerald-400 to-cyan-400",
      accent: "text-emerald-400"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#05020D]/95 backdrop-blur-2xl overflow-y-auto p-4 sm:p-8 flex flex-col justify-between">
      
      {/* Top Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-400 p-[1.5px]">
            <div className="w-full h-full bg-[#0B061A] rounded-xl flex items-center justify-center font-outfit font-black text-cyan-400">
              Q
            </div>
          </div>
          <div>
            <div className="font-outfit font-black text-xs text-purple-400 tracking-widest uppercase">
              HACKATHON PRESENTATION
            </div>
            <div className="font-outfit font-bold text-lg text-white">
              Qoneqt ContentForge AI <span className="text-cyan-400 font-mono text-xs">• Team ARCLIGHT</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onStartDemo();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-outfit font-bold text-xs shadow-glow-purple transition-all flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Launch Live 15s Demo</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-panel text-[#A8A3B8] hover:text-white hover:border-purple-400 transition-colors"
            title="Exit Presentation Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Cinematic Architectural Flow */}
      <div className="max-w-5xl w-full mx-auto py-8 sm:py-12 space-y-6">
        
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-cyan-300 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The 10-Second Mental Model for Hackathon Judges</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-outfit text-white tracking-tight">
            From Community Ideas to <span className="text-gradient-neon">Publish-Ready Stories</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8A3B8] max-w-2xl mx-auto">
            How Qoneqt turns unstructured discussions into high-impact short-form video in seconds.
          </p>
        </div>

        {/* 5 Steps Flow */}
        <div className="space-y-4">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={item.step}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl glass-panel-glow border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan-400/50 transition-all shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-[1.5px] shadow-glow-purple flex-shrink-0`}>
                      <div className="w-full h-full bg-[#0B061A] rounded-2xl flex items-center justify-center text-white">
                        <Icon className="w-6 h-6 text-cyan-300" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-purple-400">
                          {item.step}
                        </span>
                        <h3 className="font-outfit font-black text-lg sm:text-xl text-white tracking-wide">
                          {item.title}
                        </h3>
                      </div>
                      <div className={`text-xs font-mono font-semibold ${item.accent}`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A8A3B8] max-w-md sm:text-right">
                    {item.description}
                  </p>
                </motion.div>

                {!isLast && (
                  <div className="flex justify-center py-0.5">
                    <div className="w-8 h-8 rounded-full bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-cyan-400 animate-bounce">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl w-full mx-auto pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8A3B8] gap-3">
        <div className="font-outfit">
          Designed for Qoneqt Hackathon 2026 • Team ARCLIGHT
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl glass-panel text-white hover:border-cyan-400 font-outfit text-xs"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

    </div>
  );
}
