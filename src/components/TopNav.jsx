import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Languages } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AnalyticsEvents } from '../utils/firebase';

export default function TopNav({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { language, toggleLanguage, isTTSActive, toggleTTS, t } = useAppContext();

  const handleLanguageToggle = () => {
    toggleLanguage();
    AnalyticsEvents.languageChanged(language === 'EN' ? 'HI' : 'EN');
  };

  const handleTTSToggle = () => {
    toggleTTS();
    AnalyticsEvents.ttsToggled(!isTTSActive);
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className="glass-panel z-50 p-4 sticky top-0 flex justify-between items-center border-b border-slate-200 shadow-sm md:bg-white/80"
    >
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 bg-slate-100 rounded-full text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="font-bold text-xs px-1">☰</span>
          </button>
        </div>
        <div className="hidden md:block w-8 h-8 rounded-lg overflow-hidden shrink-0">
          <img src="/vote-india.png" alt="ElectraGuide logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-bold text-gradient hidden md:block tracking-tight">{t('nav.title')}</h1>
        <div className="md:hidden w-7 h-7 rounded-lg overflow-hidden shrink-0">
          <img src="/vote-india.png" alt="ElectraGuide logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-lg font-bold text-gradient md:hidden tracking-tight">{t('nav.mobileTitle')}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <button 
          onClick={handleLanguageToggle}
          aria-label={`Switch language to ${language === 'EN' ? 'Hindi' : 'English'}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          <Languages size={14} aria-hidden="true" />
          {language}
        </button>

        {/* Text to Speech Toggle */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTTSToggle}
          aria-label={isTTSActive ? 'Disable text-to-speech' : 'Enable text-to-speech'}
          aria-pressed={isTTSActive}
          className={`relative p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${isTTSActive ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          {isTTSActive ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
          
          {/* Pulse Animation when active */}
          {isTTSActive && (
            <motion.div 
              className="absolute inset-0 border-2 border-brand-blue rounded-full"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              aria-hidden="true"
            />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
