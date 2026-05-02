import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Languages } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function TopNav({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { language, toggleLanguage, isTTSActive, toggleTTS, t } = useAppContext();

  return (
    <nav className="glass-panel z-50 p-4 sticky top-0 flex justify-between items-center border-b border-slate-200 shadow-sm md:bg-white/80">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-100 rounded-full text-slate-700">
            <span className="font-bold text-xs px-1">☰</span>
          </button>
        </div>
        <div className="hidden md:block w-8 h-8 rounded-lg overflow-hidden shrink-0">
          <img src="/vote-india.png" alt="ElectraGuide" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-bold text-gradient hidden md:block tracking-tight">{t('nav.title')}</h1>
        <div className="md:hidden w-7 h-7 rounded-lg overflow-hidden shrink-0">
          <img src="/vote-india.png" alt="ElectraGuide" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-lg font-bold text-gradient md:hidden tracking-tight">{t('nav.mobileTitle')}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
        >
          <Languages size={14} />
          {language}
        </button>

        {/* Text to Speech Toggle */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTTS}
          className={`relative p-2 rounded-full transition-colors ${isTTSActive ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          {isTTSActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
          
          {/* Pulse Animation when active */}
          {isTTSActive && (
            <motion.div 
              className="absolute inset-0 border-2 border-brand-blue rounded-full"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
