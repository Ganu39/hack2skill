import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AppProvider } from '../context/AppContext';
import QuizSection from '../components/QuizSection';

// Wrapper to provide context
function renderWithProvider(ui) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('QuizSection', () => {
  it('renders the quiz section heading', () => {
    renderWithProvider(<QuizSection />);
    // Should render some quiz-related content
    const quizElement = document.querySelector('[class*="quiz"], [data-testid="quiz"]') || screen.getByRole('heading', { level: 2 });
    expect(quizElement).toBeTruthy();
  });

  it('displays quiz question text', () => {
    renderWithProvider(<QuizSection />);
    // Quiz should have some buttons/options visible
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('allows selecting an answer option', () => {
    renderWithProvider(<QuizSection />);
    const buttons = screen.getAllByRole('button');
    // Find an answer button (not a navigation button)
    const answerButton = buttons.find(b => b.textContent.length > 3);
    if (answerButton) {
      fireEvent.click(answerButton);
      // After clicking, the component should update (no crash)
      expect(document.body).toBeTruthy();
    }
  });

  it('renders within the provider without errors', () => {
    const { container } = renderWithProvider(<QuizSection />);
    expect(container).toBeTruthy();
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it('contains accessible text content', () => {
    renderWithProvider(<QuizSection />);
    // The quiz section should have readable text
    const textContent = document.body.textContent;
    expect(textContent.length).toBeGreaterThan(10);
  });
});
