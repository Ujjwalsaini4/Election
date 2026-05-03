import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Assistant from './Assistant';

describe('Assistant Component', () => {
  it('renders initial bot greeting', () => {
    render(<Assistant />);
    expect(screen.getByText(/Hello! I'm your Election Guide Assistant/i)).toBeInTheDocument();
  });

  it('allows user to send a message and receives a reply', async () => {
    // We must mock window.HTMLElement.prototype.scrollIntoView to prevent errors in JSDOM
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    
    render(<Assistant />);
    
    const input = screen.getByPlaceholderText('Ask a question...');
    const button = screen.getByRole('button', { name: /send message/i });

    await userEvent.type(input, 'How to check status?');
    fireEvent.click(button);

    // User message should be on screen
    expect(screen.getByText('How to check status?')).toBeInTheDocument();
    
    // Typing indicator should appear
    expect(screen.getByText('Typing...')).toBeInTheDocument();

    // Wait for bot reply
    await waitFor(() => {
      expect(screen.getByText(/You can track your application status online/i)).toBeInTheDocument();
    }, { timeout: 1500 });
  });
});
