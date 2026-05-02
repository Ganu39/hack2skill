import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Users, CalendarDays, Vote, CheckCircle2, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TIMELINE_STEPS = [
  {
    id: 1,
    en: {
      title: "Election Announcement",
      description: "The Election Commission of India (ECI) announces the poll dates and Model Code of Conduct comes into effect.",
      details: [
        "The President dissolves the Lok Sabha (or the Governor dissolves a state Assembly) on ECI's advice.",
        "The Model Code of Conduct (MCC) becomes effective immediately, restricting government announcements and new schemes.",
        "The ECI sets the schedule for nominations, scrutiny, withdrawal, polling, and counting dates.",
        "All political parties must comply with campaign spending limits set by the ECI."
      ]
    },
    hi: {
      title: "चुनाव की घोषणा",
      description: "भारत निर्वाचन आयोग (ECI) मतदान की तारीखें घोषित करता है और आदर्श आचार संहिता लागू हो जाती है।",
      details: [
        "राष्ट्रपति ECI की सलाह पर लोकसभा भंग करते हैं (या राज्यपाल राज्य विधानसभा भंग करते हैं)।",
        "आदर्श आचार संहिता (MCC) तुरंत प्रभावी हो जाती है, जो सरकारी घोषणाओं और नई योजनाओं को प्रतिबंधित करती है।",
        "ECI नामांकन, जांच, वापसी, मतदान और गिनती की तारीखों का कार्यक्रम तय करता है।",
        "सभी राजनीतिक दलों को ECI द्वारा निर्धारित अभियान खर्च सीमा का पालन करना होगा।"
      ]
    },
    icon: CalendarDays,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/30"
  },
  {
    id: 2,
    en: {
      title: "Filing Nominations",
      description: "Candidates submit their nomination papers and affidavits detailing their assets and background.",
      details: [
        "Candidates must file Form 26 (affidavit) disclosing criminal records, educational qualifications, and assets.",
        "A security deposit of ₹25,000 (General) or ₹12,500 (SC/ST) must be paid.",
        "The Returning Officer scrutinizes nominations and can reject invalid ones.",
        "Candidates can withdraw their nominations before the last date of withdrawal."
      ]
    },
    hi: {
      title: "नामांकन दाखिल करना",
      description: "उम्मीदवार अपने नामांकन पत्र और संपत्ति व पृष्ठभूमि का विवरण देने वाले हलफनामे जमा करते हैं।",
      details: [
        "उम्मीदवारों को फॉर्म 26 (हलफनामा) दाखिल करना होगा जिसमें आपराधिक रिकॉर्ड, शैक्षिक योग्यता और संपत्ति का खुलासा होता है।",
        "₹25,000 (सामान्य) या ₹12,500 (एससी/एसटी) की जमानत राशि जमा करनी होगी।",
        "रिटर्निंग अधिकारी नामांकन की जांच करता है और अमान्य नामांकन को अस्वीकार कर सकता है।",
        "उम्मीदवार वापसी की अंतिम तिथि से पहले अपना नामांकन वापस ले सकते हैं।"
      ]
    },
    icon: FileText,
    color: "bg-purple-500",
    shadow: "shadow-purple-500/30"
  },
  {
    id: 3,
    en: {
      title: "Campaign Period",
      description: "Political parties and candidates campaign to present their vision. Ends 48 hours before polling begins.",
      details: [
        "Campaigning includes rallies, door-to-door visits, TV ads, and social media outreach.",
        "A 'silence period' of 48 hours before polling is strictly enforced — no campaigning allowed.",
        "The ECI monitors media and social platforms for violations of the MCC.",
        "Exit polls are banned from the start of polling until the last phase of voting ends."
      ]
    },
    hi: {
      title: "प्रचार अवधि",
      description: "राजनीतिक दल और उम्मीदवार अपने दृष्टिकोण को प्रस्तुत करने के लिए प्रचार करते हैं। मतदान शुरू होने से 48 घंटे पहले समाप्त होता है।",
      details: [
        "प्रचार में रैलियां, घर-घर जाकर प्रचार, टीवी विज्ञापन और सोशल मीडिया शामिल हैं।",
        "मतदान से 48 घंटे पहले 'मौन अवधि' सख्ती से लागू होती है — कोई प्रचार नहीं।",
        "ECI MCC के उल्लंघन के लिए मीडिया और सोशल प्लेटफॉर्म की निगरानी करता है।",
        "मतदान शुरू होने से लेकर अंतिम चरण तक एग्जिट पोल पर प्रतिबंध है।"
      ]
    },
    icon: Users,
    color: "bg-brand-saffron",
    shadow: "shadow-brand-saffron/30"
  },
  {
    id: 4,
    en: {
      title: "Polling Day",
      description: "Citizens vote using Electronic Voting Machines (EVMs) and verify with VVPAT slips.",
      details: [
        "Polling stations are open from 7:00 AM to 6:00 PM (times may vary by region).",
        "Voters must present a valid Photo ID (EPIC, Aadhaar, Passport, etc.) to the Presiding Officer.",
        "After identity verification, indelible ink is applied to the left index finger.",
        "Each voter presses the blue button next to their candidate on the Ballot Unit, then verifies the VVPAT slip."
      ]
    },
    hi: {
      title: "मतदान का दिन",
      description: "नागरिक इलेक्ट्रॉनिक वोटिंग मशीन (EVM) का उपयोग करके वोट देते हैं और VVPAT पर्ची से सत्यापित करते हैं।",
      details: [
        "मतदान केंद्र सुबह 7:00 बजे से शाम 6:00 बजे तक खुले रहते हैं (समय क्षेत्र के अनुसार भिन्न हो सकता है)।",
        "मतदाताओं को पीठासीन अधिकारी को एक वैध फोटो आईडी (EPIC, आधार, पासपोर्ट, आदि) प्रस्तुत करनी होगी।",
        "पहचान सत्यापन के बाद, बाएं तर्जनी उंगली पर अमिट स्याही लगाई जाती है।",
        "प्रत्येक मतदाता बैलट यूनिट पर अपने उम्मीदवार के बगल में नीला बटन दबाता है, फिर VVPAT पर्ची सत्यापित करता है।"
      ]
    },
    icon: Vote,
    color: "bg-teal-500",
    shadow: "shadow-teal-500/30"
  },
  {
    id: 5,
    en: {
      title: "Counting & Results",
      description: "Votes are counted under strict security, and the results are declared by the ECI.",
      details: [
        "Counting begins at designated centres under tight security and CCTV surveillance.",
        "EVM counts are cross-verified with VVPAT paper slips from 5 randomly selected booths per constituency.",
        "Results are updated live on the ECI website and national media.",
        "The winning candidate is issued a Certificate of Election by the Returning Officer."
      ]
    },
    hi: {
      title: "गणना और परिणाम",
      description: "कड़ी सुरक्षा के तहत वोटों की गिनती की जाती है, और परिणाम ECI द्वारा घोषित किए जाते हैं।",
      details: [
        "गणना निर्धारित केंद्रों पर कड़ी सुरक्षा और CCTV निगरानी में शुरू होती है।",
        "EVM की गिनती को प्रति निर्वाचन क्षेत्र 5 यादृच्छिक रूप से चयनित बूथों से VVPAT पेपर स्लिप से क्रॉस-सत्यापित किया जाता है।",
        "परिणाम ECI की वेबसाइट और राष्ट्रीय मीडिया पर लाइव अपडेट किए जाते हैं।",
        "विजयी उम्मीदवार को रिटर्निंग अधिकारी द्वारा निर्वाचन प्रमाणपत्र जारी किया जाता है।"
      ]
    },
    icon: CheckCircle2,
    color: "bg-brand-green",
    shadow: "shadow-brand-green/30"
  }
];

export default function ElectionTimeline() {
  const { language } = useAppContext();
  const [expandedId, setExpandedId] = useState(null);
  const lang = language === 'EN' ? 'en' : 'hi';

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-8 space-y-16">
        {TIMELINE_STEPS.map((step, index) => {
          const Icon = step.icon;
          const content = step[lang];
          const isExpanded = expandedId === step.id;
          return (
            <motion.div 
              key={step.id} 
              initial={{ opacity: 0, x: -30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot/icon */}
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }}
                className={`absolute -left-[21px] top-1 w-10 h-10 rounded-full ${step.color} shadow-lg ${step.shadow} border-4 border-white flex items-center justify-center text-white z-10 transition-transform`}
              >
                <Icon size={18} />
              </motion.div>
              
              {/* Pulse effect behind icon */}
              <div className={`absolute -left-[21px] top-1 w-10 h-10 rounded-full ${step.color} opacity-40 animate-ping -z-10`} />

              {/* Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/40 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${step.color} text-white`}>
                    {language === 'EN' ? `Phase ${index + 1}` : `चरण ${index + 1}`}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800">{content.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {content.description}
                </p>

                {/* Expand/Collapse Details */}
                <button
                  onClick={() => toggleExpand(step.id)}
                  className="mt-5 text-brand-blue text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  {isExpanded
                    ? (language === 'EN' ? 'Hide details' : 'विवरण छुपाएं')
                    : (language === 'EN' ? 'Explore details' : 'विवरण देखें')}
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex"
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                        {content.details.map((detail, dIdx) => (
                          <motion.li
                            key={dIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: dIdx * 0.08 }}
                            className="flex items-start gap-3"
                          >
                            <span className={`w-2 h-2 mt-2 rounded-full ${step.color} shrink-0`} />
                            <span className="text-sm text-slate-700 leading-relaxed">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
