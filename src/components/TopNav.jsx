import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Languages, LogIn, LogOut, User, Trophy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { AnalyticsEvents } from '../utils/firebase';

export default function TopNav({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { language, toggleLanguage, isTTSActive, toggleTTS, t } = useAppContext();
  const { user, isLoggedIn, login, logout, progress } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleLanguageToggle = () => {
    toggleLanguage();
    AnalyticsEvents.languageChanged(language === 'EN' ? 'HI' : 'EN');
  };

  const handleTTSToggle = () => {
    toggleTTS();
    AnalyticsEvents.ttsToggled(!isTTSActive);
  };

  const handleLogin = async () => {
    AnalyticsEvents.loginAttempted();
    try {
      await login();
      AnalyticsEvents.loginSuccess();
    } catch (error) {
      // Login failed - user cancelled or error
    }
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

      <div className="flex items-center gap-2 md:gap-3">
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

        {/* Auth: Login / Profile */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              aria-label="Open user profile menu"
              aria-expanded={showProfile}
              className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-8 h-8 rounded-full border-2 border-brand-blue shadow-sm"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold">
                  {user?.displayName?.[0] || 'U'}
                </div>
              )}
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50"
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold">
                        {user?.displayName?.[0] || 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-800 truncate">{user?.displayName}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Trophy size={12} className="text-brand-saffron" />
                        {language === 'EN' ? 'Quizzes Taken' : 'क्विज़ लिए'}
                      </span>
                      <span className="font-bold text-slate-700">{progress.quizzesTaken}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <User size={12} className="text-brand-blue" />
                        {language === 'EN' ? 'Best Score' : 'सर्वश्रेष्ठ स्कोर'}
                      </span>
                      <span className="font-bold text-slate-700">{progress.bestScore}%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { logout(); setShowProfile(false); }}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut size={14} />
                    {language === 'EN' ? 'Sign Out' : 'साइन आउट'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            aria-label="Sign in with Google"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue/90 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            <LogIn size={14} aria-hidden="true" />
            <span className="hidden sm:inline">{language === 'EN' ? 'Sign In' : 'साइन इन'}</span>
          </motion.button>
        )}
      </div>
    </nav>
  );
}
