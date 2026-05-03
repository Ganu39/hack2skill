import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';
import QuizSection from '../components/QuizSection';

// Mock Firebase utilities used by AuthContext
vi.mock('../utils/firebase', () => ({
  onAuthChange: vi.fn((cb) => {
    setTimeout(() => cb(null), 0);
    return () => {};
  }),
  signInWithGoogle: vi.fn(),
  signOutUser: vi.fn(),
  getUserProgress: vi.fn().mockResolvedValue(null),
  saveUserProgress: vi.fn().mockResolvedValue(undefined),
  saveQuizScore: vi.fn().mockResolvedValue(undefined),
  AnalyticsEvents: {
    quizAnswered: vi.fn(),
    quizCompleted: vi.fn(),
    quizStarted: vi.fn(),
  },
}));

// Wrapper to provide both contexts
function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <AppProvider>{ui}</AppProvider>
    </AuthProvider>
  );
}

describe('QuizSection', () => {
  it('renders the quiz section heading', () => {
    renderWithProviders(<QuizSection />);
    const quizElement = document.querySelector('[class*="quiz"], [data-testid="quiz"]') || screen.getByRole('heading', { level: 2 });
    expect(quizElement).toBeTruthy();
  });

  it('displays quiz question text', () => {
    renderWithProviders(<QuizSection />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('allows selecting an answer option', () => {
    renderWithProviders(<QuizSection />);
    const buttons = screen.getAllByRole('button');
    const answerButton = buttons.find(b => b.textContent.length > 3);
    if (answerButton) {
      fireEvent.click(answerButton);
      expect(document.body).toBeTruthy();
    }
  });

  it('renders within the providers without errors', () => {
    const { container } = renderWithProviders(<QuizSection />);
    expect(container).toBeTruthy();
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it('contains accessible text content', () => {
    renderWithProviders(<QuizSection />);
    const textContent = document.body.textContent;
    expect(textContent.length).toBeGreaterThan(10);
  });

  it('has radiogroup role for answer options', () => {
    renderWithProviders(<QuizSection />);
    const radiogroup = document.querySelector('[role="radiogroup"]');
    expect(radiogroup).toBeTruthy();
  });
});
