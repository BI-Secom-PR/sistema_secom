import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { graficoMetrics } from "../data/graficoMetrics";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const GraficoComparativo = ({ startDate, endDate, selectedCampaign }) => {
  const [metrics, setMetrics] = useState({ actual: [], previous: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();
  const [isAbove4K, setIsAbove4K] = useState(false); // Estado para resolução ultra-wide

  // Verifica resolução > 4K
  useEffect(() => {
    const checkResolution = () => {
      setIsAbove4K(window.innerWidth > 3840 || window.innerHeight > 2160);
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);
    return () => window.removeEventListener("resize", checkResolution);
  }, []);

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await graficoMetrics(startDate, endDate, selectedCampaign);
        if (!data || !data.actual || !data.previous) {
          throw new Error("Dados incompletos ou inválidos");
        }
        setMetrics(data);
      } catch (error) {
        console.error("Erro ao carregar métricas:", error);
        setError(error.message || "Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [startDate, endDate, selectedCampaign]);

  // Array com os nomes dos dias da semana
  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];

  // Função para formatar a data no formato "DD-MM-YYYY" utilizando métodos UTC
  const formatarData = (data) => {
    const dateObj = new Date(data);
    const dia = String(dateObj.getUTCDate()).padStart(2, "0");
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const ano = dateObj.getUTCFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  // Componente de spinner personalizado
  const LoadingSpinner = () => (
    <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ height: "100%" }}>
      <Spinner 
        animation="border" 
        variant="danger" 
        style={{ width: isAbove4K ? "4rem" : "3rem", height: isAbove4K ? "4rem" : "3rem" }}
      />
      <p 
        className="mt-3 text-muted" 
        style={{ 
          color: isDarkMode ? "#aaaaaa" : "#6c757d",
          fontSize: isAbove4K ? "1.75rem" : "1rem"
        }}
      >
        Carregando dados do gráfico...
      </p>
    </div>
  );

  // Componente de mensagem de erro
  const ErrorMessage = ({ message }) => (
    <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ height: "100%" }}>
      <div className="text-danger mb-3">
        <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: isAbove4K ? "3rem" : "2rem" }}></i>
      </div>
      <p 
        className="text-center text-danger"
        style={{ fontSize: isAbove4K ? "1.75rem" : "1rem" }}
      >
        {message}
      </p>
      <button 
        className="btn btn-outline-danger mt-2" 
        onClick={() => window.location.reload()}
        style={{ fontSize: isAbove4K ? "1.75rem" : "1rem" }}
      >
        Tentar novamente
      </button>
    </div>
  );

  // Caso não haja dados válidos para processar (já finalizado o carregamento)
  if (!loading && (!metrics || !metrics.actual || !metrics.previous)) {
    return (
      <Card 
        className={`campaign-card ${isAbove4K ? "p-4" : "p-3"} shadow`} 
        style={{ 
          height: isAbove4K ? "35vh" : "500px",
          backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
          color: isDarkMode ? "#ffffff" : "#000000",
          overflow: "hidden"
        }}
      >
        <Card.Title 
          className="text-center mb-3 fw-bold" 
          style={{ 
            color: isDarkMode ? "#ffffff" : "#000000",
            fontSize: isAbove4K ? "1.75rem" : "1rem"
          }}
        >
          Comparação de Impressões por Período
        </Card.Title>
        <div className="w-100" style={{ height: "calc(100% - 60px)" }}>
          <ErrorMessage message="Não foi possível carregar os dados do gráfico" />
        </div>
      </Card>
    );
  }

  // Função que, se o item.label for um dia da semana, retorna-o; senão, retorna a data formatada
  const getXValue = (item) =>
    diasSemana.includes(item.label) ? item.label : formatarData(item.date);

  // --- Lógica para montar os labels e os dados dos datasets ---
  let unionLabels = [];
  let actualData = [];
  let previousData = [];

  if (!loading && metrics.actual && metrics.previous) {
    if (metrics.actual.length === 7 && metrics.previous.length === 7) {
      const actualLabelsComparative = metrics.actual.map(getXValue);
      const previousLabelsComparative = metrics.previous.map(getXValue);

      if (metrics.actual.length > 0 && diasSemana.includes(metrics.actual[0].label)) {
        unionLabels = [...actualLabelsComparative];
        previousLabelsComparative.forEach((label) => {
          if (!unionLabels.includes(label)) {
            unionLabels.push(label);
          }
        });
      } else {
        const labelsSet = new Set([...actualLabelsComparative, ...previousLabelsComparative]);
        unionLabels = Array.from(labelsSet);
        unionLabels.sort((a, b) => {
          const [diaA, mesA, anoA] = a.split("-").map(Number);
          const [diaB, mesB, anoB] = b.split("-").map(Number);
          return new Date(anoA, mesA - 1, diaA) - new Date(anoB, mesB - 1, diaB);
        });
      }
      actualData = unionLabels.map((label) => {
        const item = metrics.actual.find((item) => getXValue(item) === label);
        return item ? item.impressions : null;
      });
      previousData = unionLabels.map((label) => {
        const item = metrics.previous.find((item) => getXValue(item) === label);
        return item ? item.impressions : null;
      });
    } else {
      const actualSimpleLabels = metrics.actual.map((item) => formatarData(item.date));
      const previousSimpleLabels = metrics.previous.map((item) => formatarData(item.date));

      const labelsSet = new Set([...actualSimpleLabels, ...previousSimpleLabels]);
      unionLabels = Array.from(labelsSet);
      unionLabels.sort((a, b) => {
        const [diaA, mesA, anoA] = a.split("-").map(Number);
        const [diaB, mesB, anoB] = b.split("-").map(Number);
        return new Date(anoA, mesA - 1, diaA) - new Date(anoB, mesB - 1, diaB);
      });
      actualData = unionLabels.map((label) => {
        const item = metrics.actual.find((item) => formatarData(item.date) === label);
        return item ? item.impressions : null;
      });
      previousData = unionLabels.map((label) => {
        const item = metrics.previous.find((item) => formatarData(item.date) === label);
        return item ? item.impressions : null;
      });
    }
  }

  const calculateDynamicSize = (numLabels, minSize, maxSize, maxLabels = 50) => {
    return Math.max(minSize, maxSize - (numLabels / maxLabels) * (maxSize - minSize));
  };

  const pointRadius = calculateDynamicSize(unionLabels.length, 1, 4);
  const borderWidth = calculateDynamicSize(unionLabels.length, 1, 4);

  const chartData = {
    labels: unionLabels,
    datasets: [
      {
        label: "Veiculação Atual",
        data: actualData,
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(255, 0, 0, 0)");      
          gradient.addColorStop(0.2, "rgba(255, 0, 0, 0.2)");  
          gradient.addColorStop(0.4, "rgba(255, 0, 0, 0.4)"); 
          gradient.addColorStop(0.6, "rgba(255, 0, 0, 0.5)");  
          gradient.addColorStop(0.8, "rgba(255, 0, 0, 0.6)");  
          gradient.addColorStop(1, "rgba(255, 0, 0, 0.6)");
          return gradient;
        },
        borderWidth: borderWidth + 1,
        pointRadius: pointRadius + 1,
        pointBackgroundColor: "rgb(255, 0, 0)", 
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
        order: 2,
      },
      {
        label: "Veiculação Anterior",
        data: previousData,
        borderColor: "rgba(255, 208, 0)",
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(255, 208, 0, 0)");
          gradient.addColorStop(0.2, "rgba(255, 208, 0, 0.2)");
          gradient.addColorStop(0.4, "rgba(255, 208, 0, 0.4)");
          gradient.addColorStop(0.6, "rgba(255, 208, 0, 0.4)");
          gradient.addColorStop(0.8, "rgba(255, 208, 0, 0.6)");
          gradient.addColorStop(1, "rgba(255, 208, 0, 0.7)");
          return gradient;
        },
        borderWidth: borderWidth + 1,
        pointRadius: pointRadius + 1,
        pointBackgroundColor: "rgba(255, 208, 0, 0.8)",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
        order: 1,
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
          font: { size: isAbove4K ? 24 : 14 },
          color: isDarkMode ? "#ffffff" : "#333",
          boxWidth: 20,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "rgba(50, 50, 50, 0.9)" : "rgba(0, 0, 0, 0.7)",
        titleFont: { size: isAbove4K ? 24 : 14 },
        bodyFont: { size: isAbove4K ? 21 : 12 },
        padding: 10,
        displayColors: false,
        titleColor: "#ffffff",
        bodyColor: isDarkMode ? "#e0e0e0" : "#ffffff",
      },
    },
    scales: {
      x: {
        grid: { 
          display: false,
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        },
        ticks: { 
          font: { size: isAbove4K ? 21 : 12 },
          color: isDarkMode ? "#cccccc" : "#666" 
        },
      },
      y: {
        grid: { 
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(200, 200, 200, 0.2)"
        },
        ticks: {
          font: { size: isAbove4K ? 21 : 12 },
          color: isDarkMode ? "#cccccc" : "#666",
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  return (
    <Card 
      className={`campaign-card ${isAbove4K ? "p-4" : "p-3"} shadow`} 
      style={{ 
        height: isAbove4K ? "40vh" : "500px",
        backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#000000",
        overflow: "hidden"
      }}
    >
      <Card.Title 
        className="text-center mb-3 fw-bold" 
        style={{ 
          color: isDarkMode ? "#ffffff" : "#000000",
          fontSize: isAbove4K ? "1.75rem" : "1rem"
        }}
      >
        Comparação de Impressões por Período
      </Card.Title>
      <div className="w-100" style={{ height: "calc(100% - 60px)" }}>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <Line options={options} data={chartData} />
        )}
      </div>
    </Card>
  );
};

export default GraficoComparativo;
