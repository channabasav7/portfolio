import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export const ThemeContext = createContext();

const THEMES = ['dark', 'light'];

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme-preference');
    if (saved && THEMES.includes(saved)) {
      return saved;
    }

    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const currentIndex = THEMES.indexOf(prev);
      const nextIndex = (currentIndex + 1) % THEMES.length;
      return THEMES[nextIndex];
    });
  }, []);

  const setThemeByName = useCallback((nextTheme) => {
    if (THEMES.includes(nextTheme)) {
      setTheme(nextTheme);
    }
  }, []);

  const value = {
    theme,
    isDark: theme !== 'light',
    toggleTheme,
    setTheme: setThemeByName,
    themes: THEMES,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
