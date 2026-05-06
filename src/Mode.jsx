import React, { useEffect, useState } from 'react';
import './Mode.css';
import { Sun, Moon, Monitor } from 'lucide-react';

const Mode = () => {
  const [theme, setTheme] = useState('default');
  const themes = ['default', 'bright', 'dark'];

  useEffect(() => {
    const savedTheme = localStorage.getItem('sastech-theme') || 'default';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme) => {
    document.body.classList.remove('bright-mode', 'dark-mode');
    if (selectedTheme === 'bright') {
      document.body.classList.add('bright-mode');
    } else if (selectedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  };

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    localStorage.setItem('sastech-theme', nextTheme);
    applyTheme(nextTheme);
  };

  const renderIcon = () => {
    switch (theme) {
      case 'bright': return <Sun size={20} />;
      case 'dark': return <Moon size={20} />;
      default: return <Monitor size={20} />;
    }
  };

  return (
    <button 
      className="theme-toggle-btn"
      onClick={toggleTheme}
      title={`Current Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode. Click to switch.`}
    >
      {renderIcon()}
      <span className="theme-toggle-label">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
    </button>
  );
};

export default Mode;
