import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Share2, 
  Download, 
  Edit3, 
  CheckCircle2, 
  Award, 
  Send, 
  Eye, 
  Clock, 
  ChevronRight,
  Maximize2,
  FileText,
  Layers,
  Radio,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playFuturisticChime } from '../utils/audioSynth';

export default function GeneratedResultView({ 
  contentPackage, 
  onOpenPreviewModal, 
  onOpenEditModal, 
  onPublishToQoneqt,
  onExportPackage,
  addToast
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [copiedHook, setCopiedHook] = useState(false);

  const durationSec = contentPackage?.durationSec || 38;
  const scenes = contentPackage?.scenes || [];

  // Playback timer loop
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSec) {
            return 0; // Loop seamlessly
          }
          return prev + 0.5;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, durationSec]);

  // Sync active scene based on currentTime
  useEffect(() => {
    if (!scenes.length) return;
    const timePerScene = durationSec / scenes.length;
    const currentIdx = Math.min(Math.floor(currentTime / timePerScene), scenes.length - 1);
    setActiveSceneIndex(currentIdx);
  }, [currentTime, durationSec, scenes.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    playFuturisticChime(isPlaying ? 350 : 550, 0.15);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      playFuturisticChime(660, 0.2);
      addToast({
        title: "Audio Preview Enabled",
        message: "Neural speech track and background ambience unmuted.",
        type: "sparkle"
      });
    }
  };

  const handleCopyHook = () => {
    navigator.clipboard?.writeText(contentPackage.hook);
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 2000);
    addToast({
      title: "Hook Copied",
      message: "Ready to paste into your social clips or show notes.",
      type: "success"
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-glow border border-purple-500/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>AI Pipeline Complete • Certified</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-outfit text-white">
            Your Content Is Ready
          </h1>
          <p className="text-xs sm:text-sm text-[#A8A3B8] mt-1">
            Topic: <span className="text-white font-semibold">{contentPackage.title}</span> • 9:16 Vertical Reel
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenEditModal}
            className="px-3.5 py-2.5 rounded-xl glass-panel hover:border-purple-400 text-xs font-outfit font-semibold text-white transition-all flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4 text-purple-300" />
            <span>Edit Script</span>
          </button>

          <button
            onClick={onExportPackage}
            className="px-3.5 py-2.5 rounded-xl glass-panel hover:border-cyan-400 text-xs font-outfit font-semibold text-cyan-300 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Package</span>
          </button>

          <button
            onClick={onPublishToQoneqt}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-outfit font-bold text-xs shadow-glow-purple hover:shadow-glow-cyan transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Publish to Qoneqt</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (LEFT: Phone 9:16 preview | RIGHT: Content Package) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Phone-Shaped 9:16 Video Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          {/* Smartphone Hardware Frame */}
          <div className="relative w-full max-w-[320px] aspect-[9/19] rounded-[48px] bg-[#0A051A] p-3 shadow-2xl border-[4px] border-purple-500/40 shadow-glow-purple overflow-hidden">
            
            {/* Speaker & Camera Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#05020D] rounded-full z-30 flex items-center justify-center gap-3 border border-purple-500/20">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-900/60 border border-cyan-400/40" />
              <span className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Phone Screen Display */}
            <div 
              className="w-full h-full rounded-[38px] overflow-hidden relative flex flex-col justify-between p-4"
              style={{ background: contentPackage.gradientBg || "linear-gradient(135deg, #1f0b3d 0%, #0d1b3e 50%, #05020d 100%)" }}
            >
              {/* Dynamic Animated Background Mesh / Waveform */}
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl animate-pulse-slow" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/25 rounded-full blur-2xl animate-pulse-slow" />

              {/* Status bar top (Time, 5G, Battery) */}
              <div className="relative z-20 flex items-center justify-between text-[11px] text-white/80 font-mono px-2 pt-2">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>5G</span>
                  <span className="w-4 h-2 border border-white/60 rounded-sm p-[1px] flex items-center">
                    <span className="w-full h-full bg-cyan-400 rounded-xs" />
                  </span>
                </div>
              </div>

              {/* Central Video Content & Animated Graphic Visual */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-3 my-4">
                
                {/* Visual Category Chip */}
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-600/40 border border-purple-400/40 text-[10px] font-mono text-cyan-200 mb-3 backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  <span>Scene 0{activeSceneIndex + 1}: {scenes[activeSceneIndex]?.title}</span>
                </div>

                {/* Animated Graphic Center Badge */}
                <motion.div 
                  key={activeSceneIndex}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600/40 via-cyan-500/20 to-pink-500/30 border border-cyan-400/40 flex items-center justify-center p-4 backdrop-blur-md shadow-glow-cyan mb-4 relative"
                >
                  <div className="absolute inset-0 rounded-3xl bg-cyan-400/10 animate-ping opacity-25" />
                  <Radio className="w-10 h-10 text-cyan-300 animate-pulse" />
                </motion.div>

                {/* Video Title */}
                <h3 className="text-base font-outfit font-extrabold text-white leading-snug drop-shadow-md mb-2 line-clamp-2">
                  {contentPackage.title}
                </h3>

                {/* Dynamic Animated Captions (Subtitles) */}
                <div className="min-h-[72px] flex items-center justify-center">
                  <motion.div
                    key={activeSceneIndex}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    className="p-3 rounded-2xl bg-black/75 border border-purple-500/40 backdrop-blur-xl shadow-lg"
                  >
                    <p className="text-xs font-outfit font-extrabold text-yellow-300 tracking-wide leading-relaxed">
                      "{scenes[activeSceneIndex]?.caption || contentPackage.hook}"
                    </p>
                  </motion.div>
                </div>

                {/* Audio Waveform Animation Simulation */}
                <div className="flex items-center justify-center gap-1 mt-4 h-6">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: isPlaying ? [4, 18, 8, 22, 6][(i + Math.floor(currentTime * 2)) % 5] : 4
                      }}
                      transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                      className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full"
                    />
                  ))}
                </div>

              </div>

              {/* Video Bottom Overlay & Controls */}
              <div className="relative z-20 space-y-2 pt-2 pb-1">
                
                {/* Progress bar */}
                <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${(currentTime / durationSec) * 100}%` }}
                  />
                </div>

                {/* Playback action bar */}
                <div className="flex items-center justify-between text-white text-xs px-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    </button>

                    <button
                      onClick={() => setCurrentTime(0)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#A8A3B8] hover:text-white transition-colors"
                      title="Replay"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#A8A3B8] hover:text-white transition-colors"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-3 h-3 text-pink-400" /> : <Volume2 className="w-3 h-3 text-cyan-400" />}
                    </button>
                  </div>

                  <span className="font-mono text-[10px] text-[#A8A3B8]">
                    00:{Math.floor(currentTime).toString().padStart(2, '0')} / 00:{durationSec}
                  </span>

                  <button
                    onClick={onOpenPreviewModal}
                    className="p-1.5 rounded-full bg-purple-600/40 hover:bg-purple-600/80 text-cyan-300 transition-colors"
                    title="Fullscreen Modal Preview"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="text-xs font-mono text-[#A8A3B8] flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              9:16 Vertical Short Reel (Ready for Qoneqt)
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: CONTENT PACKAGE (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* HOOK CARD */}
          <div className="p-6 rounded-2xl glass-panel border border-purple-500/30 relative group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-cyan-300 text-xs font-mono font-bold uppercase">
                  Viral Hook (First 3 Sec)
                </span>
                <span className="text-[11px] font-mono text-emerald-400">97% Retention Score</span>
              </div>
              <button
                onClick={handleCopyHook}
                className="text-xs text-[#A8A3B8] hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
              >
                {copiedHook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHook ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <p className="text-base sm:text-lg font-outfit font-bold text-white leading-relaxed">
              "{contentPackage.hook}"
            </p>
          </div>

          {/* SCRIPT ACCORDION / 5 SCENES */}
          <div className="p-6 rounded-2xl glass-panel border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="font-outfit font-bold text-base text-white">
                  5-Scene Neural Script
                </h3>
              </div>
              <span className="text-xs font-mono text-[#A8A3B8]">
                {contentPackage.duration} • {contentPackage.language}
              </span>
            </div>

            <div className="space-y-3">
              {scenes.map((scene, idx) => {
                const isActive = activeSceneIndex === idx;
                return (
                  <div
                    key={scene.number}
                    onClick={() => {
                      setActiveSceneIndex(idx);
                      const timePerScene = durationSec / scenes.length;
                      setCurrentTime(idx * timePerScene);
                      playFuturisticChime(500 + idx * 50, 0.1);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-purple-950/40 border-cyan-400/80 shadow-glow-cyan'
                        : 'bg-[#09041A] border-purple-500/20 hover:border-purple-400/40 text-[#A8A3B8]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                          isActive ? 'bg-cyan-400 text-black' : 'bg-purple-900/40 text-purple-300'
                        }`}>
                          {scene.number}
                        </span>
                        <h4 className="font-outfit font-bold text-sm text-white">
                          Scene 0{scene.number} — {scene.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-[#A8A3B8]">
                        {scene.timecode}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed pl-8">
                      {scene.narration}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-purple-500/10 pl-8 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="text-cyan-300/80">
                        Visual: {scene.visualDesc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VERIFICATION & QUALITY SCORE BADGES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* AI Voice */}
            <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-outfit font-bold text-white">
                  AI Voice Generated ✓
                </div>
                <div className="text-[10px] text-[#A8A3B8] font-mono">
                  Neural Studio EQ 24kHz
                </div>
              </div>
            </div>

            {/* Captions */}
            <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-outfit font-bold text-white">
                  Auto Captions ✓
                </div>
                <div className="text-[10px] text-[#A8A3B8] font-mono">
                  Kinetic word sync
                </div>
              </div>
            </div>

            {/* Quality Score */}
            <div className="p-4 rounded-2xl glass-panel border border-purple-500/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold font-mono text-sm">
                {contentPackage.qualityScore}%
              </div>
              <div>
                <div className="text-xs font-outfit font-bold text-white">
                  {contentPackage.qualityScore}% Quality Score
                </div>
                <div className="text-[10px] text-[#A8A3B8] font-mono">
                  High virality probability
                </div>
              </div>
            </div>

          </div>

          {/* FOUR MAJOR BUTTONS */}
          <div className="p-6 rounded-2xl glass-panel-glow border border-purple-500/30 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold mb-2">
              Production Actions
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Button 1: Preview */}
              <button
                onClick={onOpenPreviewModal}
                className="py-3 px-3 rounded-xl bg-purple-900/30 hover:bg-purple-600/40 border border-purple-500/30 hover:border-purple-400 text-white font-outfit font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-cyan-300 fill-cyan-300" />
                <span>▶ Preview</span>
              </button>

              {/* Button 2: Edit */}
              <button
                onClick={onOpenEditModal}
                className="py-3 px-3 rounded-xl bg-purple-900/30 hover:bg-purple-600/40 border border-purple-500/30 hover:border-purple-400 text-white font-outfit font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4 text-purple-300" />
                <span>✏ Edit</span>
              </button>

              {/* Button 3: Export */}
              <button
                onClick={onExportPackage}
                className="py-3 px-3 rounded-xl bg-purple-900/30 hover:bg-purple-600/40 border border-purple-500/30 hover:border-cyan-400 text-cyan-300 font-outfit font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>⬇ Export</span>
              </button>

              {/* Button 4: Publish to Qoneqt */}
              <button
                onClick={onPublishToQoneqt}
                className="py-3 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-outfit font-bold text-xs sm:text-sm shadow-glow-purple transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>🚀 Publish</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
