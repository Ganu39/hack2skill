import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { AppProvider, useAppContext } from '../context/AppContext';

// Helper component to access context values
function TestConsumer() {
  const { language, toggleLanguage, isTTSActive, toggleTTS, t } = useAppContext();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="tts">{String(isTTSActive)}</span>
      <span data-testid="translation">{t('nav.title')}</span>
      <span data-testid="missing-key">{t('nonexistent.key')}</span>
      <button data-testid="toggle-lang" onClick={toggleLanguage}>Toggle Lang</button>
      <button data-testid="toggle-tts" onClick={toggleTTS}>Toggle TTS</button>
    </div>
  );
}

describe('AppContext', () => {
  it('provides default language as EN', () => {
    render(
      <AppProvider><TestConsumer /></AppProvider>
    );
    expect(screen.getByTestId('language')).toHaveTextContent('EN');
  });

  it('toggles language from EN to HI', () => {
    render(
      <AppProvider><TestConsumer /></AppProvider>
    );
    fireEvent.click(screen.getByTestId('toggle-lang'));
    expect(screen.getByTestId('language')).toHaveTextContent('HI');
  });

  it('toggles language back from HI to EN', () => {
    render(
      <AppProvider><TestConsumer /></AppProvider>
    );
    fireEvent.click(screen.getByTestId('toggle-lang'));
    fireEvent.click(screen.getByTestId('toggle-lang'));
    expect(screen.getByTestId('language')).toHaveTextContent('EN');
  });

  it('provides default TTS state as false', () => {
    render(
      <AppProvider><TestConsumer /></AppProvider>
    );
    expect(screen.getByTestId('tts')).toHaveTextContent('false');
  });

  it('toggles TTS on', () => {
    render(
      <AppProvider><TestConsumer /></AppProvider>
    );
    fireEvent.click(screen.getByTestId('toggle-tts'));
    expect(screen.getByTestId('tts')).toHaveTextContent('true');
  });

  it('toggles TTS off and cancels speech', () => {
    render(
      <AppProvider><TestConsumer /></AppProvider>
    );
    fireEvent.click(screen.getByTestId('toggle-tts')); // on
    fireEvent.click(screen.getByTestId('toggle-tts')); // off
    expect(screen.getByTestId('tts')).toHaveTextContent('false');
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  it('translates known keys correctly', () => {
    render(
      <AppProvider><TestConsumer /></AppProvider>
    );
    // Should return a non-empty translated string for a valid key
    const translation = screen.getByTestId('translation').textContent;
    expect(translation).toBeTruthy();
    expect(translation).not.toBe('nav.title');
  });

  it('returns key as fallback for missing translations', () => {
    render(
      <AppProvider><TestConsumer /></AppProvider>
    );
    expect(screen.getByTestId('missing-key')).toHaveTextContent('nonexistent.key');
  });
});
