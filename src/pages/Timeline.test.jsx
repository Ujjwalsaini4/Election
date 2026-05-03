import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline from './Timeline';
import * as electionData from '../data/electionData';

// Mock the data to include both even and odd indices and a non-existent icon
vi.mock('../data/electionData', async () => {
  const actual = await vi.importActual('../data/electionData');
  return {
    ...actual,
    timelineData: [
      { id: 1, date: 'May 1', title: 'Even Event', description: 'Test desc', icon: 'NonExistentIcon' },
      { id: 2, date: 'May 2', title: 'Odd Event', description: 'Test desc', icon: 'Vote' }
    ]
  };
});

describe('Timeline Component', () => {
  it('renders timeline items with correct alignment branches', () => {
    render(<Timeline />);
    expect(screen.getByText('Even Event')).toBeInTheDocument();
    expect(screen.getByText('Odd Event')).toBeInTheDocument();
    
    // Check if both alignment classes are present in the document
    // Even items have 'md:flex-row-reverse'
    expect(document.querySelector('.md\\:flex-row-reverse')).toBeInTheDocument();
    // Odd items do NOT have 'md:flex-row-reverse'
    const containers = document.querySelectorAll('.flex-col');
    expect(containers.length).toBeGreaterThanOrEqual(2);
  });

  it('renders correctly even with a missing icon (fallback to Circle)', () => {
    render(<Timeline />);
    expect(document.querySelectorAll('svg').length).toBeGreaterThanOrEqual(2);
  });
});
