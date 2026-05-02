import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { generateChatResponse } from '../utils/ai';

export default function ChatAssistant() {
  const { t, speak, language } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize messages when language changes
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: t('chat.initialMessage1'),
        options: language === 'EN' 
          ? ["Yes, I am a first-time voter", "No, I have voted before", "What is an EVM?"]
          : ["हाँ, मैं पहली बार मतदाता हूँ", "नहीं, मैंने पहले मतदान किया है", "ईवीएम क्या है?"],
      }
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text };
    const currentHistory = [...messages]; // capture history before updating
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Call Gemini AI
    const responseText = await generateChatResponse(text, currentHistory);
    
    setIsTyping(false);
    let botResponse = { id: Date.now() + 1, type: 'bot', text: responseText };

    // Retain dynamic cards for specific keywords
    if (text.toLowerCase().includes('yes') || text.toLowerCase().includes('first-time') || text.includes('हाँ')) {
      botResponse.dynamicCard = {
        title: language === 'EN' ? "You need to register for a Voter ID" : "आपको वोटर आईडी के लिए पंजीकरण करना होगा",
        description: language === 'EN' ? "Use Form 6 on the NVSP portal to apply as a new voter. Ensure you are 18+ years old." : "नए मतदाता के रूप में आवेदन करने के लिए NVSP पोर्टल पर फॉर्म 6 का उपयोग करें। सुनिश्चित करें कि आपकी आयु 18+ वर्ष है।",
        icon: FileText,
        action: language === 'EN' ? "Check your eligibility" : "अपनी पात्रता जांचें"
      };
    } else if (text.toLowerCase().includes('evm') || text.includes('ईवीएम')) {
      botResponse.options = language === 'EN' ? ["Show me Simulation", "What is VVPAT?"] : ["मुझे सिमुलेशन दिखाएं", "वीवीपैट क्या है?"];
    }

    setMessages(prev => [...prev, botResponse]);
    speak(responseText); // Trigger TTS
  };

  return (
    <div className="flex flex-col h-full bg-white relative pb-16 md:pb-0 pt-4">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${msg.type === 'user' ? 'bg-slate-100 text-slate-600' : 'bg-gradient-to-tr from-brand-saffron to-brand-blue text-white'}`}>
                  {msg.type === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                </div>
                <div className={`p-3.5 md:p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-brand-blue text-white rounded-br-none' 
                    : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>

              {/* Dynamic Action Card */}
              {msg.dynamicCard && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                  className="ml-10 mt-3 p-4 bg-white border border-brand-blue/20 rounded-xl shadow-sm cursor-pointer max-w-[85%] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-brand-lightBlue text-brand-blue rounded-lg">
                      {React.createElement(msg.dynamicCard.icon, { size: 20 })}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">{msg.dynamicCard.title}</h4>
                      <p className="text-xs text-slate-500 mb-3 leading-relaxed">{msg.dynamicCard.description}</p>
                      <button className="text-xs font-bold text-brand-blue flex items-center gap-1 group">
                        {msg.dynamicCard.action} 
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Reply Options */}
              {msg.options && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 mt-3 ml-10"
                >
                  {msg.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(opt)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-brand-lightBlue text-brand-blue text-xs font-semibold rounded-full border border-slate-200 hover:border-brand-blue/30 transition-all hover:shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-saffron to-brand-blue text-white flex items-center justify-center shadow-sm">
              <Sparkles size={16} />
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 flex items-center gap-2">
              <div className="flex gap-1.5">
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              </div>
              <span className="text-xs text-slate-400 ml-2">{t('chat.typing')}</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 z-10">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('chat.placeholder')}
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-1.5 p-2.5 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/20 disabled:opacity-50 disabled:hover:shadow-none transition-all"
          >
            <Send size={16} className={inputText.trim() ? "translate-x-[-1px] translate-y-[-1px]" : ""} />
          </button>
        </form>
      </div>
    </div>
  );
}
