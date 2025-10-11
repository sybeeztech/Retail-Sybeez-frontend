import React, { createContext, useContext, useEffect } from 'react';
import useSettingsStore from '../store/settingsStore';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const { theme, primaryColor } = useSettingsStore();

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply primary color as CSS custom property
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [theme, primaryColor]);

  const value = {
    theme,
    primaryColor,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;