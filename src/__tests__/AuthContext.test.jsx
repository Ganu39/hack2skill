import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Mock Firebase utilities
vi.mock('../utils/firebase', () => ({
  onAuthChange: vi.fn((cb) => {
    // Simulate no user logged in
    setTimeout(() => cb(null), 0);
    return () => {};
  }),
  signInWithGoogle: vi.fn(),
  signOutUser: vi.fn(),
  getUserProgress: vi.fn().mockResolvedValue(null),
  saveUserProgress: vi.fn().mockResolvedValue(undefined),
}));

// Test component to access context
function TestConsumer() {
  const { user, isLoggedIn, loading, progress } = useAuth();
  return (
    <div>
      <span data-testid="logged-in">{String(isLoggedIn)}</span>
      <span data-testid="user">{user ? user.displayName : 'none'}</span>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="quizzes">{progress.quizzesTaken}</span>
      <span data-testid="best-score">{progress.bestScore}</span>
    </div>
  );
}

describe('AuthContext', () => {
  it('provides default values when no user is logged in', async () => {
    render(
      <AuthProvider><TestConsumer /></AuthProvider>
    );
    // Wait for async auth state to resolve
    await vi.waitFor(() => {
      expect(screen.getByTestId('logged-in')).toHaveTextContent('false');
    });
    expect(screen.getByTestId('user')).toHaveTextContent('none');
  });

  it('provides default progress values', () => {
    render(
      <AuthProvider><TestConsumer /></AuthProvider>
    );
    expect(screen.getByTestId('quizzes')).toHaveTextContent('0');
    expect(screen.getByTestId('best-score')).toHaveTextContent('0');
  });

  it('initially shows loading state', () => {
    render(
      <AuthProvider><TestConsumer /></AuthProvider>
    );
    // Loading should be true initially
    expect(screen.getByTestId('loading')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { container } = render(
      <AuthProvider><div data-testid="child">Hello</div></AuthProvider>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });
});
