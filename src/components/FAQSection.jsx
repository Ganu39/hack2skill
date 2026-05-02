import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function FAQSection() {
  const { t } = useAppContext();
  const [expandedId, setExpandedId] = useState(null);
  const [showDetailId, setShowDetailId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setShowDetailId(null); // Reset detail view when expanding a new one
  };

  const FAQS = t('faqs') || [];

  return (
    <div className="py-8 max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
          <HelpCircle size={24} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">{t('tabs.faq')}</h2>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq) => (
          <motion.div 
            key={faq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <button 
              onClick={() => toggleExpand(faq.id)}
              className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
            >
              <span className="font-bold text-lg text-slate-800 text-left">{faq.question}</span>
              <motion.div animate={{ rotate: expandedId === faq.id ? 180 : 0 }}>
                <ChevronDown size={20} className="text-slate-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedId === faq.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-5"
                >
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-slate-600 mb-4">{faq.shortAnswer}</p>
                    
                    <div className="bg-slate-50 rounded-xl p-1 inline-flex w-full md:w-auto">
                      <button 
                        onClick={() => setShowDetailId(null)}
                        className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${showDetailId !== faq.id ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Short Answer
                      </button>
                      <button 
                        onClick={() => setShowDetailId(faq.id)}
                        className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${showDetailId === faq.id ? 'bg-brand-lightBlue text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Detailed Explanation
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {showDetailId === faq.id && (
                        <motion.div
                          key="detail"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-4 p-4 bg-brand-lightBlue/30 rounded-xl border border-brand-lightBlue text-slate-700 text-sm leading-relaxed"
                        >
                          {faq.detailedAnswer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
