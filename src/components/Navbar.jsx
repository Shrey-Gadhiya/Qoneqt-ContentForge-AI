import React, { useState } from 'react';
import { 
  Sparkles, 
  PlayCircle, 
  Bell, 
  ShieldCheck, 
  ChevronRight, 
  Presentation,
  Menu,
  X,
  Cpu
} from 'lucide-react';

export default function Navbar({ 
  onStartDemo, 
  isDemoActive, 
  onTogglePresentation,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  activeTab,
  setActiveTab
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    {
      id: 1,
      title: "Viral Hook Spike Detected",
      message: "Trending topic 'Will AI replace software developers?' surged +340% in discussions.",
      time: "5m ago",
      type: "trend"
    },
    {
      id: 2,
      title: "Video Certified for Qoneqt Feed",
      message: "5 Amazing Facts About Gujarat passed 96% Quality Benchmark.",
      time: "18m ago",
      type: "success"
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-500/20 bg-[#05020D]/85 backdrop-blur-xl px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & Brand Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl glass-panel text-white hover:border-purple-400 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-violet-500 to-cyan-400 p-[1px] shadow-glow-purple">
                <div className="w-full h-full bg-[#0B061A] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#05020D] rounded-full animate-ping" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#05020D] rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-outfit font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                  ContentForge <span className="text-cyan-400">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AI System Online
                </span>
              </div>
              <p className="text-[10px] text-[#A8A3B8] font-mono hidden md:block">
                Qoneqt Studio Engine v2.4 • Neural Cluster Active
              </p>
            </div>
          </div>
        </div>

        {/* Center/Actions: Demo Mode + Presentation Mode Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Mode Button */}
          <button
            onClick={onStartDemo}
            disabled={isDemoActive}
            className={`relative group px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 border ${
              isDemoActive 
                ? 'bg-purple-600/30 border-purple-400/80 text-purple-200 shadow-glow-purple animate-pulse'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white border-transparent shadow-lg shadow-purple-600/25 hover:shadow-glow-cyan'
            }`}
            title="Automatically run a 15-20 second guided hackathon demonstration"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
            <span className="whitespace-nowrap font-outfit">
              {isDemoActive ? 'Running Demo...' : '⚡ Demo Mode'}
            </span>
            <span className="hidden xl:inline-block text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-mono text-cyan-200">
              15s Tour
            </span>
          </button>

          {/* Presentation Mode Button */}
          <button
            onClick={onTogglePresentation}
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium glass-panel hover:border-cyan-400/50 text-[#A8A3B8] hover:text-white transition-all flex items-center gap-2"
            title="Cinematic slide-view for judges explaining architecture and flow"
          >
            <Presentation className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline font-outfit">Presentation Mode</span>
          </button>
        </div>

        {/* Right side: Notifications & User Avatar */}
        <div className="flex items-center gap-3">
          {/* Notifications button & dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setUnreadCount(0);
              }}
              className="p-2 rounded-xl glass-panel text-[#A8A3B8] hover:text-white hover:border-purple-400/50 transition-all relative"
              aria-label="View system notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center border border-[#05020D]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel-glow border border-purple-500/30 p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-purple-500/20 mb-2">
                  <h4 className="font-outfit text-xs font-semibold uppercase tracking-wider text-purple-300">
                    Live System Alerts
                  </h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Realtime
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-2.5 rounded-xl bg-purple-900/20 border border-purple-500/20 hover:border-purple-400/40 transition-colors cursor-pointer"
                      onClick={() => {
                        setActiveTab('community');
                        setNotificationsOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between text-xs font-medium text-white mb-1">
                        <span className="truncate pr-2">{item.title}</span>
                        <span className="text-[10px] text-[#A8A3B8] font-mono">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-[#A8A3B8] leading-snug line-clamp-2">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User / Team Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-purple-500/20">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 p-[2px] shadow-glow-purple">
                <div className="w-full h-full bg-[#120A2E] rounded-full flex items-center justify-center font-outfit font-bold text-xs text-white">
                  AR
                </div>
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-outfit font-semibold text-xs text-white leading-tight">
                ARCLIGHT
              </div>
              <div className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400 inline" /> Team ARCLIGHT
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
