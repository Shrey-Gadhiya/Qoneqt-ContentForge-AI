import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Sparkles, 
  Edit3, 
  FileText, 
  Check 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScriptEditModal({ 
  contentPackage, 
  isOpen, 
  onClose, 
  onSaveScript 
}) {
  const [editedHook, setEditedHook] = useState(contentPackage?.hook || "");
  const [editedScenes, setEditedScenes] = useState(contentPackage?.scenes || []);

  if (!isOpen || !contentPackage) return null;

  const handleSceneChange = (index, field, value) => {
    const updated = [...editedScenes];
    updated[index] = { ...updated[index], [field]: value };
    setEditedScenes(updated);
  };

  const handleSave = () => {
    onSaveScript({
      ...contentPackage,
      hook: editedHook,
      scenes: editedScenes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl rounded-3xl glass-panel-glow border border-purple-500/40 p-6 sm:p-8 relative shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-cyan-300">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-outfit font-extrabold text-lg text-white">
                  Edit Script & Storyboard
                </h3>
                <p className="text-xs text-[#A8A3B8]">
                  Customize narrative hook, voiceover lines, and on-screen kinetic captions
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

          {/* Form scroll area */}
          <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
            
            {/* Hook Editor */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                Viral Hook (Opening 3 Seconds)
              </label>
              <textarea
                rows={2}
                value={editedHook}
                onChange={(e) => setEditedHook(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#09041A] border border-purple-500/30 focus:border-cyan-400 text-white font-outfit text-sm outline-none transition-all resize-none"
              />
            </div>

            {/* Scenes Editor */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                5-Scene Breakdown
              </label>

              {editedScenes.map((scene, idx) => (
                <div 
                  key={scene.number} 
                  className="p-4 rounded-xl bg-[#09041A]/90 border border-purple-500/20 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-outfit font-bold text-xs text-cyan-300">
                      Scene 0{scene.number} — {scene.title}
                    </span>
                    <span className="font-mono text-[10px] text-[#A8A3B8]">
                      {scene.timecode}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#A8A3B8] mb-1">
                      Voiceover Narration
                    </label>
                    <textarea
                      rows={2}
                      value={scene.narration}
                      onChange={(e) => handleSceneChange(idx, 'narration', e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-[#05020D] border border-purple-500/20 focus:border-cyan-400 text-xs text-white outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#A8A3B8] mb-1">
                      On-Screen Caption / Subtitle
                    </label>
                    <input
                      type="text"
                      value={scene.caption}
                      onChange={(e) => handleSceneChange(idx, 'caption', e.target.value)}
                      className="w-full p-2 rounded-lg bg-[#05020D] border border-purple-500/20 focus:border-cyan-400 text-xs text-yellow-300 font-semibold outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-purple-500/20 flex items-center justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl glass-panel text-xs text-[#A8A3B8] hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-outfit font-bold text-xs shadow-glow-purple flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Update Story</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
