import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatAssistant from './components/ChatAssistant';
import InteractiveGuidance from './components/InteractiveGuidance';
import Onboarding from './components/Onboarding';
import TopNav from './components/TopNav';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('chat'); // 'chat' or 'guidance' on mobile

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans overflow-hidden">
      
      {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}

      {/* Top Navbar */}
      <TopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main Split Layout */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left Panel: Chat Assistant */}
        <div className={`
          w-full md:w-1/3 lg:w-1/4 xl:w-1/4 
          h-full bg-white border-r border-slate-200 shadow-sm z-20
          transition-transform duration-300 ease-in-out
          ${activeView === 'chat' ? 'block' : 'hidden md:block'}
        `}>
          <ChatAssistant />
        </div>

        {/* Right Panel: Interactive Guidance */}
        <div className={`
          flex-1 h-full bg-gradient-to-br from-slate-50 to-brand-lightBlue/30 relative overflow-hidden
          ${activeView === 'guidance' ? 'block' : 'hidden md:block'}
        `}>
          <InteractiveGuidance />
        </div>

      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden glass-panel fixed bottom-0 left-0 right-0 z-30 flex shadow-[0_-5px_20px_rgba(0,0,0,0.05)] border-t border-slate-200">
        <button 
          onClick={() => setActiveView('chat')}
          className={`flex-1 py-4 text-center font-semibold transition-colors flex flex-col items-center gap-1 ${activeView === 'chat' ? 'text-brand-blue' : 'text-slate-400'}`}
        >
          <div className={`h-1 w-8 rounded-full mb-1 transition-all ${activeView === 'chat' ? 'bg-brand-blue' : 'bg-transparent'}`} />
          <span className="text-xs">Assistant</span>
        </button>
        <button 
          onClick={() => setActiveView('guidance')}
          className={`flex-1 py-4 text-center font-semibold transition-colors flex flex-col items-center gap-1 ${activeView === 'guidance' ? 'text-brand-blue' : 'text-slate-400'}`}
        >
          <div className={`h-1 w-8 rounded-full mb-1 transition-all ${activeView === 'guidance' ? 'bg-brand-blue' : 'bg-transparent'}`} />
          <span className="text-xs">Learn & Explore</span>
        </button>
      </div>
    </div>
  );
}

export default App;
