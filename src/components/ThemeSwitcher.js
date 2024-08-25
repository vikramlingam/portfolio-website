// src/components/ThemeSwitcher.js

import React, { useState, useEffect } from 'react';

function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <button onClick={() => setIsDarkMode(prev => !prev)}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeSwitcher;
