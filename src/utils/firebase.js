import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';

// Firebase configuration for ElectraGuide
// Analytics is free and requires no billing
const firebaseConfig = {
  apiKey: "AIzaSyD_electraguide_demo_key",
  authDomain: "electraguide-ai.firebaseapp.com",
  projectId: "electraguide-ai",
  storageBucket: "electraguide-ai.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789",
  measurementId: "G-ELECTRAGUIDE"
};

// Initialize Firebase
let app = null;
let analytics = null;

try {
  app = initializeApp(firebaseConfig);
  // Only initialize analytics if supported (not in SSR or test environments)
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized');
    }
  }).catch(() => {
    // Analytics not supported in this environment
  });
} catch (error) {
  console.warn('Firebase initialization skipped:', error.message);
}

/**
 * Track a custom analytics event
 * @param {string} eventName - Name of the event
 * @param {Object} params - Event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  try {
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch (error) {
    // Silently fail - analytics should never break the app
  }
};

/**
 * Pre-defined event trackers for ElectraGuide features
 */
export const AnalyticsEvents = {
  // Chat events
  chatMessageSent: (language) => trackEvent('chat_message_sent', { language }),
  chatResponseReceived: (responseTime) => trackEvent('chat_response_received', { response_time_ms: responseTime }),
  
  // Quiz events
  quizStarted: (category) => trackEvent('quiz_started', { category }),
  quizCompleted: (score, total, category) => trackEvent('quiz_completed', { score, total, category, percentage: Math.round((score/total)*100) }),
  quizAnswered: (isCorrect) => trackEvent('quiz_answer_submitted', { correct: isCorrect }),
  
  // Simulation events
  simulationStarted: () => trackEvent('polling_simulation_started'),
  simulationStepCompleted: (step) => trackEvent('simulation_step_completed', { step }),
  simulationCompleted: () => trackEvent('polling_simulation_completed'),
  
  // Navigation events
  tabChanged: (tabName) => trackEvent('tab_changed', { tab: tabName }),
  languageChanged: (newLanguage) => trackEvent('language_changed', { language: newLanguage }),
  ttsToggled: (isActive) => trackEvent('tts_toggled', { active: isActive }),
  
  // Engagement events
  onboardingCompleted: () => trackEvent('onboarding_completed'),
  faqViewed: (faqId) => trackEvent('faq_viewed', { faq_id: faqId }),
  timelinePhaseViewed: (phase) => trackEvent('timeline_phase_viewed', { phase }),
};

export { app, analytics };
