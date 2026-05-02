export const simulationData = [
  {
    id: 1,
    type: "choice",
    en: {
      title: "Preparation at Home",
      scenario: "Today is your first voting day! You are getting ready to leave your house for the polling booth. Which document must you take with you?",
      choices: [
        { text: "My College ID Card or Library Card", isCorrect: false, feedback: "Incorrect. A student or library card is not a widely accepted government ID for voting. Try again." },
        { text: "Voter ID (EPIC) or Aadhaar Card", isCorrect: true, feedback: "Perfect! A Voter ID (EPIC) is ideal, but other government photo IDs like Aadhaar, PAN, or Passport are also accepted if your name is on the electoral roll." },
        { text: "Just a pen, they provide the rest", isCorrect: false, feedback: "Incorrect. You cannot vote without proving your identity to the Polling Officer. You must carry a valid photo ID." }
      ]
    },
    hi: {
      title: "घर पर तैयारी",
      scenario: "आज आपका पहला मतदान का दिन है! आप मतदान केंद्र के लिए अपना घर छोड़ने के लिए तैयार हो रहे हैं। आपको अपने साथ कौन सा दस्तावेज़ ले जाना चाहिए?",
      choices: [
        { text: "मेरा कॉलेज आईडी कार्ड या लाइब्रेरी कार्ड", isCorrect: false, feedback: "गलत। एक छात्र या पुस्तकालय कार्ड मतदान के लिए एक व्यापक रूप से स्वीकृत सरकारी आईडी नहीं है। पुनः प्रयास करें।" },
        { text: "वोटर आईडी (EPIC) या आधार कार्ड", isCorrect: true, feedback: "बिल्कुल सही! वोटर आईडी (EPIC) आदर्श है, लेकिन आधार, पैन या पासपोर्ट जैसे अन्य सरकारी फोटो आईडी भी स्वीकार किए जाते हैं यदि आपका नाम मतदाता सूची में है।" },
        { text: "सिर्फ एक पेन, बाकी वे प्रदान करते हैं", isCorrect: false, feedback: "गलत। आप मतदान अधिकारी को अपनी पहचान साबित किए बिना मतदान नहीं कर सकते। आपको एक वैध फोटो आईडी ले जाना चाहिए।" }
      ]
    }
  },
  {
    id: 2,
    type: "choice",
    en: {
      title: "Reaching the Polling Booth",
      scenario: "You arrive at the polling station. It is a little crowded. What should be your first step?",
      choices: [
        { text: "Walk straight to the EVM inside", isCorrect: false, feedback: "Hold on! You cannot enter the voting compartment directly. You must verify your identity first." },
        { text: "Find your name on the voter slip outside, then join the queue", isCorrect: true, feedback: "Exactly! Always check the voter list displayed outside to confirm your booth number, then join the queue patiently." },
        { text: "Take photos inside the polling booth for social media", isCorrect: false, feedback: "Strictly prohibited! Photography and mobile phones are generally not allowed inside the polling station to maintain secrecy." }
      ]
    },
    hi: {
      title: "मतदान केंद्र पर पहुँचना",
      scenario: "आप मतदान केंद्र पर पहुंचते हैं। थोड़ी भीड़ है। आपका पहला कदम क्या होना चाहिए?",
      choices: [
        { text: "सीधे अंदर ईवीएम के पास चलें", isCorrect: false, feedback: "रुकिए! आप सीधे मतदान कक्ष में प्रवेश नहीं कर सकते। आपको पहले अपनी पहचान सत्यापित करनी होगी।" },
        { text: "बाहर मतदाता पर्ची पर अपना नाम खोजें, फिर कतार में शामिल हों", isCorrect: true, feedback: "बिल्कुल! अपना बूथ नंबर पक्का करने के लिए हमेशा बाहर प्रदर्शित मतदाता सूची की जांच करें, फिर धैर्यपूर्वक कतार में शामिल हों।" },
        { text: "सोशल मीडिया के लिए मतदान केंद्र के अंदर तस्वीरें लें", isCorrect: false, feedback: "सख्ती से मना है! गोपनीयता बनाए रखने के लिए मतदान केंद्र के अंदर फोटोग्राफी और मोबाइल फोन की अनुमति नहीं है।" }
      ]
    }
  },
  {
    id: 3,
    type: "choice",
    en: {
      title: "Identity Verification",
      scenario: "You are inside. The First Polling Officer asks for your name and ID. What happens next?",
      choices: [
        { text: "Hand over your ID, get your finger inked, and sign the register", isCorrect: true, feedback: "Correct! The officer checks your ID, marks your finger with indelible ink, and takes your signature or thumb impression on the register." },
        { text: "Just say your name loudly and walk in", isCorrect: false, feedback: "Incorrect. The officer must physically verify your ID against the electoral roll to prevent fake voting." },
        { text: "Give them your vote choice verbally", isCorrect: false, feedback: "Never! Voting in India is done through a secret ballot. You should never tell anyone who you are voting for." }
      ]
    },
    hi: {
      title: "पहचान सत्यापन",
      scenario: "आप अंदर हैं। प्रथम मतदान अधिकारी आपका नाम और आईडी मांगता है। इसके बाद क्या होता है?",
      choices: [
        { text: "अपनी आईडी सौंपें, अपनी उंगली पर स्याही लगवाएं, और रजिस्टर पर हस्ताक्षर करें", isCorrect: true, feedback: "सही! अधिकारी आपकी आईडी की जांच करता है, आपकी उंगली पर अमिट स्याही लगाता है, और रजिस्टर पर आपके हस्ताक्षर या अंगूठे का निशान लेता है।" },
        { text: "बस जोर से अपना नाम बताएं और अंदर चले जाएं", isCorrect: false, feedback: "गलत। फर्जी मतदान को रोकने के लिए अधिकारी को मतदाता सूची के खिलाफ आपकी आईडी को भौतिक रूप से सत्यापित करना चाहिए।" },
        { text: "उन्हें मौखिक रूप से अपनी वोट पसंद बताएं", isCorrect: false, feedback: "कभी नहीं! भारत में मतदान गुप्त मतदान के माध्यम से किया जाता है। आपको कभी भी किसी को नहीं बताना चाहिए कि आप किसे वोट दे रहे हैं।" }
      ]
    }
  },
  {
    id: 4,
    type: "evm_action",
    en: {
      title: "Inside the Voting Compartment",
      scenario: "You are standing alone in front of the Electronic Voting Machine (EVM). Press the blue button next to your chosen candidate to cast your vote.",
      successMessage: "Excellent! You heard the long beep sound, which means your vote has been securely recorded."
    },
    hi: {
      title: "मतदान कक्ष के अंदर",
      scenario: "आप इलेक्ट्रॉनिक वोटिंग मशीन (ईवीएम) के सामने अकेले खड़े हैं। अपना वोट डालने के लिए अपने चुने हुए उम्मीदवार के बगल में नीला बटन दबाएं।",
      successMessage: "बहुत बढ़िया! आपने लंबी बीप की आवाज़ सुनी, जिसका अर्थ है कि आपका वोट सुरक्षित रूप से दर्ज कर लिया गया है।"
    }
  },
  {
    id: 5,
    type: "vvpat_action",
    en: {
      title: "VVPAT Confirmation",
      scenario: "A paper slip has just printed in the VVPAT machine window next to the EVM. It will be visible for 7 seconds. What does it confirm?",
      choices: [
        { text: "It is a receipt to take home", isCorrect: false, feedback: "Incorrect. You cannot take the slip home. It automatically falls into a sealed drop box." },
        { text: "It visually confirms that my vote went to the correct candidate", isCorrect: true, feedback: "Spot on! The VVPAT slip lets you verify the candidate's serial number, name, and symbol before it drops securely into the box." },
        { text: "It shows how many people voted today", isCorrect: false, feedback: "Incorrect. The slip only shows details of the specific vote you just cast." }
      ]
    },
    hi: {
      title: "वीवीपैट (VVPAT) पुष्टि",
      scenario: "ईवीएम के बगल में वीवीपैट मशीन की खिड़की में एक पेपर स्लिप प्रिंट हुई है। यह 7 सेकंड तक दिखाई देगी। यह क्या पुष्टि करता है?",
      choices: [
        { text: "यह घर ले जाने के लिए एक रसीद है", isCorrect: false, feedback: "गलत। आप पर्ची घर नहीं ले जा सकते। यह स्वचालित रूप से एक सीलबंद ड्रॉप बॉक्स में गिर जाती है।" },
        { text: "यह स्पष्ट रूप से पुष्टि करता है कि मेरा वोट सही उम्मीदवार को गया है", isCorrect: true, feedback: "बिल्कुल सही! वीवीपैट पर्ची आपको सुरक्षित रूप से बॉक्स में गिरने से पहले उम्मीदवार के सीरियल नंबर, नाम और प्रतीक को सत्यापित करने देती है।" },
        { text: "यह दर्शाता है कि आज कितने लोगों ने मतदान किया", isCorrect: false, feedback: "गलत। पर्ची केवल आपके द्वारा अभी डाले गए विशिष्ट वोट का विवरण दिखाती है।" }
      ]
    }
  }
];

export const summaryData = {
  en: {
    title: "Simulation Complete! 🎉",
    subtitle: "You are now fully prepared to vote.",
    lessonsTitle: "Key Takeaways for Voting Day:",
    lessons: [
      "Always carry a valid government Photo ID (like Voter ID or Aadhaar).",
      "Check your name on the voter list before joining the queue.",
      "Mobile phones and photography are strictly prohibited inside.",
      "Wait for the EVM's loud beep sound to confirm your vote.",
      "Verify your vote on the VVPAT slip within the 7-second window."
    ],
    button: "Restart Simulation"
  },
  hi: {
    title: "सिमुलेशन पूर्ण! 🎉",
    subtitle: "अब आप मतदान करने के लिए पूरी तरह तैयार हैं।",
    lessonsTitle: "मतदान के दिन के लिए मुख्य बातें:",
    lessons: [
      "हमेशा एक वैध सरकारी फोटो आईडी (जैसे वोटर आईडी या आधार) साथ रखें।",
      "कतार में शामिल होने से पहले मतदाता सूची में अपना नाम जांचें।",
      "अंदर मोबाइल फोन और फोटोग्राफी सख्त वर्जित है।",
      "अपने वोट की पुष्टि करने के लिए ईवीएम की तेज़ बीप ध्वनि की प्रतीक्षा करें।",
      "7 सेकंड की विंडो के भीतर वीवीपैट पर्ची पर अपने वोट की पुष्टि करें।"
    ],
    button: "सिमुलेशन पुनरारंभ करें"
  }
};
