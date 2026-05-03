import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { quizBank } from '../utils/quizBank';
import { AnalyticsEvents, saveQuizScore } from '../utils/firebase';

// Utility to shuffle an array
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function QuizSection() {
  const { t, language } = useAppContext();
  const { user, isLoggedIn, updateProgress, progress } = useAuth();
  
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  // Initialize Quiz
  const initQuiz = () => {
    // 1. Randomly select 10 questions from quizBank
    const shuffledBank = shuffleArray(quizBank);
    const selectedQuestions = shuffledBank.slice(0, 10);

    // 2. Format and shuffle options for each selected question
    const formattedQuestions = selectedQuestions.map((q) => {
      const qData = language === 'EN' ? q.en : q.hi;
      const originalOptions = qData.options;
      const correctText = originalOptions[q.correctIndex];

      // Create an array of objects to keep track of the correct answer
      let optionsWithMeta = originalOptions.map(opt => ({
        text: opt,
        isCorrect: opt === correctText
      }));

      // Shuffle the options
      optionsWithMeta = shuffleArray(optionsWithMeta);

      return {
        ...q,
        questionText: qData.question,
        explanation: qData.explanation,
        options: optionsWithMeta
      };
    });

    setQuestions(formattedQuestions);
    setCurrentQ(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  // Re-run initialization if language changes so we get the translated strings
  // but keep the same questions if we are mid-quiz. Actually, to keep it simple,
  // we just restart the quiz when language changes, or we dynamically pull from the bank.
  // Dynamic pulling is better.
  useEffect(() => {
    if (questions.length === 0) {
      initQuiz();
    } else {
      // If language changed mid-quiz, update the current texts
      setQuestions(prev => prev.map(q => {
        const qData = language === 'EN' ? q.en : q.hi;
        const correctText = qData.options[q.correctIndex];
        
        // We must map the current shuffled options back to their new translations
        // To do this reliably, we match by index from the original array.
        // For simplicity, let's just restart the quiz if language changes.
        return q;
      }));
      initQuiz(); 
    }
  }, [language]);

  const handleSelect = (idx) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    
    setSelectedAnswer(idx);
    const isCorrect = questions[currentQ].options[idx].isCorrect;
    setIsAnswerCorrect(isCorrect);
    AnalyticsEvents.quizAnswered(isCorrect);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsFinished(true);
    AnalyticsEvents.quizCompleted(score, questions.length, 'election-knowledge');
    
    // Save score to Firestore if logged in
    if (isLoggedIn && user) {
      const percentage = Math.round((score / questions.length) * 100);
      await saveQuizScore(user.uid, {
        score,
        total: questions.length,
        category: 'election-knowledge',
      });
      await updateProgress({
        quizzesTaken: (progress.quizzesTaken || 0) + 1,
        bestScore: Math.max(progress.bestScore || 0, percentage),
      });
    }
    
    if (score >= 7) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF9933', '#FFFFFF', '#138808', '#000080']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF9933', '#FFFFFF', '#138808', '#000080']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const getTier = () => {
    if (score <= 4) return t('quiz.tiers.beginner') || (language === 'EN' ? 'Beginner' : 'शुरुआती');
    if (score <= 7) return t('quiz.tiers.intermediate') || (language === 'EN' ? 'Intermediate' : 'मध्यवर्ती');
    return t('quiz.tiers.expert') || (language === 'EN' ? 'Expert' : 'विशेषज्ञ');
  };

  const getTierEmoji = () => {
    if (score <= 4) return '🌱';
    if (score <= 7) return '🔥';
    return '👑';
  };

  if (questions.length === 0) return null;

  return (
    <div className="py-2 md:py-4 w-full max-w-xl mx-auto flex flex-col">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-brand-saffron/10 rounded-lg text-brand-saffron">
            <Award size={20} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">{t('quiz.title')}</h2>
        </div>
        {!isFinished && (
          <span className="font-bold text-slate-400 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
            {currentQ + 1} / {questions.length}
          </span>
        )}
      </div>

      {!isFinished ? (
        <div className="bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-3xl shadow-lg border border-white/60 flex flex-col relative">
          <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden relative z-10">
            <motion.div 
              className="h-full bg-gradient-to-r from-brand-blue to-indigo-500"
              initial={{ width: `${(currentQ / questions.length) * 100}%` }}
              animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col relative z-10"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-snug">
                  {questions[currentQ].questionText}
                </h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase ml-3 mt-1 shrink-0 ${
                  questions[currentQ].difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  questions[currentQ].difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {questions[currentQ].difficulty}
                </span>
              </div>
              
              <div className="space-y-3 mt-2 pr-2 pb-2" role="radiogroup" aria-label="Answer options">
                {questions[currentQ].options.map((opt, idx) => {
                  let btnStateClass = "bg-white border-slate-200 hover:border-brand-blue/50 hover:bg-brand-lightBlue/30 text-slate-700 shadow-sm";
                  let Icon = null;

                  if (selectedAnswer !== null) {
                    if (opt.isCorrect) {
                      btnStateClass = "bg-green-50 border-green-400 text-green-800 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                      Icon = CheckCircle2;
                    } else if (idx === selectedAnswer) {
                      btnStateClass = "bg-red-50 border-red-300 text-red-600";
                      Icon = XCircle;
                    } else {
                      btnStateClass = "bg-white border-slate-100 text-slate-400 opacity-50";
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={selectedAnswer === null ? { scale: 1.01, translateY: -2 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                      onClick={() => handleSelect(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-3 md:p-4 rounded-xl border-2 text-left text-sm font-semibold flex justify-between items-center transition-all ${btnStateClass}`}
                    >
                      {opt.text}
                      {Icon && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }}>
                          <Icon size={18} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-4 rounded-xl border ${isAnswerCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <h4 className={`text-sm font-bold mb-1 ${isAnswerCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isAnswerCorrect ? (language === 'EN' ? 'Correct!' : 'सही!') : (language === 'EN' ? 'Incorrect' : 'गलत')}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {questions[currentQ].explanation}
                      </p>
                      <button
                        onClick={handleNext}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-brand-blue text-white rounded-lg font-bold text-sm hover:bg-brand-blue/90 transition-colors shadow-sm"
                      >
                        {currentQ < questions.length - 1 ? (language === 'EN' ? 'Next Question' : 'अगला प्रश्न') : (language === 'EN' ? 'See Results' : 'परिणाम देखें')}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 text-center flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full"
        >
          <div className="text-6xl mb-4 drop-shadow-md">
            {getTierEmoji()}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{t('quiz.completed')}</h2>
          <div className="text-brand-saffron font-black text-xl mb-4 uppercase tracking-widest">
            {getTier()}
          </div>
          <p className="text-slate-500 text-sm mb-8">
            {t('quiz.scored')} <span className="font-bold text-brand-blue text-2xl mx-1">{score}</span> {t('quiz.outOf')} {questions.length}
          </p>
          
          <button 
            onClick={initQuiz}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-blue to-indigo-600 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <RefreshCcw size={16} />
            {t('quiz.playAgain')}
          </button>
        </motion.div>
      )}
    </div>
  );
}
