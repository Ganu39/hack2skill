import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the Google Generative AI module
vi.mock('@google/generative-ai', () => {
  const mockSendMessage = vi.fn().mockResolvedValue({
    response: { text: () => 'This is a test response about elections.' },
  });

  const mockStartChat = vi.fn().mockReturnValue({
    sendMessage: mockSendMessage,
  });

  const mockGetGenerativeModel = vi.fn().mockReturnValue({
    startChat: mockStartChat,
  });

  // Use a proper class so it works with `new`
  class MockGoogleGenerativeAI {
    constructor() {
      this.getGenerativeModel = mockGetGenerativeModel;
    }
  }

  return {
    GoogleGenerativeAI: MockGoogleGenerativeAI,
  };
});

describe('AI Utility - generateChatResponse', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns error message when API key is missing', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', '');
    
    const { generateChatResponse } = await import('../utils/ai.js');
    const response = await generateChatResponse('Hello');
    expect(response).toContain('Error');
  });

  it('returns error message when API key is placeholder', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'your_api_key_here');
    
    const { generateChatResponse } = await import('../utils/ai.js');
    const response = await generateChatResponse('Hello');
    expect(response).toContain('Error');
  });

  it('returns a response when API key is valid', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'valid-test-key-12345');
    
    const { generateChatResponse } = await import('../utils/ai.js');
    const response = await generateChatResponse('What is an EVM?');
    expect(response).toBe('This is a test response about elections.');
  });

  it('handles empty message gracefully', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'valid-test-key-12345');
    
    const { generateChatResponse } = await import('../utils/ai.js');
    const response = await generateChatResponse('');
    expect(response).toBeDefined();
  });

  it('accepts chat history parameter', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'valid-test-key-12345');
    
    const { generateChatResponse } = await import('../utils/ai.js');
    const history = [
      { type: 'user', text: 'Hello' },
      { type: 'bot', text: 'Welcome!' },
    ];
    const response = await generateChatResponse('Follow up question', history);
    expect(response).toBeDefined();
  });
});
