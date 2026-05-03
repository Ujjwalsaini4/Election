import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders the footer content', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Use getAllByText because ElectionGuide appears twice
    expect(screen.getAllByText(/ElectionGuide/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Empowering voters/i)).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});
