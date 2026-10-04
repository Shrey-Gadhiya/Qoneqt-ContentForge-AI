import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Workflow, 
  MessageSquareShare, 
  Film, 
  Network, 
  Cpu, 
  Layers, 
  Flame
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  mobileOpen, 
  setMobileOpen,
  hasGeneratedContent
}) {
  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      badge: null 
    },
    { 
      id: 'create', 
      label: 'Create Content', 
      icon: Sparkles, 
      badge: 'Main Demo',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    { 
      id: 'pipeline', 
      label: 'AI Pipeline', 
      icon: Workflow,
      badge: '9 Stages'
    },
    { 
      id: 'result', 
      label: 'Generated Content', 
      icon: Film,
      badge: hasGeneratedContent ? 'Ready' : null,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    },
    { 
      id: 'community', 
      label: 'Community Ideas', 
      icon: MessageSquareShare,
      badge: '🔥 Hot'
    },
    { 
      id: 'agents', 
      label: 'AI Content Director', 
      icon: Network,
      badge: 'Architecture'
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#080415]/95 border-r border-purple-500/20 flex flex-col justify-between backdrop-blur-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div className="p-6 border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-500 to-cyan-400 p-[1.5px] shadow-glow-purple flex-shrink-0">
                <div className="w-full h-full bg-[#0E0724] rounded-xl flex items-center justify-center">
                  <span className="font-outfit font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Q
                  </span>
                </div>
              </div>
              <div>
                <div className="font-outfit font-black text-xs tracking-[0.25em] text-purple-400 uppercase">
                  QONEQT
                </div>
                <div className="font-outfit font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                  ContentForge <span className="text-cyan-400 font-extrabold text-sm">AI</span>
                </div>
              </div>
            </div>
            
            <p className="mt-3 text-[11px] text-[#A8A3B8] leading-tight italic">
              "From Community Ideas to Publish-Ready Stories"
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-mono tracking-wider text-purple-300/70 uppercase">
              Studio Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/35 to-violet-600/20 border border-purple-400/50 text-white shadow-glow-purple'
                      : 'text-[#A8A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? 'bg-purple-500/30 text-cyan-300' : 'bg-transparent text-[#A8A3B8] group-hover:text-purple-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-outfit tracking-wide">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                      item.badgeColor 
                        ? item.badgeColor 
                        : isActive 
                          ? 'bg-purple-500/20 text-purple-200 border-purple-500/30' 
                          : 'bg-white/5 text-[#A8A3B8] border-white/10'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Studio Status & Footer */}
        <div className="p-4 border-t border-purple-500/20 space-y-3">
          {/* Quick Engine Telemetry */}
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs">
            <div className="flex items-center justify-between text-[#A8A3B8] mb-1.5">
              <span className="flex items-center gap-1.5 text-[11px] font-mono">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Neural Pipeline
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Standby</span>
            </div>
            <div className="w-full bg-purple-950/80 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full w-full animate-pulse" />
            </div>
          </div>

          {/* Built by Team ARCLIGHT */}
          <div className="p-3 rounded-xl glass-panel text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="font-outfit font-semibold text-xs text-white">
              Built by Team ARCLIGHT
            </div>
            <div className="text-[10px] text-purple-400/80 font-mono mt-0.5">
              Hackathon Edition 2026
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
