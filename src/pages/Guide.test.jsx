import React from 'react';
import { render, screen } from '@testing-library/react';
import Guide from './Guide';

describe('Guide Component', () => {
  it('renders the guide header', () => {
    render(<Guide />);
    expect(screen.getByText('Voter Guide')).toBeInTheDocument();
  });

  it('renders all steps', () => {
    render(<Guide />);
    expect(screen.getByText(/Step 1: Check Eligibility/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 5: Cast Your Vote/i)).toBeInTheDocument();
  });
});
