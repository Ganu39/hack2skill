import '@testing-library/jest-dom';

// Mock window.speechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn(() => []),
    onvoiceschanged: null,
  },
  writable: true,
});

// Mock SpeechSynthesisUtterance
window.SpeechSynthesisUtterance = vi.fn().mockImplementation((text) => ({
  text,
  rate: 1,
  pitch: 1,
  voice: null,
}));

// Mock import.meta.env
vi.stubEnv('VITE_GEMINI_API_KEY', 'test-key');
