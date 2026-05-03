import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
