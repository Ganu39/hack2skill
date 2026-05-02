import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: "Welcome to ElectraGuide India",
    subtitle: "Your personal, intelligent companion to understanding the world's largest democracy.",
  },
  {
    id: 2,
    title: "Let's prepare you to vote with confidence",
    subtitle: "Learn how to register, explore the election timeline, and try our polling booth simulation.",
  }
];

export default function Onboarding({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-6"
      >
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-md h-[400px] flex flex-col items-center justify-between z-10 text-center">
          
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-8 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <Sparkles size={32} className="text-brand-saffron" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  {ONBOARDING_SLIDES[currentSlide].title}
                </h1>
                <p className="text-slate-300 text-lg max-w-sm">
                  {ONBOARDING_SLIDES[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Dots and Next Button */}
          <div className="w-full flex flex-col items-center gap-8 mt-8">
            <div className="flex gap-2">
              {ONBOARDING_SLIDES.map((_, idx) => (
                <motion.div 
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-brand-saffron' : 'w-2 bg-slate-600'}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="group flex items-center gap-2 px-8 py-3 bg-white text-slate-900 font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow"
            >
              {currentSlide === ONBOARDING_SLIDES.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
