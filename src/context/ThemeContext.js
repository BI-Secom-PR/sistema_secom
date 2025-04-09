// src/context/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Cria o contexto
const ThemeContext = createContext();

// Provedor do tema
export const ThemeProvider = ({ children }) => {
  // Inicializa buscando a preferência salva no localStorage, ou define como modo claro (false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Salva a preferência no localStorage sempre que isDarkMode mudar
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

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
