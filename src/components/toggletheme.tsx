// src/App.tsx
import React from 'react';
import { useTheme } from '../contexts/themeDark';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none bg-gray-200 dark:bg-gray-700"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      ) : (
        <SunIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
};

export default ToggleTheme;
