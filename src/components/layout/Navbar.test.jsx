import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Timeline')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Guide')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Assistant')[0]).toBeInTheDocument();
  });

  it('toggles the mobile menu when clicking the menu button', async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    // Find the menu toggle button by its aria-label
    const toggleButton = screen.getByLabelText(/Toggle navigation menu/i);
    
    // Initially only 1 'Home' (desktop)
    expect(screen.getAllByText('Home')).toHaveLength(1);
    
    // Open menu
    fireEvent.click(toggleButton);
    
    // Should now have 2 'Home' (desktop + mobile)
    await waitFor(() => {
      expect(screen.getAllByText('Home')).toHaveLength(2);
    });
    
    // Close menu
    fireEvent.click(toggleButton);
    
    // Wait for animation to finish and element to be removed from DOM
    await waitFor(() => {
      expect(screen.getAllByText('Home')).toHaveLength(1);
    }, { timeout: 1000 });
  });
});
