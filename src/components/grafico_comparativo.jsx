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
        borderColor: "#ff8800", // Vermelho forte
        backgroundColor: "rgba(220, 126, 38, 0.2)",
        borderWidth: 4,
        pointRadius: 6,
        pointBackgroundColor: "#ff7300",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Veiculação Anterior",
        data: metrics.previous.map((item) => item.impressions),
        borderColor: "rgba(53, 162, 235, 0.8)", // Azul moderno
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderWidth: 3,
        pointRadius: 5,
        borderDash: [5, 5], // Linha tracejada
        fill: false,
        tension: 0.4,
      },
    ],
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