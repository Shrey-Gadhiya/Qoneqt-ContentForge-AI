import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Clock, 
  Globe, 
  Smartphone, 
  Flame, 
  HelpCircle,
  Check,
  Compass,
  MessageSquare,
  Wand2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CreateContentView({ 
  onStartPipeline,
  initialTopic = "Will AI Replace Software Developers?",
  initialStyle = "Explainer",
  initialDuration = "60 sec",
  initialLanguage = "English"
}) {
  const [activeTab, setActiveTab] = useState('community'); // 'community' | 'trending' | 'custom'
  const [topicInput, setTopicInput] = useState(initialTopic);
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [selectedDuration, setSelectedDuration] = useState(initialDuration);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const styleOptions = [
    { id: 'Educational', label: 'Educational', desc: 'Insightful, academic & data-driven' },
    { id: 'News', label: 'News', desc: 'Fast, urgent & journalistic breakdown' },
    { id: 'Storytelling', label: 'Storytelling', desc: 'Emotional hook with narrative arc' },
    { id: 'Explainer', label: 'Explainer', desc: 'Simplifies complex themes with clarity' },
    { id: 'Entertainment', label: 'Entertainment', desc: 'Punchy humor, high energy & viral pace' },
  ];

  const durationOptions = [
    { id: '30 sec', label: '30 sec', desc: 'Ultra-fast viral hook' },
    { id: '60 sec', label: '60 sec', desc: 'Balanced 5-scene reel' },
    { id: '90 sec', label: '90 sec', desc: 'Deep-dive micro documentary' },
  ];

  const languageOptions = [
    { id: 'English', label: 'English', flag: '🌐' },
    { id: 'Hindi', label: 'Hindi', flag: '🇮🇳' },
    { id: 'Gujarati', label: 'Gujarati', flag: '🏛️' },
  ];

  const quickSuggestions = [
    {
      title: "Will AI Replace Software Developers?",
      category: "Tech Debate",
      style: "Explainer"
    },
    {
      title: "5 Amazing Facts About Gujarat",
      category: "Culture",
      style: "Storytelling"
    },
    {
      title: "Future of Smart Cities",
      category: "Urban Tech",
      style: "Educational"
    },
    {
      title: "How AI is Changing Education",
      category: "EdTech",
      style: "Explainer"
    }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!topicInput.trim()) return;

    onStartPipeline({
      topic: topicInput,
      style: selectedStyle,
      duration: selectedDuration,
      language: selectedLanguage,
      format: '9:16 Short Video'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Heading */}
      <div className="text-center space-y-2 mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-cyan-400 border border-purple-500/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Qoneqt Neural Studio Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-outfit text-white tracking-tight">
          Create Content in <span className="text-gradient-neon">Seconds</span>
        </h1>
        <p className="text-sm sm:text-base text-[#A8A3B8] max-w-xl mx-auto">
          Give ContentForge an idea. AI handles research, storytelling, neural voice, video composition, and captions.
        </p>
      </div>

      {/* Main Glass Creation Card */}
      <div className="rounded-3xl glass-panel-glow border border-purple-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Glow corner effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          
          {/* INPUT TYPE TABS */}
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
              Source Selection
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#080415] rounded-2xl border border-purple-500/20">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('community');
                  setTopicInput("Will AI Replace Software Developers?");
                }}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-outfit font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'community'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-purple'
                    : 'text-[#A8A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-cyan-300" />
                <span className="truncate">Community Idea</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('trending');
                  setTopicInput("5 Amazing Facts About Gujarat");
                }}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-outfit font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'trending'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-purple'
                    : 'text-[#A8A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="truncate">Trending Topic</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('custom');
                  setTopicInput("");
                }}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-outfit font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'custom'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-purple'
                    : 'text-[#A8A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Wand2 className="w-4 h-4 text-pink-400" />
                <span className="truncate">Custom Topic</span>
              </button>
            </div>
          </div>

          {/* MAIN TOPIC INPUT */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="topic-input" className="block text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                What do you want to create content about?
              </label>
              <span className="text-[11px] font-mono text-[#A8A3B8]">
                Instant AI Scripting
              </span>
            </div>

            <div className="relative">
              <input
                id="topic-input"
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="e.g. Will AI replace software developers?"
                className="w-full px-5 py-4 rounded-2xl bg-[#09041A] border border-purple-500/35 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-purple-300/30 text-base sm:text-lg font-outfit outline-none transition-all shadow-inner"
              />
              {topicInput && (
                <button
                  type="button"
                  onClick={() => setTopicInput("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#A8A3B8] hover:text-white px-2 py-1 rounded bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-[#A8A3B8] font-mono mr-1">Demo Ideas:</span>
              {quickSuggestions.map((sug) => (
                <button
                  key={sug.title}
                  type="button"
                  onClick={() => {
                    setTopicInput(sug.title);
                    setSelectedStyle(sug.style);
                  }}
                  className="px-3 py-1 rounded-full text-xs bg-purple-900/25 hover:bg-purple-600/30 border border-purple-500/25 hover:border-cyan-400/50 text-purple-200 transition-all text-left truncate max-w-xs"
                >
                  {sug.title}
                </button>
              ))}
            </div>
          </div>

          {/* PARAMETERS SECTION (Style, Duration, Language, Format) */}
          <div className="space-y-6 pt-2 border-t border-purple-500/20">
            
            {/* CONTENT STYLE */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                Content Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {styleOptions.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-purple-600/30 border-cyan-400 text-white shadow-glow-cyan'
                          : 'bg-[#09041A] border-purple-500/20 text-[#A8A3B8] hover:text-white hover:border-purple-400/50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-outfit font-semibold text-xs sm:text-sm">
                        <span>{style.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <p className="text-[10px] text-[#A8A3B8] mt-1 line-clamp-1">
                        {style.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DURATION & LANGUAGE & FORMAT GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* DURATION */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {durationOptions.map((dur) => (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`py-2 px-2 rounded-xl border text-center font-outfit text-xs font-semibold transition-all ${
                        selectedDuration === dur.id
                          ? 'bg-purple-600/30 border-purple-400 text-white shadow-glow-purple'
                          : 'bg-[#09041A] border-purple-500/20 text-[#A8A3B8] hover:text-white hover:border-purple-500/50'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* LANGUAGE */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" /> Language
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`py-2 px-2 rounded-xl border text-center font-outfit text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                        selectedLanguage === lang.id
                          ? 'bg-purple-600/30 border-purple-400 text-white shadow-glow-purple'
                          : 'bg-[#09041A] border-purple-500/20 text-[#A8A3B8] hover:text-white hover:border-purple-500/50'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FORMAT */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Format
                </label>
                <div className="p-2 rounded-xl bg-purple-600/20 border border-purple-400/40 text-center flex items-center justify-center gap-2 text-white font-outfit text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>9:16 Short Video (Reels/Shorts)</span>
                </div>
              </div>

            </div>

          </div>

          {/* MAIN SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!topicInput.trim()}
              className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-outfit font-extrabold text-base sm:text-lg tracking-wider uppercase shadow-glow-purple hover:shadow-glow-cyan transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-45 transition-transform" />
              <span>✨ GENERATE CONTENT</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <p className="text-center text-xs text-[#A8A3B8] font-mono mt-3">
              Directs 8 autonomous AI agents • Generates 5 scenes, neural voice, captions & video timeline
            </p>
          </div>

        </form>
      </div>

    </div>
  );
}
