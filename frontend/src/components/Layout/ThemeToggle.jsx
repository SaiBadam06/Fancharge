import React from 'react';
import { HiSun, HiMoon } from 'react-icons/hi2';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ipl-primary)]"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <HiSun className="h-5 w-5 text-white" />
      ) : (
        <HiMoon className="h-5 w-5 text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
