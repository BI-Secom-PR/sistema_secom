import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { graficoMetrics } from "../data/graficoMetrics";

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

  // Agrupa as métricas por label (semana) somando impressões
  const groupMetricsByLabel = (dataArray) => {
    return Object.values(
      dataArray.reduce((acc, item) => {
        const label = item.label;
        if (!acc[label]) {
          acc[label] = { ...item };
        } else {
          acc[label].impressions += item.impressions;
        }
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        const data = await graficoMetrics(startDate, endDate, selectedCampaign);
        console.log(data)

        // Verifica se os dados são semanais e agrupa se necessário
        if (
          data.actual.length > 0 &&
          data.actual[0].label.toLowerCase().startsWith("semana")
        ) {
          data.actual = groupMetricsByLabel(data.actual);
        }
        if (
          data.previous.length > 0 &&
          data.previous[0].label.toLowerCase().startsWith("semana")
        ) {
          data.previous = groupMetricsByLabel(data.previous);
        }

        setMetrics(data);
      } catch (error) {
        console.error("Erro ao carregar métricas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [startDate, endDate, selectedCampaign]);

  const labels = metrics.actual.map((item) => item.label);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Veiculação Atual",
        data: metrics.actual.map((item) => item.impressions),
        borderColor: "#FF6B00",
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          
          if (!chartArea) {
            return null;
          }
          
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(255, 107, 0, 0)");
          gradient.addColorStop(0.5, "rgba(255, 107, 0, 0.2)");
          gradient.addColorStop(1, "rgba(255, 107, 0, 0.3)");
          return gradient;
        },
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#FF6B00",
        fill: true,
        tension: 0.3
      },
      {
        label: "Veiculação Anterior",
        data: metrics.previous.map((item) => item.impressions),
        borderColor: "#0066FF",
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          
          if (!chartArea) {
            return null;
          }
          
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(0, 102, 255, 0)");
          gradient.addColorStop(0.5, "rgba(0, 102, 255, 0.1)");
          gradient.addColorStop(1, "rgba(0, 102, 255, 0.2)");
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#0066FF",
        borderDash: [5, 5],
        fill: true,
        tension: 0.3
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#333',
        bodyColor: '#666',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: '#f0f0f0'
        },
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('pt-BR').format(value);
          }
        }
      }
    }
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14 },
          color: "#333",
          boxWidth: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: "#666" },
      },
      y: {
        grid: { color: "rgba(200, 200, 200, 0.2)" },
        ticks: {
          font: { size: 12 },
          color: "#666",
          callback: (value) => value.toLocaleString(), // Formata números
        },
      },
    },
  };

  return (
    <Card className="campaign-card p-3 shadow" style={{ height: "500px" }}>
      <Card.Title className="text-center mb-3 fw-bold">
        Comparação de Impressões por Período
      </Card.Title>
      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="w-100 h-100">
          <Line options={options} data={chartData} />
        </div>
      )}
    </Card>
  );
};

export default GraficoComparativo;