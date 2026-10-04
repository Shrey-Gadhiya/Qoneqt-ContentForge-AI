import React, { useEffect, useState, useRef } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Circle, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  FastForward, 
  Play, 
  Check, 
  Zap,
  Layers,
  Film
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIPELINE_STAGES } from '../data/mockData';
import { playFuturisticChime, playSuccessChime } from '../utils/audioSynth';

export default function PipelineView({ 
  currentTopic = "Will AI Replace Software Developers?", 
  onPipelineComplete,
  isLiveGenerating = false,
  onReset
}) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [progress, setProgress] = useState(12);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef(null);

  // Auto progression when pipeline is triggered
  useEffect(() => {
    if (!isLiveGenerating && activeStageIndex === 0 && !isCompleted) {
      // Start automatically if opened in live mode
      startPipelineProgression();
    }
  }, [isLiveGenerating]);

  const startPipelineProgression = () => {
    setActiveStageIndex(0);
    setProgress(11);
    setIsCompleted(false);

    let stage = 0;
    playFuturisticChime(440, 0.2);

    const stepInterval = setInterval(() => {
      stage += 1;
      if (stage < PIPELINE_STAGES.length) {
        setActiveStageIndex(stage);
        const percent = Math.min(Math.round(((stage + 1) / PIPELINE_STAGES.length) * 100), 99);
        setProgress(percent);
        playFuturisticChime(500 + stage * 40, 0.15);
      } else {
        clearInterval(stepInterval);
        setActiveStageIndex(PIPELINE_STAGES.length - 1);
        setProgress(100);
        setIsCompleted(true);
        playSuccessChime();

        // Automatically trigger complete after brief pause
        setTimeout(() => {
          onPipelineComplete?.();
        }, 1200);
      }
    }, 1400);

    timerRef.current = stepInterval;
  };

  useEffect(() => {
    startPipelineProgression();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleFastForward = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveStageIndex(PIPELINE_STAGES.length - 1);
    setProgress(100);
    setIsCompleted(true);
    playSuccessChime();
    setTimeout(() => {
      onPipelineComplete?.();
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Top Banner / Topic Header */}
      <div className="rounded-3xl glass-panel-glow border border-purple-500/30 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                {isCompleted ? "Pipeline Completed" : "Neural Pipeline Running"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
              AI Content Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-[#A8A3B8] mt-1 font-inter">
              Target: <span className="text-purple-300 font-semibold">"{currentTopic}"</span> • 9:16 Video Package
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isCompleted ? (
              <button
                onClick={handleFastForward}
                className="px-4 py-2 rounded-xl glass-panel hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-all flex items-center gap-1.5"
                title="Fast forward to completed state"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Fast Forward</span>
              </button>
            ) : (
              <button
                onClick={onPipelineComplete}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-outfit font-bold text-xs shadow-glow-cyan transition-all flex items-center gap-2 animate-bounce"
              >
                <Film className="w-4 h-4" />
                <span>View Final Reel</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-6 pt-5 border-t border-purple-500/20">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-purple-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <span>AI GENERATION PROGRESS</span>
            </span>
            <span className="font-bold text-cyan-300">{progress}%</span>
          </div>

          {/* ASCII styled progress indicator as requested */}
          <div className="relative w-full h-3 bg-[#080415] rounded-full overflow-hidden border border-purple-500/30 p-[1px]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-cyan-400 to-pink-500 shadow-glow-cyan"
              initial={{ width: '10%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#A8A3B8] mt-2">
            <span>Stage {Math.min(activeStageIndex + 1, 9)} of 9</span>
            <span className="text-cyan-400">
              {isCompleted ? "Content Ready 🎉" : PIPELINE_STAGES[activeStageIndex]?.name}
            </span>
          </div>
        </div>

      </div>

      {/* 9 Stages Workflow List */}
      <div className="space-y-3">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isDone = idx < activeStageIndex || isCompleted;
          const isCurrent = idx === activeStageIndex && !isCompleted;
          const isWaiting = idx > activeStageIndex && !isCompleted;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isCurrent
                  ? 'bg-purple-950/40 border-cyan-400 shadow-glow-cyan relative overflow-hidden'
                  : isDone
                  ? 'bg-[#0B061A]/80 border-purple-500/30 text-white'
                  : 'bg-[#060312]/50 border-purple-900/20 text-[#A8A3B8]/60'
              }`}
            >
              {/* Highlight bar for current running stage */}
              {isCurrent && (
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 animate-pulse" />
              )}

              <div className="flex items-center gap-3.5">
                {/* State Icon */}
                <div className="flex-shrink-0">
                  {isDone ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 animate-spin">
                      <Loader2 className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A8A3B8]/40 font-mono text-xs">
                      {stage.id}
                    </div>
                  )}
                </div>

                {/* Stage Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-purple-400">
                      0{stage.id}
                    </span>
                    <h3 className={`font-outfit font-bold text-sm sm:text-base ${
                      isCurrent ? 'text-white' : isDone ? 'text-white/90' : 'text-[#A8A3B8]'
                    }`}>
                      {stage.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#A8A3B8] border border-white/5 hidden md:inline">
                      {stage.agent}
                    </span>
                  </div>
                  <p className="text-xs text-[#A8A3B8] mt-0.5">
                    {stage.description}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-end sm:justify-center">
                {isDone ? (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    ✓ Completed
                  </span>
                ) : isCurrent ? (
                  <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    ⟳ Processing...
                  </span>
                ) : (
                  <span className="text-xs font-mono text-[#A8A3B8]/50">
                    ○ Waiting
                  </span>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Completion Modal / Banner */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/60 via-[#130A2E] to-cyan-950/60 border border-emerald-400/50 shadow-glow-cyan text-center space-y-4"
        >
          <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-8 h-8 animate-bounce" />
          </div>
          <h2 className="text-2xl font-black font-outfit text-white">
            Content Ready 🎉
          </h2>
          <p className="text-sm text-[#A8A3B8] max-w-md mx-auto">
            All 9 pipeline stages certified. 5 scenes, dynamic kinetic subtitles, and neural voice synchronized.
          </p>
          <button
            onClick={onPipelineComplete}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-outfit font-extrabold text-sm shadow-glow-purple hover:shadow-glow-cyan transition-all flex items-center gap-2 mx-auto"
          >
            <span>Open Content Package & Video</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

    </div>
  );
}
