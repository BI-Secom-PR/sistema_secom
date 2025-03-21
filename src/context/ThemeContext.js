// src/context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const ThemeContext = createContext();

// Provedor do tema
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o tema
export const useTheme = () => useContext(ThemeContext);