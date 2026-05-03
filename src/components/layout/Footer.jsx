import React from 'react';
import { Vote } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-primary" />
            <span className="font-semibold text-slate-900 dark:text-white">ElectionGuide</span>
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            <p>Empowering voters with accessible information.</p>
            <p className="mt-1">© {new Date().getFullYear()} ElectionGuide. All rights reserved.</p>
          </div>
          
          <div className="flex gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#" className="hover:text-primary transition-colors focus-ring rounded">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors focus-ring rounded">Terms</a>
            <a href="#" className="hover:text-primary transition-colors focus-ring rounded">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
