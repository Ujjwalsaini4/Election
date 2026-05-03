import React from 'react';
import { render, screen } from '@testing-library/react';
import { Search } from 'lucide-react';
import Button from './Button';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass('bg-white');
  });

  it('renders with an icon', () => {
    render(<Button icon={Search}>Search</Button>);
    expect(screen.getByText('Search')).toBeInTheDocument();
    // Lucide icons render as svg
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });
});
