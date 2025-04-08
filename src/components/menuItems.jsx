import { Home, LayoutDashboard, BarChart3, Clock, Clock2, BarChart2, MapIcon, ChartBar } from 'lucide-react';

// Transforme o array em uma função que recebe isDarkMode como parâmetro
export const getMenuItems = (isDarkMode) => [
  {
    name: 'Início',
    icon: <Home size={24} color={isDarkMode ? "#ffffff" : "#000"} />, // Cor dinâmica
    path: '/'
  },
  {
    name: 'Campanhas Ativas',
    icon: <LayoutDashboard size={24} color={isDarkMode ? "#ffffff" : "#666"} />, // Cor dinâmica
    path: '/campanhas_ativas'
  },
  {
    name: 'Assuntos do Momento',
    icon: <BarChart2 size={24} color={isDarkMode ? "#ffffff" : "#666"} />, // Cor dinâmica
    path: '/trends'
  },
  {
    name: 'Análise Detalhada',
    icon: <Clock size={24} color={isDarkMode ? "#ffffff" : "#666"} />, // Cor dinâmica
    path: '/powerbi'
  },
  {
    name: 'Análise Demográfica',
    icon: <MapIcon size={24} color={isDarkMode ? "#ffffff" : "#666"} />, // Cor dinâmica
    path: '/demografico'
  },
  {
    name: 'Dashboard Performance',
    icon: <BarChart3 size={24} color={isDarkMode ? "#ffffff" : "#666"} />, // Cor dinâmica
    path: '/performance'
  },
  {
    name: 'Comparativo Histórico',
    icon: <Clock2 size={24} color={isDarkMode ? "#ffffff" : "#666"} />, // Cor dinâmica
    path: '/comparativo_historico'
  },
  {
    name: 'Debate Digital',
    icon: <ChartBar size={24} color={isDarkMode ? "#ffffff" : "#666"} />, // Cor dinâmica
    path: '/stilingue'
  }
];