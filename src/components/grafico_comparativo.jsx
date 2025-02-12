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

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        const data = await graficoMetrics(startDate, endDate, selectedCampaign);
        console.log(data);
        setMetrics(data);
      } catch (error) {
        console.error("Erro ao carregar métricas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [startDate, endDate, selectedCampaign]);

  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];

  const formatarData = (data) => {
    const dateObj = new Date(data);
    const dia = String(dateObj.getUTCDate()).padStart(2, "0");
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const ano = dateObj.getUTCFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  const getXValueActual = (item) => diasSemana.includes(item.label) ? item.label : formatarData(item.date);
  const getXValuePrevious = (item) => diasSemana.includes(item.label) ? item.label : formatarData(item.date);

  const actualLabels = metrics.actual.map(getXValueActual);
  const previousLabels = metrics.previous.map(getXValuePrevious);

  let unionLabels = [];
  if (metrics.actual.length > 0 && diasSemana.includes(metrics.actual[0].label)) {
    unionLabels = [...actualLabels];
    previousLabels.forEach((label) => {
      if (!unionLabels.includes(label)) {
        unionLabels.push(label);
      }
    });
  } else {
    const labelsSet = new Set([...actualLabels, ...previousLabels]);
    unionLabels = Array.from(labelsSet);
    unionLabels.sort((a, b) => {
      const [diaA, mesA, anoA] = a.split("-").map(Number);
      const [diaB, mesB, anoB] = b.split("-").map(Number);
      return new Date(anoA, mesA - 1, diaA) - new Date(anoB, mesB - 1, diaB);
    });
  }

  const actualData = unionLabels.map((label) => {
    const item = metrics.actual.find((item) => getXValueActual(item) === label);
    return item ? item.impressions : null;
  });

  const previousData = unionLabels.map((label) => {
    const item = metrics.previous.find((item) => getXValuePrevious(item) === label);
    return item ? item.impressions : null;
  });

  // Função para calcular o tamanho do ponto e a espessura da borda com base na quantidade de labels
  const calculateDynamicSize = (numLabels, minSize, maxSize, maxLabels = 50) => {
    return Math.max(minSize, maxSize - (numLabels / maxLabels) * (maxSize - minSize));
  };

  // Calcula dinamicamente os tamanhos
  const pointRadius = calculateDynamicSize(unionLabels.length, 2, 6);
  const borderWidth = calculateDynamicSize(unionLabels.length, 2, 6);

  const chartData = {
    labels: unionLabels,
    datasets: [
      {
        label: "Veiculação Anterior",
        data: previousData,
        borderColor: "rgba(53, 162, 235, 0.8)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderWidth: borderWidth,
        pointRadius: pointRadius,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
      {
        label: "Veiculação Atual",
        data: actualData,
        borderColor: "#ff8800",
        backgroundColor: "rgba(220, 126, 38, 0.2)",
        borderWidth: borderWidth + 1, // Um pouco maior para destacar
        pointRadius: pointRadius + 1, // Um pouco maior para diferenciar
        pointBackgroundColor: "#ff7300",
        pointBorderWidth: 2,
        fill: true,
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
          callback: (value) => value.toLocaleString(),
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
