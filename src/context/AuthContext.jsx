import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthChange, signInWithGoogle, signOutUser, getUserProgress, saveUserProgress } from '../utils/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({
    quizzesTaken: 0,
    bestScore: 0,
    simulationCompleted: false,
    chatMessagesCount: 0,
  });

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        // Load user progress from Firestore
        const savedProgress = await getUserProgress(firebaseUser.uid);
        if (savedProgress) {
          setProgress(prev => ({ ...prev, ...savedProgress }));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
      setUser(null);
      setProgress({
        quizzesTaken: 0,
        bestScore: 0,
        simulationCompleted: false,
        chatMessagesCount: 0,
      });
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  /**
   * Update user progress locally and persist to Firestore
   */
  const updateProgress = async (updates) => {
    const newProgress = { ...progress, ...updates };
    setProgress(newProgress);

    if (user) {
      await saveUserProgress(user.uid, newProgress);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      progress,
      login,
      logout,
      updateProgress,
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
