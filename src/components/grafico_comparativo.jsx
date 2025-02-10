import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { graficoMetrics } from '../data/graficoMetrics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficoComparativo = ({ startDate, endDate, selectedCampaign }) => {
  const [metrics, setMetrics] = useState({ actual: [], previous: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        const data = await graficoMetrics(startDate, endDate, selectedCampaign)
        setMetrics(data);
      } catch (error) {
        console.error('Erro ao carregar métricas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [startDate, endDate, selectedCampaign]);

  // Criando as labels com base nas datas
  const labels = metrics.actual.map(item => item.label);

  // Criando os datasets
  const data = {
    labels,
    datasets: [
      {
        label: 'Atual',
        data: metrics.actual.map(item => item.impressions),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Período Anterior',
        data: metrics.previous.map(item => item.impressions),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Comparação de Impressões por Período',
      },
    },
  };

  return (
    <Card className="campaign-card" style={{ height: '500px' }}>
      <Card.Title> Comparação de Impressões por Período </Card.Title>
      {loading ? <p>Carregando...</p> : <Line options={options} data={data} />}
    </Card>
  );
};

export default GraficoComparativo;
