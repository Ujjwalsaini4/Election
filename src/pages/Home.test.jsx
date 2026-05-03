import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Page', () => {
  it('renders the main hero text', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Your Complete Guide to the/i)).toBeInTheDocument();
    expect(screen.getByText(/Election Process/i)).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getAllByText(/Step-by-Step Guide/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Interactive Timeline/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Smart Assistant/i)[0]).toBeInTheDocument();
  });
});
