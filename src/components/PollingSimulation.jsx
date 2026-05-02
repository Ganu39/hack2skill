import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { simulationData, summaryData } from '../data/simulationScenarios';

export default function PollingSimulation() {
  const { language } = useAppContext();

  const [currentStage, setCurrentStage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [evmState, setEvmState] = useState('idle');

  const stageData = simulationData[currentStage];
  const lang = language === 'EN' ? 'en' : 'hi';
  const content = stageData ? stageData[lang] : null;
  const summary = summaryData[lang];

  const handleChoiceClick = (idx) => {
    if (showFeedback) return;
    setSelectedChoiceIndex(idx);
    setShowFeedback(true);
  };

  const advanceStage = () => {
    setSelectedChoiceIndex(null);
    setShowFeedback(false);
    setEvmState('idle');
    if (currentStage < simulationData.length - 1) {
      setCurrentStage((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Play a realistic EVM beep using the Web Audio API
  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Silently fail if audio is unavailable
    }
  };

  const handleEvmAction = () => {
    if (evmState !== 'idle') return;
    setEvmState('interacting');
    playBeep();
    setTimeout(() => setEvmState('done'), 1500);
  };

  const resetSimulation = () => {
    setCurrentStage(0);
    setIsCompleted(false);
    setSelectedChoiceIndex(null);
    setShowFeedback(false);
    setEvmState('idle');
  };

  /* ───── CHOICE STAGE (1, 2, 3, 5) ───── */
  const renderChoiceStage = () => (
    <motion.div
      key={`stage-${stageData.id}`}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Scenario card */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">{content.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{content.scenario}</p>
      </div>

      {/* Optional VVPAT animation for Stage 5 */}
      {stageData.type === 'vvpat_action' && (
        <div className="w-56 h-72 md:w-64 md:h-80 bg-slate-900 rounded-2xl mx-auto border-4 border-slate-700 relative overflow-hidden flex justify-center shadow-xl mb-6">
          <div className="absolute top-6 w-40 md:w-48 h-48 md:h-56 bg-black/80 border-2 border-slate-600 rounded-lg flex justify-center overflow-hidden shadow-inner">
            <motion.div
              initial={{ y: -150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring', bounce: 0.2 }}
              className="w-32 md:w-40 h-40 md:h-48 bg-white mt-2 flex flex-col items-center p-3 shadow-md"
            >
              <div className="w-full border-b-2 border-slate-200 pb-2 mb-2 text-center text-[10px] text-slate-500 font-mono">ELECTION COMMISSION</div>
              <div className="w-16 h-16 border-2 border-slate-800 rounded-full mb-3 flex items-center justify-center font-black text-xl text-slate-800 bg-slate-100">A</div>
              <div className="text-sm font-bold text-slate-800 mb-1">Candidate A</div>
              <div className="text-[10px] text-slate-400 font-mono">SLIP NO: 849201</div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Choices */}
      <div className="space-y-3">
        {content.choices.map((choice, idx) => {
          const isSelected = selectedChoiceIndex === idx;
          let btnClass = 'bg-white border-slate-200 hover:border-brand-blue hover:bg-brand-lightBlue/10 text-slate-700 shadow-sm';
          let Icon = null;

          if (showFeedback) {
            if (isSelected && choice.isCorrect) {
              btnClass = 'bg-green-50 border-green-400 text-green-800 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
              Icon = CheckCircle2;
            } else if (isSelected && !choice.isCorrect) {
              btnClass = 'bg-red-50 border-red-300 text-red-700';
              Icon = XCircle;
            } else {
              btnClass = 'bg-white border-slate-100 text-slate-400 opacity-50';
            }
          }

          return (
            <div key={idx}>
              <motion.button
                whileHover={!showFeedback ? { scale: 1.01, y: -2 } : {}}
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
                onClick={() => handleChoiceClick(idx)}
                className={`w-full p-4 rounded-xl border-2 text-left text-sm font-semibold flex justify-between items-center transition-all ${btnClass}`}
              >
                <span>{choice.text}</span>
                {Icon && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }}>
                    <Icon size={18} />
                  </motion.div>
                )}
              </motion.button>

              {/* Inline feedback for the selected choice */}
              {showFeedback && isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 overflow-hidden"
                >
                  <div className={`p-4 rounded-xl border ${choice.isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>
                    <p className={`text-sm leading-relaxed font-medium ${choice.isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                      {choice.feedback}
                    </p>
                    {choice.isCorrect ? (
                      <button
                        onClick={advanceStage}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-brand-blue text-white rounded-lg font-bold text-sm hover:bg-brand-blue/90 transition-colors shadow-sm"
                      >
                        {currentStage < simulationData.length - 1
                          ? (language === 'EN' ? 'Continue Journey' : 'यात्रा जारी रखें')
                          : (language === 'EN' ? 'Complete' : 'पूरा करें')}
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => { setSelectedChoiceIndex(null); setShowFeedback(false); }}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white rounded-lg font-bold text-sm hover:bg-slate-700 transition-colors shadow-sm"
                      >
                        {language === 'EN' ? 'Try Again' : 'पुनः प्रयास करें'}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  /* ───── EVM ACTION STAGE (4) ───── */
  const renderEvmStage = () => (
    <motion.div
      key={`stage-${stageData.id}`}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Scenario card */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">{content.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{content.scenario}</p>
      </div>

      {/* EVM Machine */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-sm bg-slate-800 p-6 rounded-3xl shadow-2xl border-4 border-slate-700 relative overflow-hidden">
          <div className="w-full h-8 border-b-2 border-slate-700 mb-6 flex justify-between items-center px-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
            <span className="text-[10px] text-slate-500 font-mono tracking-widest">BALLOT UNIT</span>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 flex justify-between items-center border-2 border-slate-600">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-slate-800 shadow-inner">A</div>
              <div className="font-bold text-white text-lg tracking-wide uppercase">Candidate A</div>
            </div>
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0.2, backgroundColor: '#ef4444' }}
                animate={{
                  opacity: evmState !== 'idle' ? 1 : 0.2,
                  boxShadow: evmState !== 'idle' ? '0 0 15px #ef4444' : 'none',
                }}
                className="w-4 h-4 rounded-full border border-red-900"
              />
              <motion.button
                whileHover={evmState === 'idle' ? { scale: 1.1 } : {}}
                whileTap={evmState === 'idle' ? { scale: 0.9 } : {}}
                onClick={handleEvmAction}
                className={`w-12 h-12 rounded-full border-4 shadow-xl transition-all ${
                  evmState !== 'idle'
                    ? 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.9)]'
                    : 'bg-blue-600 border-slate-900 hover:bg-blue-400'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Status text */}
        <div className="mt-6 h-8 flex items-center justify-center">
          {evmState === 'idle' && (
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-sm font-bold text-brand-blue uppercase tracking-widest">
              {language === 'EN' ? 'Press the blue button' : 'नीला बटन दबाएं'}
            </motion.span>
          )}
          {evmState === 'interacting' && (
            <span className="text-sm font-bold text-slate-500 animate-pulse uppercase tracking-widest">
              {language === 'EN' ? 'Beep sound playing...' : 'बीप ध्वनि बज रही है...'}
            </span>
          )}
        </div>

        {/* Success feedback */}
        {evmState === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 w-full max-w-sm bg-green-100 border border-green-200 p-4 rounded-xl text-center shadow-sm"
          >
            <p className="text-sm font-bold text-green-900 mb-4">{content.successMessage}</p>
            <button
              onClick={advanceStage}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-blue text-white rounded-lg font-bold text-sm hover:bg-brand-blue/90 transition-colors shadow-sm"
            >
              {language === 'EN' ? 'Continue' : 'जारी रखें'}
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  /* ───── LEARNING SUMMARY ───── */
  const renderSummary = () => (
    <motion.div
      key="summary"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-600 mb-2">
          {summary.title}
        </h2>
        <p className="text-slate-500 font-medium">{summary.subtitle}</p>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 shadow-inner">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-saffron" />
          {summary.lessonsTitle}
        </h3>
        <ul className="space-y-3">
          {summary.lessons.map((lesson, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 leading-relaxed font-medium">{lesson}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={resetSimulation}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-blue to-indigo-600 text-white font-bold text-sm rounded-full shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1"
      >
        {summary.button}
      </button>
    </motion.div>
  );

  /* ───── MAIN RENDER ───── */
  return (
    <div className="flex flex-col py-4 md:py-8 w-full relative overflow-auto">
      {/* Background blurs */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-brand-saffron/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header & Progress */}
      {!isCompleted && (
        <div className="w-full max-w-2xl mx-auto px-4 mb-6 z-10 shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg md:text-xl font-bold text-slate-800">
              {language === 'EN' ? 'Voter Journey' : 'मतदाता यात्रा'}
            </h2>
            <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
              Step {currentStage + 1} / {simulationData.length}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-blue to-brand-saffron"
              animate={{ width: `${((currentStage + 1) / simulationData.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="w-full px-4 z-10">
        <AnimatePresence mode="wait">
          {isCompleted
            ? renderSummary()
            : stageData.type === 'evm_action'
              ? renderEvmStage()
              : renderChoiceStage()
          }
        </AnimatePresence>
      </div>
    </div>
  );
}
