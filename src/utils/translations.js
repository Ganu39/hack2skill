const translations = {
  EN: {
    nav: {
      title: "ElectraGuide India",
      mobileTitle: "ElectraGuide"
    },
    tabs: {
      timeline: "Timeline",
      simulation: "Simulation",
      faq: "FAQ",
      quiz: "Quiz"
    },
    hero: {
      subtitle: "AI-Powered Civic Education Platform",
      title: "Your Guide to Democracy",
      description: "Interactive modules to help you understand your democratic rights, the election timeline, and how to cast your vote securely."
    },
    chat: {
      placeholder: "Ask about voting...",
      typing: "Assistant is typing...",
      initialMessage1: "Welcome to ElectraGuide! I'm your neutral AI assistant. Are you a first-time voter?",
      initialMessage2: "You can ask me about Voter Registration, EVMs, or any election-related topic."
    },
    faqs: [
      {
        id: 1,
        question: "What is an EVM?",
        shortAnswer: "EVM stands for Electronic Voting Machine, used to cast votes electronically instead of using paper ballots.",
        detailedAnswer: "Introduced to make voting secure and fast, an EVM consists of two units: a Control Unit (with the Polling Officer) and a Balloting Unit (inside the voting compartment). You press the blue button against the candidate of your choice to record your vote securely."
      },
      {
        id: 2,
        question: "What is VVPAT?",
        shortAnswer: "VVPAT is a machine that prints a paper slip to verify that your vote was cast correctly.",
        detailedAnswer: "Voter Verifiable Paper Audit Trail (VVPAT) provides a visual verification. After you press the EVM button, a slip with the candidate's serial number, name, and symbol appears in the VVPAT window for 7 seconds before falling into a sealed drop box."
      },
      {
        id: 3,
        question: "Can I vote without a Voter ID (EPIC)?",
        shortAnswer: "Yes, if your name is on the Electoral Roll, you can use other approved photo ID proofs.",
        detailedAnswer: "Even if you don't have your EPIC (Voter ID card), you can vote as long as your name is on the voter list. You can show alternative documents like Aadhaar Card, PAN Card, Driving License, Indian Passport, or MGNREGA Job Card."
      },
      {
        id: 4,
        question: "How do I check if my name is on the voter list?",
        shortAnswer: "You can verify your name online via the Election Commission of India (ECI) website or the Voter Helpline App.",
        detailedAnswer: "To check if you are on the Electoral Roll, visit voters.eci.gov.in and search your name using your EPIC number or personal details. Alternatively, you can use the Voter Helpline Mobile App or call the toll-free number 1950."
      },
      {
        id: 5,
        question: "What happens if I press the wrong button on the EVM?",
        shortAnswer: "Once a button is pressed, your vote is recorded immediately. It cannot be changed.",
        detailedAnswer: "The EVM registers a vote the exact moment a button is pressed, followed by a long beep sound. It locks immediately after one press, so you cannot change your vote or vote twice. Please be absolutely sure before pressing the blue button."
      },
      {
        id: 6,
        question: "What is NOTA?",
        shortAnswer: "NOTA means 'None of the Above'. It allows you to reject all candidates in your constituency.",
        detailedAnswer: "If you feel that none of the candidates contesting in your constituency are suitable, you can press the NOTA button, usually located at the very bottom of the EVM. It ensures your right to register discontent without your vote being misused."
      }
    ],
    quiz: {
      title: "Test Your Knowledge",
      completed: "Quiz Completed!",
      scored: "You scored",
      outOf: "out of",
      playAgain: "Play Again",
      tiers: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        expert: "Expert"
      }
    }
  },
  HI: {
    nav: {
      title: "इलेक्ट्रागाइड इंडिया",
      mobileTitle: "इलेक्ट्रागाइड"
    },
    tabs: {
      timeline: "समयरेखा",
      simulation: "सिमुलेशन",
      faq: "सामान्य प्रश्न",
      quiz: "प्रश्नोत्तरी"
    },
    hero: {
      subtitle: "एआई-संचालित नागरिक शिक्षा मंच",
      title: "लोकतंत्र के लिए आपका मार्गदर्शक",
      description: "आपके लोकतांत्रिक अधिकारों, चुनाव समयरेखा और सुरक्षित रूप से वोट डालने के तरीके को समझने में आपकी सहायता के लिए इंटरैक्टिव मॉड्यूल।"
    },
    chat: {
      placeholder: "मतदान के बारे में पूछें...",
      typing: "सहायक टाइप कर रहा है...",
      initialMessage1: "इलेक्ट्रागाइड में आपका स्वागत है! मैं आपका निष्पक्ष एआई सहायक हूँ। क्या आप पहली बार मतदाता हैं?",
      initialMessage2: "आप मुझसे मतदाता पंजीकरण, ईवीएम, या चुनाव से संबंधित किसी भी विषय के बारे में पूछ सकते हैं।"
    },
    faqs: [
      {
        id: 1,
        question: "ईवीएम क्या है?",
        shortAnswer: "ईवीएम का अर्थ इलेक्ट्रॉनिक वोटिंग मशीन है, जिसका उपयोग पेपर बैलेट के बजाय इलेक्ट्रॉनिक रूप से वोट डालने के लिए किया जाता है।",
        detailedAnswer: "मतदान को सुरक्षित और तेज़ बनाने के लिए पेश किया गया, एक ईवीएम में दो इकाइयाँ होती हैं: एक कंट्रोल यूनिट (पीठासीन अधिकारी के पास) और एक बैलेटिंग यूनिट (मतदान डिब्बे के अंदर)। आप अपना वोट सुरक्षित रूप से दर्ज करने के लिए अपनी पसंद के उम्मीदवार के सामने नीले बटन को दबाते हैं।"
      },
      {
        id: 2,
        question: "वीवीपैट क्या है?",
        shortAnswer: "वीवीपैट एक मशीन है जो यह सत्यापित करने के लिए पेपर स्लिप प्रिंट करती है कि आपका वोट सही ढंग से डाला गया था।",
        detailedAnswer: "वोटर वेरिफिएबल पेपर ऑडिट ट्रेल (वीवीपैट) एक दृश्य सत्यापन प्रदान करता है। आपके ईवीएम बटन दबाने के बाद, उम्मीदवार के सीरियल नंबर, नाम और प्रतीक के साथ एक पर्ची 7 सेकंड के लिए वीवीपैट विंडो में दिखाई देती है और फिर सीलबंद ड्रॉप बॉक्स में गिर जाती है।"
      },
      {
        id: 3,
        question: "क्या मैं वोटर आईडी (एपिक) के बिना मतदान कर सकता हूँ?",
        shortAnswer: "हां, यदि आपका नाम मतदाता सूची में है, तो आप अन्य अनुमोदित फोटो पहचान प्रमाणों का उपयोग कर सकते हैं।",
        detailedAnswer: "भले ही आपके पास आपका एपिक (वोटर आईडी कार्ड) न हो, आप तब तक मतदान कर सकते हैं जब तक आपका नाम मतदाता सूची में है। आप आधार कार्ड, पैन कार्ड, ड्राइविंग लाइसेंस, भारतीय पासपोर्ट या मनरेगा जॉब कार्ड जैसे वैकल्पिक दस्तावेज दिखा सकते हैं।"
      },
      {
        id: 4,
        question: "मैं कैसे जांचूं कि मेरा नाम मतदाता सूची में है या नहीं?",
        shortAnswer: "आप भारत निर्वाचन आयोग (ECI) की वेबसाइट या वोटर हेल्पलाइन ऐप के माध्यम से ऑनलाइन अपना नाम सत्यापित कर सकते हैं।",
        detailedAnswer: "यह जांचने के लिए कि आप मतदाता सूची में हैं या नहीं, voters.eci.gov.in पर जाएं और अपने एपिक नंबर या व्यक्तिगत विवरण का उपयोग करके अपना नाम खोजें। वैकल्पिक रूप से, आप वोटर हेल्पलाइन मोबाइल ऐप का उपयोग कर सकते हैं या टोल-फ्री नंबर 1950 पर कॉल कर सकते हैं।"
      },
      {
        id: 5,
        question: "क्या होगा यदि मैं ईवीएम पर गलत बटन दबा दूं?",
        shortAnswer: "एक बार बटन दबाने के बाद, आपका वोट तुरंत दर्ज हो जाता है। इसे बदला नहीं जा सकता।",
        detailedAnswer: "ईवीएम बटन दबाने के ठीक उसी क्षण एक वोट दर्ज करता है, जिसके बाद एक लंबी बीप की आवाज आती है। यह एक बार दबाने के बाद तुरंत लॉक हो जाता है, इसलिए आप अपना वोट नहीं बदल सकते या दो बार वोट नहीं कर सकते। कृपया नीला बटन दबाने से पहले बिल्कुल आश्वस्त रहें।"
      },
      {
        id: 6,
        question: "नोटा (NOTA) क्या है?",
        shortAnswer: "नोटा का अर्थ है 'उपरोक्त में से कोई नहीं'। यह आपको अपने निर्वाचन क्षेत्र के सभी उम्मीदवारों को अस्वीकार करने की अनुमति देता है।",
        detailedAnswer: "यदि आपको लगता है कि आपके निर्वाचन क्षेत्र में चुनाव लड़ने वाले उम्मीदवारों में से कोई भी उपयुक्त नहीं है, तो आप नोटा बटन दबा सकते हैं, जो आमतौर पर ईवीएम में सबसे नीचे स्थित होता है। यह सुनिश्चित करता है कि आपके वोट का दुरुपयोग किए बिना असंतोष दर्ज करने का आपका अधिकार सुरक्षित रहे।"
      }
    ],
    quiz: {
      title: "अपने ज्ञान का परीक्षण करें",
      completed: "प्रश्नोत्तरी पूरी हुई!",
      scored: "आपने",
      outOf: "में से",
      playAgain: "फिर से खेलें",
      tiers: {
        beginner: "शुरुआती",
        intermediate: "मध्यवर्ती",
        expert: "विशेषज्ञ"
      }
    }
  }
};

export default translations;
