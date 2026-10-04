import React from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  Film, 
  Hourglass, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Eye, 
  TrendingUp,
  Clock,
  Award,
  Zap,
  Share2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardView({ 
  stats, 
  recentContent, 
  onNavigateToCreate, 
  onNavigateToCommunity,
  onSelectRecentContent,
  onOpenPreview
}) {
  const statCards = [
    {
      title: "TOTAL IDEAS",
      value: stats.totalIdeas,
      subtitle: "+14 this week",
      icon: Lightbulb,
      gradient: "from-purple-600/20 to-violet-900/40",
      border: "border-purple-500/30",
      iconColor: "text-purple-400",
      glow: "shadow-purple-500/20"
    },
    {
      title: "GENERATED VIDEOS",
      value: stats.generatedVideos,
      subtitle: "9:16 Short Form",
      icon: Film,
      gradient: "from-cyan-600/20 to-blue-900/40",
      border: "border-cyan-500/30",
      iconColor: "text-cyan-400",
      glow: "shadow-cyan-500/20"
    },
    {
      title: "IN PROGRESS",
      value: stats.inProgress,
      subtitle: "Neural Pipeline Active",
      icon: Hourglass,
      gradient: "from-amber-600/20 to-orange-900/40",
      border: "border-amber-500/30",
      iconColor: "text-amber-400",
      glow: "shadow-amber-500/20"
    },
    {
      title: "PUBLISHED",
      value: stats.published,
      subtitle: "Live on Qoneqt",
      icon: CheckCircle2,
      gradient: "from-emerald-600/20 to-teal-900/40",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      glow: "shadow-emerald-500/20"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl glass-panel-glow p-8 sm:p-12 border border-purple-500/30">
        {/* Glow ambient spots */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-500/20 text-cyan-300 border border-purple-500/30 mb-5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autonomous AI Creator Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-outfit tracking-tight text-white mb-4 leading-tight">
            Turn Ideas Into <span className="text-gradient-neon">Content</span>
          </h1>

          <p className="text-base sm:text-lg text-[#A8A3B8] font-inter mb-8 max-w-2xl leading-relaxed">
            Transform community discussions and trending topics into publish-ready short videos. 
            Scripting, visuals, voiceovers, kinetic captions, and QA scored in 15 seconds.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToCreate}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-outfit font-bold text-sm tracking-wide shadow-glow-purple hover:shadow-glow-cyan transition-all duration-300 flex items-center gap-2.5 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>+ Create New Content</span>
            </button>

            <button
              onClick={onNavigateToCommunity}
              className="px-6 py-3.5 rounded-2xl glass-panel text-white hover:border-cyan-400/60 font-outfit font-semibold text-sm transition-all duration-200 flex items-center gap-2"
            >
              <span>Explore Ideas</span>
              <ArrowRight className="w-4 h-4 text-[#A8A3B8] group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Decorative corner tag */}
        <div className="hidden lg:flex flex-col items-end absolute right-8 bottom-8 text-right pointer-events-none">
          <div className="text-[11px] font-mono text-purple-400/70 uppercase">Target Engine</div>
          <div className="text-sm font-outfit font-semibold text-white">Qoneqt Dynamic Reel Matrix</div>
        </div>
      </section>

      {/* Stats Cards Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border ${stat.border} shadow-lg ${stat.glow} backdrop-blur-xl relative overflow-hidden group hover:border-opacity-80 transition-all`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-medium tracking-wider text-[#A8A3B8] uppercase">
                    {stat.title}
                  </span>
                  <div className={`p-2.5 rounded-xl bg-[#0B061A]/80 border border-white/5 ${stat.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-black font-outfit text-white tracking-tight mb-1">
                  {stat.value}
                </div>

                <div className="text-xs text-[#A8A3B8] font-inter flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                  {stat.subtitle}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Recent Content Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-white">
              Recent Content
            </h2>
            <p className="text-xs text-[#A8A3B8]">
              Latest short-form packages generated by ContentForge AI
            </p>
          </div>
          <button
            onClick={onNavigateToCreate}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>Generate Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentContent.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="rounded-2xl glass-panel-glow border border-purple-500/25 p-5 flex flex-col justify-between relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    ● {item.status}
                  </span>
                  <span className="text-xs text-[#A8A3B8] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#A8A3B8]" />
                    {item.duration}
                  </span>
                </div>

                <h3 className="font-outfit font-bold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-[#A8A3B8] font-mono mb-4">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Award className="w-3.5 h-3.5" /> {item.qualityScore}% Score
                  </span>
                  <span>•</span>
                  <span>{item.views} Views</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-purple-500/15 flex items-center gap-2">
                <button
                  onClick={() => onSelectRecentContent(item.slug)}
                  className="flex-1 py-2 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/60 border border-purple-500/40 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Inspect Story</span>
                </button>
                <button
                  onClick={() => onOpenPreview(item.slug)}
                  className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-cyan-300 transition-all flex items-center justify-center gap-1"
                  title="Watch Video Reel"
                >
                  <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hackathon Architecture Teaser Banner */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-[#0C0620] via-[#150A36] to-[#0A061C] border border-purple-500/25 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-outfit font-bold text-white text-base">
              Autonomous Multi-Agent Content Pipeline
            </h4>
            <p className="text-xs text-[#A8A3B8]">
              8 specialized agents collaborate in real-time to analyze, script, synthesize, and verify social stories.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectRecentContent('agents')}
          className="whitespace-nowrap px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/40 border border-purple-400/30 text-xs font-outfit font-semibold text-purple-200 transition-all flex items-center gap-2"
        >
          <span>View Director Swarm</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

    </div>
  );
}
