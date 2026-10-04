import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl glass-panel-glow border border-purple-500/30 text-white shadow-2xl relative overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-400 to-pink-500" />
            
            <div className="p-1 rounded-lg bg-purple-500/20 text-cyan-400 mt-0.5">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : toast.type === 'sparkle' ? (
                <Sparkles className="w-5 h-5 text-cyan-300" />
              ) : (
                <Info className="w-5 h-5 text-purple-300" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-2">
              {toast.title && (
                <h4 className="font-outfit font-semibold text-sm text-white">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-[#A8A3B8] leading-relaxed break-words mt-0.5">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#A8A3B8] hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
