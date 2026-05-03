import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline from './Timeline';

describe('Timeline Component', () => {
  it('renders the timeline header', () => {
    render(<Timeline />);
    expect(screen.getByText('Election Timeline')).toBeInTheDocument();
  });

  it('renders timeline data items', () => {
    render(<Timeline />);
    expect(screen.getByText('Voter Registration')).toBeInTheDocument();
    expect(screen.getByText('Candidate Nominations')).toBeInTheDocument();
    expect(screen.getByText('Voting Day')).toBeInTheDocument();
  });
});
