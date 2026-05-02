import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PollingSimulation from './PollingSimulation';
import ElectionTimeline from './ElectionTimeline';
import FAQSection from './FAQSection';
import QuizSection from './QuizSection';
import { CalendarClock, Vote, HelpCircle, GraduationCap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function InteractiveGuidance() {
  const { t } = useAppContext();
  const [activeTab, setActiveTab] = useState('timeline');

  const tabs = [
    { id: 'timeline', label: t('tabs.timeline'), icon: CalendarClock },
    { id: 'simulation', label: t('tabs.simulation'), icon: Vote },
    { id: 'faq', label: t('tabs.faq'), icon: HelpCircle },
    { id: 'quiz', label: t('tabs.quiz'), icon: GraduationCap }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Hero Banner */}
      <div className="relative shrink-0 bg-white border-b border-slate-100">
        {/* Thin tricolor top accent */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>
        
        <div className="px-6 py-5 md:py-6 max-w-4xl mx-auto flex items-center gap-5">
          {/* Image */}
          <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden">
            <img src="/vote-india.png" alt="Vote India" className="w-full h-full object-contain" />
          </div>
          
          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-lg md:text-2xl font-extrabold text-slate-800 tracking-tight leading-tight">
                {t('hero.title')}
              </h1>
              <span className="hidden md:inline-block text-[10px] font-bold tracking-widest uppercase text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-md">
                AI
              </span>
            </div>
            <p className="text-slate-400 text-[11px] md:text-xs font-semibold tracking-widest uppercase">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Segmented Control Tabs */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 shrink-0">
        <div className="max-w-md mx-auto bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 relative z-10 transition-colors ${
                  activeTab === tab.id ? 'text-brand-blue font-bold' : 'text-slate-500 hover:text-slate-700 font-semibold'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span className="text-[10px] md:text-xs uppercase tracking-wider">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-brand-lightBlue/50 rounded-lg -z-10 border border-brand-blue/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8 pb-20 md:pb-8 custom-scrollbar">
        {activeTab === 'timeline' && <ElectionTimeline />}
        {activeTab === 'simulation' && <PollingSimulation />}
        {activeTab === 'faq' && <FAQSection />}
        {activeTab === 'quiz' && <QuizSection />}
      </div>

    </div>
  );
}
