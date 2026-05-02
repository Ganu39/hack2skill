import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from '../utils/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('EN');
  const [isTTSActive, setIsTTSActive] = useState(false);

  // Text-to-Speech utility function
  const speak = (text) => {
    if (!isTTSActive || !window.speechSynthesis) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Try to set voice based on language
    const voices = window.speechSynthesis.getVoices();
    if (language === 'HI') {
      const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
      if (hindiVoice) utterance.voice = hindiVoice;
    } else {
      const englishVoice = voices.find(v => v.lang.includes('en') || v.lang.includes('GB') || v.lang.includes('US'));
      if (englishVoice) utterance.voice = englishVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Helper to get translated string by key
  // Supports dot notation e.g. "chat.welcomeMessage"
  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Fallback to key if missing
      }
    }
    return result;
  };

  // Ensure speech synthesis voices are loaded
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.onvoiceschanged = () => synth.getVoices();
    }
    return () => {
      if (synth) synth.cancel();
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'HI' : 'EN');
  };

  const toggleTTS = () => {
    setIsTTSActive(prev => {
      if (prev) window.speechSynthesis.cancel(); // Stop speaking if turned off
      return !prev;
    });
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, toggleLanguage, isTTSActive, toggleTTS, speak, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
