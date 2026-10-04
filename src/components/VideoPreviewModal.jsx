import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Download, 
  Send, 
  Sparkles, 
  CheckCircle2,
  Radio,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playFuturisticChime } from '../utils/audioSynth';

export default function VideoPreviewModal({ 
  contentPackage, 
  isOpen, 
  onClose, 
  onPublish, 
  onExport 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const durationSec = contentPackage?.durationSec || 38;
  const scenes = contentPackage?.scenes || [];

  useEffect(() => {
    let interval = null;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSec) return 0;
          return prev + 0.5;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isOpen, durationSec]);

  useEffect(() => {
    if (!scenes.length) return;
    const timePerScene = durationSec / scenes.length;
    const currentIdx = Math.min(Math.floor(currentTime / timePerScene), scenes.length - 1);
    setActiveSceneIndex(currentIdx);
  }, [currentTime, durationSec, scenes.length]);

  if (!isOpen || !contentPackage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl rounded-3xl glass-panel-glow border border-purple-500/40 p-6 sm:p-8 relative shadow-2xl overflow-hidden my-auto"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-outfit font-extrabold text-lg text-white">
                Vertical 9:16 Video Player Preview
              </h3>
              <p className="text-xs text-[#A8A3B8]">
                {contentPackage.title} • {contentPackage.duration}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-panel text-[#A8A3B8] hover:text-white hover:border-purple-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Player Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* 9:16 Video Viewport (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <div 
              className="w-full max-w-[280px] aspect-[9/16] rounded-3xl overflow-hidden relative border-2 border-purple-500/40 shadow-2xl flex flex-col justify-between p-4"
              style={{ background: contentPackage.gradientBg || "linear-gradient(135deg, #1f0b3d 0%, #0d1b3e 50%, #05020d 100%)" }}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

              {/* Top tag */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-white/90">
                <span className="px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-400/30 font-mono text-[10px]">
                  Qoneqt Shorts
                </span>
                <span className="font-mono text-[10px] text-cyan-300">HD 1080x1920</span>
              </div>

              {/* Center Visual & Subtitles */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
                <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-3">
                  <Radio className="w-8 h-8 text-cyan-300 animate-pulse" />
                </div>

                <div className="p-3 rounded-xl bg-black/80 border border-purple-500/40 backdrop-blur-md">
                  <p className="text-xs font-outfit font-extrabold text-yellow-300">
                    "{scenes[activeSceneIndex]?.caption || contentPackage.hook}"
                  </p>
                </div>
              </div>

              {/* Bottom controls inside phone */}
              <div className="relative z-10 space-y-2">
                <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full"
                    style={{ width: `${(currentTime / durationSec) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-white text-xs">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  </button>
                  <span className="font-mono text-[10px]">
                    00:{Math.floor(currentTime).toString().padStart(2, '0')} / 00:{durationSec}
                  </span>
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-pink-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Scene List & Quick Actions (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <h4 className="font-outfit font-bold text-sm text-purple-300 uppercase tracking-wider">
              Scenes Timeline
            </h4>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {scenes.map((scene, idx) => (
                <div
                  key={scene.number}
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setCurrentTime(idx * (durationSec / scenes.length));
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeSceneIndex === idx
                      ? 'bg-purple-600/30 border-cyan-400 text-white shadow-glow-cyan'
                      : 'bg-[#09041A] border-purple-500/20 text-[#A8A3B8] hover:border-purple-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-white">Scene 0{scene.number}: {scene.title}</span>
                    <span className="font-mono text-[10px] text-purple-300">{scene.timecode}</span>
                  </div>
                  <p className="line-clamp-2 text-[#A8A3B8]">{scene.narration}</p>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-purple-500/20 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onExport?.();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl glass-panel hover:border-cyan-400 text-cyan-300 font-outfit font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Package</span>
              </button>

              <button
                onClick={() => {
                  onPublish?.();
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-outfit font-bold text-xs shadow-glow-purple transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Publish to Qoneqt</span>
              </button>
            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
