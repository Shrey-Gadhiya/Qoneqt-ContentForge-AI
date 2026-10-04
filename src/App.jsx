import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  SAMPLE_TOPICS, 
  INITIAL_STATS, 
  INITIAL_RECENT_CONTENT 
} from './data/mockData';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CreateContentView from './components/CreateContentView';
import PipelineView from './components/PipelineView';
import GeneratedResultView from './components/GeneratedResultView';
import CommunityIdeasView from './components/CommunityIdeasView';
import AiDirectorView from './components/AiDirectorView';
import PresentationMode from './components/PresentationMode';
import VideoPreviewModal from './components/VideoPreviewModal';
import ScriptEditModal from './components/ScriptEditModal';
import ToastContainer from './components/Toast';
import { playSuccessChime, playFuturisticChime } from './utils/audioSynth';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'create' | 'pipeline' | 'result' | 'community' | 'agents'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Content & Creation State (persisted in localStorage)
  const [currentTopic, setCurrentTopic] = useState("Will AI Replace Software Developers?");
  const [creationParams, setCreationParams] = useState({
    style: "Explainer",
    duration: "60 sec",
    language: "English"
  });

  const [contentPackage, setContentPackage] = useState(() => {
    try {
      const saved = localStorage.getItem('cf_current_package');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return SAMPLE_TOPICS["will-ai-replace-developers"];
  });

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('cf_stats');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_STATS;
  });

  const [recentContent, setRecentContent] = useState(() => {
    try {
      const saved = localStorage.getItem('cf_recent_content');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_RECENT_CONTENT;
  });

  // Demo Mode state
  const [isDemoActive, setIsDemoActive] = useState(false);
  const demoTimeoutRef = useRef([]);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = ({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cf_current_package', JSON.stringify(contentPackage));
      localStorage.setItem('cf_stats', JSON.stringify(stats));
      localStorage.setItem('cf_recent_content', JSON.stringify(recentContent));
    } catch {
      // Ignore
    }
  }, [contentPackage, stats, recentContent]);

  // Handle Create Submit -> Starts Pipeline
  const handleStartPipeline = (params) => {
    setCurrentTopic(params.topic);
    setCreationParams({
      style: params.style,
      duration: params.duration,
      language: params.language
    });

    // Find best matching pre-defined package or adapt
    let matchedKey = Object.keys(SAMPLE_TOPICS).find((key) =>
      SAMPLE_TOPICS[key].title.toLowerCase().includes(params.topic.toLowerCase()) ||
      params.topic.toLowerCase().includes(SAMPLE_TOPICS[key].title.toLowerCase())
    );

    const basePackage = matchedKey ? SAMPLE_TOPICS[matchedKey] : SAMPLE_TOPICS["will-ai-replace-developers"];
    
    const newPackage = {
      ...basePackage,
      title: params.topic,
      style: params.style,
      duration: params.duration,
      language: params.language,
      qualityScore: Math.floor(Math.random() * 5) + 93 // 93-97%
    };

    setContentPackage(newPackage);
    setActiveTab('pipeline');

    addToast({
      title: "Pipeline Initiated",
      message: `Analyzing: "${params.topic}" through 8 neural agents.`,
      type: "sparkle"
    });
  };

  // When Pipeline Completes
  const handlePipelineComplete = () => {
    setActiveTab('result');
    playSuccessChime();

    // Increment stats
    setStats((prev) => ({
      ...prev,
      generatedVideos: prev.generatedVideos + 1,
      inProgress: Math.max(0, prev.inProgress - 1)
    }));

    addToast({
      title: "Content Ready 🎉",
      message: "Hook, 5 scenes, and 9:16 short reel compiled successfully.",
      type: "success"
    });
  };

  // Convert Idea to Content from Community tab
  const handleConvertIdeaToContent = (topicTitle, slug) => {
    setCurrentTopic(topicTitle);
    if (slug && SAMPLE_TOPICS[slug]) {
      setContentPackage(SAMPLE_TOPICS[slug]);
    }
    setActiveTab('create');
    playFuturisticChime(600, 0.2);
    addToast({
      title: "Community Idea Selected",
      message: `Loaded "${topicTitle}" into ContentForge Studio.`,
      type: "sparkle"
    });
  };

  // Inspect recent content item
  const handleSelectRecentContent = (slug) => {
    if (slug === 'agents') {
      setActiveTab('agents');
      return;
    }
    if (SAMPLE_TOPICS[slug]) {
      setContentPackage(SAMPLE_TOPICS[slug]);
      setCurrentTopic(SAMPLE_TOPICS[slug].title);
      setActiveTab('result');
    }
  };

  // Open Preview Modal directly
  const handleOpenPreview = (slug) => {
    if (SAMPLE_TOPICS[slug]) {
      setContentPackage(SAMPLE_TOPICS[slug]);
      setCurrentTopic(SAMPLE_TOPICS[slug].title);
    }
    setPreviewModalOpen(true);
    playFuturisticChime(500, 0.15);
  };

  // Publish to Qoneqt
  const handlePublishToQoneqt = () => {
    playSuccessChime();

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#9D4EDD', '#00F0FF', '#FF007F', '#10B981']
    });

    // Update stats
    setStats((prev) => ({
      ...prev,
      published: prev.published + 1
    }));

    // Update recent content item if matches
    setRecentContent((prev) => {
      const exists = prev.some((item) => item.title === contentPackage.title);
      if (exists) {
        return prev.map((item) =>
          item.title === contentPackage.title
            ? { ...item, status: "Published", badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" }
            : item
        );
      }
      return [
        {
          id: `recent-${Date.now()}`,
          title: contentPackage.title,
          status: "Published",
          duration: contentPackage.duration,
          slug: contentPackage.id,
          views: "1.2K",
          qualityScore: contentPackage.qualityScore,
          date: "Just now",
          badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
        },
        ...prev.slice(0, 2)
      ];
    });

    addToast({
      title: "Published Successfully! 🚀",
      message: "✓ Content published successfully to Qoneqt Global Feed",
      type: "success",
      duration: 5000
    });
  };

  // Export Content Package (Real File Download)
  const handleExportPackage = () => {
    try {
      const exportData = {
        title: contentPackage.title,
        hook: contentPackage.hook,
        qualityScore: `${contentPackage.qualityScore}%`,
        style: contentPackage.style,
        duration: contentPackage.duration,
        format: "9:16 Vertical Video (1080x1920)",
        scenes: contentPackage.scenes,
        tags: contentPackage.tags,
        metadata: {
          engine: "Qoneqt ContentForge AI v2.4",
          team: "ARCLIGHT",
          exportedAt: new Date().toISOString()
        }
      };

      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(exportData, null, 2)
      )}`;

      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute(
        'download',
        `Qoneqt_ContentForge_${contentPackage.id || 'package'}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      addToast({
        title: "Content Package Exported",
        message: "JSON storyboard, scenes, hook & metadata downloaded.",
        type: "success"
      });
    } catch {
      addToast({
        title: "Export Failed",
        message: "Unable to generate download file.",
        type: "info"
      });
    }
  };

  // Save edited script
  const handleSaveScript = (updatedPackage) => {
    setContentPackage(updatedPackage);
    addToast({
      title: "Script Saved",
      message: "Hook and scene narrations updated successfully.",
      type: "success"
    });
  };

  // 15-20s Automated Demo Mode for Hackathon Judges
  const startDemoMode = () => {
    if (isDemoActive) return;

    // Clear any previous timeouts
    demoTimeoutRef.current.forEach((t) => clearTimeout(t));
    demoTimeoutRef.current = [];

    setIsDemoActive(true);
    addToast({
      title: "⚡ Demo Mode Activated",
      message: "Running 15-second autonomous showcase for hackathon judges.",
      type: "sparkle",
      duration: 3500
    });

    // 1. Select Example Topic & Switch to Create
    setActiveTab('create');
    setCurrentTopic("Will AI Replace Software Developers?");
    playFuturisticChime(500, 0.2);

    // 2. Start Pipeline after 2.5s
    const t1 = setTimeout(() => {
      setActiveTab('pipeline');
      addToast({
        title: "⚡ Step 2: 9-Stage AI Swarm",
        message: "Executing research, script writing, storyboard & neural voice synthesis.",
        type: "sparkle",
        duration: 3000
      });
    }, 2500);

    // 3. Pipeline completes and switches to Result after ~11s
    const t2 = setTimeout(() => {
      setContentPackage(SAMPLE_TOPICS["will-ai-replace-developers"]);
      setActiveTab('result');
      playSuccessChime();
      addToast({
        title: "⚡ Step 3: 9:16 Video Ready",
        message: "Synchronizing kinetic captions, audio waveform and 94% quality score.",
        type: "success",
        duration: 3500
      });
    }, 11500);

    // 4. Confetti and ready to publish celebration at 16s
    const t3 = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      addToast({
        title: "🎉 Demo Complete!",
        message: "Content certified and ready to publish to Qoneqt Global Feed.",
        type: "success",
        duration: 5000
      });
      setIsDemoActive(false);
    }, 16000);

    demoTimeoutRef.current = [t1, t2, t3];
  };

  const cancelDemoMode = () => {
    demoTimeoutRef.current.forEach((t) => clearTimeout(t));
    demoTimeoutRef.current = [];
    setIsDemoActive(false);
    addToast({
      title: "Demo Mode Stopped",
      message: "Returned to interactive manual control.",
      type: "info"
    });
  };

  return (
    <div className="min-h-screen bg-[#05020D] text-white flex flex-col relative selection:bg-purple-600 selection:text-white">
      
      {/* Background Grid Pattern & Ambient Radial Glows */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-1/2 right-10 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <Navbar
        onStartDemo={startDemoMode}
        isDemoActive={isDemoActive}
        onTogglePresentation={() => setIsPresentationOpen(true)}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex relative z-10">
        
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
          hasGeneratedContent={!!contentPackage}
        />

        {/* Content View Area */}
        <main className="flex-1 lg:pl-72 p-4 sm:p-8 max-w-7xl mx-auto w-full transition-all">
          
          {/* Active Demo Banner if running */}
          {isDemoActive && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-cyan-900/60 border border-cyan-400/50 shadow-glow-cyan flex items-center justify-between gap-4 animate-pulse">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-outfit font-extrabold text-xs sm:text-sm text-white">
                  ⚡ Autonomous Hackathon Demonstration Running (15-20s Tour)
                </span>
              </div>
              <button
                onClick={cancelDemoMode}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-purple-200 transition-colors"
              >
                Stop Demo
              </button>
            </div>
          )}

          {/* Tab 1: Dashboard */}
          {activeTab === 'dashboard' && (
            <DashboardView
              stats={stats}
              recentContent={recentContent}
              onNavigateToCreate={() => setActiveTab('create')}
              onNavigateToCommunity={() => setActiveTab('community')}
              onSelectRecentContent={handleSelectRecentContent}
              onOpenPreview={handleOpenPreview}
            />
          )}

          {/* Tab 2: Create Content */}
          {activeTab === 'create' && (
            <CreateContentView
              onStartPipeline={handleStartPipeline}
              initialTopic={currentTopic}
              initialStyle={creationParams.style}
              initialDuration={creationParams.duration}
              initialLanguage={creationParams.language}
            />
          )}

          {/* Tab 3: AI Pipeline */}
          {activeTab === 'pipeline' && (
            <PipelineView
              currentTopic={currentTopic}
              onPipelineComplete={handlePipelineComplete}
              isLiveGenerating={true}
              onReset={() => setActiveTab('create')}
            />
          )}

          {/* Tab 4: Generated Result */}
          {activeTab === 'result' && (
            <GeneratedResultView
              contentPackage={contentPackage}
              onOpenPreviewModal={() => setPreviewModalOpen(true)}
              onOpenEditModal={() => setEditModalOpen(true)}
              onPublishToQoneqt={handlePublishToQoneqt}
              onExportPackage={handleExportPackage}
              addToast={addToast}
            />
          )}

          {/* Tab 5: Community Ideas */}
          {activeTab === 'community' && (
            <CommunityIdeasView
              onConvertIdeaToContent={handleConvertIdeaToContent}
            />
          )}

          {/* Tab 6: AI Content Director (Swarm Architecture) */}
          {activeTab === 'agents' && (
            <AiDirectorView />
          )}

        </main>
      </div>

      {/* Video Preview Modal (▶ Preview button) */}
      <VideoPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        contentPackage={contentPackage}
        onPublish={handlePublishToQoneqt}
        onExport={handleExportPackage}
      />

      {/* Script Edit Modal (✏ Edit button) */}
      <ScriptEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        contentPackage={contentPackage}
        onSaveScript={handleSaveScript}
      />

      {/* Presentation Mode (📽 Presentation Mode button) */}
      {isPresentationOpen && (
        <PresentationMode
          onClose={() => setIsPresentationOpen(false)}
          onStartDemo={startDemoMode}
        />
      )}

      {/* Floating Toast Notification Container */}
      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
      />

    </div>
  );
}
