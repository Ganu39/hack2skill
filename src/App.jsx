import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatAssistant from './components/ChatAssistant';
import InteractiveGuidance from './components/InteractiveGuidance';
import Onboarding from './components/Onboarding';
import TopNav from './components/TopNav';
import { AnalyticsEvents } from './utils/firebase';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('chat'); // 'chat' or 'guidance' on mobile

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    AnalyticsEvents.onboardingCompleted();
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    AnalyticsEvents.tabChanged(view);
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Skip to main content - Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand-blue focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      {/* Top Navbar */}
      <TopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main Split Layout */}
      <main id="main-content" role="main" aria-label="ElectraGuide main content" className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left Panel: Chat Assistant */}
        <aside 
          role="complementary"
          aria-label="AI Chat Assistant"
          className={`
            w-full md:w-1/3 lg:w-1/4 xl:w-1/4 
            h-full bg-white border-r border-slate-200 shadow-sm z-20
            transition-transform duration-300 ease-in-out
            ${activeView === 'chat' ? 'block' : 'hidden md:block'}
          `}
        >
          <ChatAssistant />
        </aside>

        {/* Right Panel: Interactive Guidance */}
        <section 
          aria-label="Interactive Learning & Exploration"
          className={`
            flex-1 h-full bg-gradient-to-br from-slate-50 to-brand-lightBlue/30 relative overflow-hidden
            ${activeView === 'guidance' ? 'block' : 'hidden md:block'}
          `}
        >
          <InteractiveGuidance />
        </section>

      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav 
        aria-label="Mobile navigation" 
        className="md:hidden glass-panel fixed bottom-0 left-0 right-0 z-30 flex shadow-[0_-5px_20px_rgba(0,0,0,0.05)] border-t border-slate-200"
      >
        <button 
          onClick={() => handleViewChange('chat')}
          aria-label="Switch to AI Assistant view"
          aria-pressed={activeView === 'chat'}
          className={`flex-1 py-4 text-center font-semibold transition-colors flex flex-col items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${activeView === 'chat' ? 'text-brand-blue' : 'text-slate-400'}`}
        >
          <div className={`h-1 w-8 rounded-full mb-1 transition-all ${activeView === 'chat' ? 'bg-brand-blue' : 'bg-transparent'}`} />
          <span className="text-xs">Assistant</span>
        </button>
        <button 
          onClick={() => handleViewChange('guidance')}
          aria-label="Switch to Learn and Explore view"
          aria-pressed={activeView === 'guidance'}
          className={`flex-1 py-4 text-center font-semibold transition-colors flex flex-col items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${activeView === 'guidance' ? 'text-brand-blue' : 'text-slate-400'}`}
        >
          <div className={`h-1 w-8 rounded-full mb-1 transition-all ${activeView === 'guidance' ? 'bg-brand-blue' : 'bg-transparent'}`} />
          <span className="text-xs">Learn & Explore</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
