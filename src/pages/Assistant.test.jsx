import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Assistant from './Assistant';

describe('Assistant Component', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial bot greeting', () => {
    render(<Assistant />);
    expect(screen.getByText(/Hello! I'm your Election Guide Assistant/i)).toBeInTheDocument();
  });

  it('handles empty input gracefully', () => {
    render(<Assistant />);
    const button = screen.getByRole('button', { name: /send message/i });
    const input = screen.getByPlaceholderText('Ask a question...');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
    expect(screen.queryByRole('user-message')).not.toBeInTheDocument();
  });

  it('handles XSS/Empty sanitization logic (line 33 coverage)', () => {
    render(<Assistant />);
    const button = screen.getByRole('button', { name: /send message/i });
    const input = screen.getByPlaceholderText('Ask a question...');
    
    // This input will be sanitized to an empty string by DOMPurify
    fireEvent.change(input, { target: { value: '<script></script>' } });
    
    // We need to bypass the disabled check if the button is disabled for truthy input
    // But '<script></script>'.trim() is truthy, so button is ENABLED.
    expect(button).not.toBeDisabled();
    
    fireEvent.click(button);
    
    // The code should hit 'if (!cleanInput) return;' and not add a user message
    expect(screen.queryByText('<script></script>')).not.toBeInTheDocument();
  });

  const testCases = [
    { name: 'id proof', q: 'id proof', a: /Aadhaar Card, PAN Card/i },
    { name: 'registration status', q: 'registration status', a: /track your application status/i },
    { name: 'evm machine', q: 'evm machine', a: /Electronic Voting Machine/i },
    { name: 'online process', q: 'online process', a: /requires physical presence/i },
    { name: 'greeting', q: 'hi', a: /Hello! Ask me any questions/i },
    { name: 'fallback', q: 'unknown', a: /I'm sorry, I don't have information/i }
  ];

  testCases.forEach((testCase) => {
    it(`responds correctly to ${testCase.name} query`, async () => {
      render(<Assistant />);
      const input = screen.getByPlaceholderText('Ask a question...');
      const button = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(input, { target: { value: testCase.q } });
      fireEvent.click(button);
      
      act(() => {
        vi.advanceTimersByTime(800);
      });
      
      expect(screen.getByText(testCase.a)).toBeInTheDocument();
    });
  });
});
