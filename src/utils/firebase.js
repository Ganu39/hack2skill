import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';

// Firebase configuration for ElectraGuide
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
let auth = null;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  // Only initialize analytics if supported (not in SSR or test environments)
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
} catch (error) {
  console.warn('Firebase initialization skipped:', error.message);
}

// ─── Authentication ────────────────────────────────────────────

const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google popup
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Save user profile to Firestore
    await saveUserProfile(result.user);
    trackEvent('user_signed_in', { method: 'google' });
    return result.user;
  } catch (error) {
    console.error('Google Sign-In error:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
    trackEvent('user_signed_out');
  } catch (error) {
    console.error('Sign-Out error:', error);
  }
};

/**
 * Subscribe to auth state changes
 * @param {Function} callback
 * @returns {Function} unsubscribe
 */
export const onAuthChange = (callback) => {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
};

// ─── Firestore: User Profiles ──────────────────────────────────

/**
 * Save or update user profile in Firestore
 */
const saveUserProfile = async (user) => {
  if (!db || !user) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      displayName: user.displayName || 'Anonymous',
      email: user.email,
      photoURL: user.photoURL,
      lastLogin: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.warn('Firestore write skipped:', error.message);
  }
};

/**
 * Get user profile from Firestore
 */
export const getUserProfile = async (uid) => {
  if (!db || !uid) return null;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.warn('Firestore read skipped:', error.message);
    return null;
  }
};

// ─── Firestore: Quiz Scores ────────────────────────────────────

/**
 * Save a quiz score to Firestore
 */
export const saveQuizScore = async (uid, scoreData) => {
  if (!db || !uid) return;
  try {
    await addDoc(collection(db, 'quizScores'), {
      uid,
      score: scoreData.score,
      total: scoreData.total,
      percentage: Math.round((scoreData.score / scoreData.total) * 100),
      category: scoreData.category || 'general',
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.warn('Quiz score save skipped:', error.message);
  }
};

/**
 * Get top quiz scores for a user
 */
export const getUserQuizScores = async (uid) => {
  if (!db || !uid) return [];
  try {
    const q = query(
      collection(db, 'quizScores'),
      where('uid', '==', uid),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn('Quiz scores read skipped:', error.message);
    return [];
  }
};

// ─── Firestore: User Progress ──────────────────────────────────

/**
 * Save user learning progress
 */
export const saveUserProgress = async (uid, progressData) => {
  if (!db || !uid) return;
  try {
    const progressRef = doc(db, 'userProgress', uid);
    await setDoc(progressRef, {
      ...progressData,
      lastUpdated: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.warn('Progress save skipped:', error.message);
  }
};

/**
 * Get user learning progress
 */
export const getUserProgress = async (uid) => {
  if (!db || !uid) return null;
  try {
    const progressRef = doc(db, 'userProgress', uid);
    const snap = await getDoc(progressRef);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.warn('Progress read skipped:', error.message);
    return null;
  }
};

// ─── Analytics ─────────────────────────────────────────────────

/**
 * Track a custom analytics event
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
  
  // Auth events
  loginAttempted: () => trackEvent('login_attempted'),
  loginSuccess: () => trackEvent('login_success'),
  
  // Engagement events
  onboardingCompleted: () => trackEvent('onboarding_completed'),
  faqViewed: (faqId) => trackEvent('faq_viewed', { faq_id: faqId }),
  timelinePhaseViewed: (phase) => trackEvent('timeline_phase_viewed', { phase }),
};

export { app, analytics, auth, db };
