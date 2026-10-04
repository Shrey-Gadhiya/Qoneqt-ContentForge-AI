import React, { useState } from 'react';
import { 
  Flame, 
  MessageSquareShare, 
  ArrowRight, 
  ThumbsUp, 
  Sparkles, 
  TrendingUp, 
  Filter, 
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { COMMUNITY_IDEAS } from '../data/mockData';

export default function CommunityIdeasView({ onConvertIdeaToContent }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [ideas, setIdeas] = useState(COMMUNITY_IDEAS);

  const categories = ['All', 'AI Debate', 'EdTech', 'CleanTech', 'Career', 'Culture', 'Urban Tech'];

  const filteredIdeas = ideas.filter((idea) => {
    const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          idea.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUpvote = (id, e) => {
    e.stopPropagation();
    setIdeas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, votes: item.votes + 1 } : item
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel-glow border border-purple-500/30 p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-500/20 text-cyan-300 border border-purple-500/30 mb-3">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Community Crowdsourced Inspiration</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">
            Community <span className="text-gradient-neon">Ideas</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#A8A3B8] mt-2">
            Trending community debates, questions, and discussions ready to be transformed into viral 9:16 video reels with one click.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 pt-5 border-t border-purple-500/20 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A8A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search community discussions or topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09041A] border border-purple-500/30 focus:border-cyan-400 text-xs sm:text-sm text-white placeholder-purple-300/30 outline-none transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-outfit font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600/40 border border-cyan-400 text-white shadow-glow-cyan'
                    : 'glass-panel text-[#A8A3B8] hover:text-white hover:border-purple-400/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ideas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredIdeas.map((idea, index) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -3 }}
            className="rounded-2xl glass-panel-glow border border-purple-500/25 p-5 flex flex-col justify-between relative group hover:border-cyan-400/50 transition-all shadow-lg"
          >
            {/* Top row: Category, discussions & timestamp */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30">
                  {idea.category}
                </span>

                <div className="flex items-center gap-2 text-xs font-mono text-[#A8A3B8]">
                  <span className="flex items-center gap-1 text-orange-400 font-bold">
                    <Flame className="w-3.5 h-3.5" />
                    {idea.discussions} discussions
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-outfit font-extrabold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2">
                "{idea.title}"
              </h3>

              {/* Discussion preview quote */}
              <p className="text-xs text-[#A8A3B8] font-inter leading-relaxed line-clamp-2 mb-4">
                {idea.preview}
              </p>

              {/* Author & Sentiment */}
              <div className="flex items-center justify-between text-xs text-[#A8A3B8] pt-2 border-t border-purple-500/15">
                <div className="flex items-center gap-2">
                  <img
                    src={idea.avatar}
                    alt={idea.author}
                    className="w-6 h-6 rounded-full object-cover border border-purple-400/50"
                  />
                  <span className="font-outfit font-medium text-white text-xs">{idea.author}</span>
                  <span className="text-[10px] text-[#A8A3B8] font-mono">• {idea.timeAgo}</span>
                </div>

                <button
                  onClick={(e) => handleUpvote(idea.id, e)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-purple-600/30 text-purple-200 text-xs transition-colors"
                >
                  <ThumbsUp className="w-3 h-3 text-cyan-400" />
                  <span className="font-mono text-[11px]">{idea.votes}</span>
                </button>
              </div>
            </div>

            {/* Main Action: Convert to Content -> */}
            <div className="mt-4 pt-3 border-t border-purple-500/20">
              <button
                onClick={() => onConvertIdeaToContent(idea.title, idea.slug)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600/40 via-violet-600/40 to-cyan-500/30 hover:from-purple-600 hover:to-cyan-400 border border-purple-400/40 hover:border-transparent text-white font-outfit font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-glow-cyan"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Convert to Content →</span>
              </button>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
}
