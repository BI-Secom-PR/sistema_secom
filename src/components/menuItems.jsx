import { Home, LayoutDashboard, BarChart3, Clock, BarChart2 } from 'lucide-react';

export const menuItems = [
  { name: 'Início', icon: <Home size={24} color="#000" />, path: '/' },
  { name: 'Campanhas Ativas', icon: <LayoutDashboard size={24} color="#666" />, path: '/campanhas_ativas' },
  { name: 'Demandas', icon: <BarChart3 size={24} color="#666" />, path: '/demandas' },
  { name: 'Trends', icon: <Clock size={24} color="#666" />, path: '/trends' },
  { name: 'Análise Power BI', icon: <BarChart2 size={24} color="#666" />, path: '/powerbi' }
];