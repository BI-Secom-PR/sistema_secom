import { Home, LayoutDashboard, BarChart3, Clock, BarChart2 } from 'lucide-react';

export const menuItems = [
  { name: 'Início', icon: <Home size={24} color="#000" />, path: '/' },
  { name: 'Campanhas Ativas', icon: <LayoutDashboard size={24} color="#666" />, path: '/campanhas_ativas' },
  { name: 'Assuntos do Momento', icon: <BarChart2 size={24} color="#666" />, path: '/trends' },
  { name: 'Análise Detalhada', icon: <Clock size={24} color="#666" />, path: '/powerbi' }
];