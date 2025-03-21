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
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { graficoMetrics } from "../data/graficoMetrics";
import { useTheme } from "../context/ThemeContext"; // Importe o useTheme

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
  const { isDarkMode } = useTheme(); // Acesse o estado do tema

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      try {
        const data = await graficoMetrics(startDate, endDate, selectedCampaign);
        setMetrics(data);
      } catch (error) {
        console.error("Erro ao carregar métricas:", error);
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

  // Função que, se o item.label for um dia da semana, retorna-o; senão, retorna a data formatada
  const getXValue = (item) =>
    diasSemana.includes(item.label) ? item.label : formatarData(item.date);

  // --- Lógica para montar os labels e os dados dos datasets ---

  let unionLabels = [];
  let actualData = [];
  let previousData = [];

  if (metrics.actual.length === 7 && metrics.previous.length === 7) {
    // Caso comparativo: usa getXValue (que pode retornar dias da semana ou datas formatadas)
    const actualLabelsComparative = metrics.actual.map(getXValue);
    const previousLabelsComparative = metrics.previous.map(getXValue);

    // Se os dados atuais forem baseados em dias da semana, preserva a ordem conforme os dados
    if (metrics.actual.length > 0 && diasSemana.includes(metrics.actual[0].label)) {
      unionLabels = [...actualLabelsComparative];
      previousLabelsComparative.forEach((label) => {
        if (!unionLabels.includes(label)) {
          unionLabels.push(label);
        }
      });
    } else {
      // Caso sejam datas, une os labels e os ordena cronologicamente
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
    // Caso simples: usa somente a data (item.date) formatada para cada dataset
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

  // Função para calcular tamanhos dinâmicos para pontos e bordas
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
        borderColor: isDarkMode ? "rgb(255, 99, 132)" : "rgb(255, 0, 0)", // Cor da linha (modo escuro ou claro)
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, isDarkMode ? 'rgba(255, 99, 132, 0)' : 'rgba(255, 0, 0, 0)');      
          gradient.addColorStop(0.2, isDarkMode ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 0, 0, 0.2)');  
          gradient.addColorStop(0.4, isDarkMode ? 'rgba(255, 99, 132, 0.4)' : 'rgba(255, 0, 0, 0.4)'); 
          gradient.addColorStop(0.6, isDarkMode ? 'rgba(255, 99, 132, 0.5)' : 'rgba(255, 0, 0, 0.5)');  
          gradient.addColorStop(0.8, isDarkMode ? 'rgba(255, 99, 132, 0.6)' : 'rgba(255, 0, 0, 0.6)');  
          gradient.addColorStop(1, isDarkMode ? 'rgba(255, 99, 132, 0.6)' : 'rgba(255, 0, 0, 0.6)');    
          return gradient;
        },
        borderWidth: borderWidth + 1,
        pointRadius: pointRadius + 1,
        pointBackgroundColor: isDarkMode ? "rgb(255, 99, 132)" : "rgb(255, 0, 0)", // Cor do ponto (modo escuro ou claro)
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
        order: 2
      },
      {
        label: "Veiculação Anterior",
        data: previousData,
        borderColor: isDarkMode ? "rgba(54, 162, 235, 1)" : "rgba(255, 208, 0, 1)", // Cor da linha (modo escuro ou claro)
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, isDarkMode ? 'rgba(54, 162, 235, 0)' : 'rgba(255, 208, 0, 0)');     
          gradient.addColorStop(0.2, isDarkMode ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 208, 0, 0.2)'); 
          gradient.addColorStop(0.4, isDarkMode ? 'rgba(54, 162, 235, 0.4)' : 'rgba(255, 208, 0, 0.4)'); 
          gradient.addColorStop(0.6, isDarkMode ? 'rgba(54, 162, 235, 0.4)' : 'rgba(255, 208, 0, 0.4)'); 
          gradient.addColorStop(0.8, isDarkMode ? 'rgba(54, 162, 235, 0.6)' : 'rgba(255, 208, 0, 0.6)');  
          gradient.addColorStop(1, isDarkMode ? 'rgba(54, 162, 235, 0.7)' : 'rgba(255, 208, 0, 0.7)');   
          return gradient;
        },
        borderWidth: borderWidth + 1,
        pointRadius: pointRadius + 1,
        pointBackgroundColor: isDarkMode ? "rgba(54, 162, 235, 0.8)" : "rgba(255, 208, 0, 0.8)", // Cor do ponto (modo escuro ou claro)
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
        order: 1
      }
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
          color: isDarkMode ? "#ffffff" : "#333", // Cor do texto da legenda (modo escuro ou claro)
          boxWidth: 20,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.7)", // Fundo do tooltip (modo escuro ou claro)
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        displayColors: false,
        bodyColor: isDarkMode ? "#000000" : "#ffffff", // Cor do texto do tooltip (modo escuro ou claro)
        titleColor: isDarkMode ? "#000000" : "#ffffff", // Cor do título do tooltip (modo escuro ou claro)
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: isDarkMode ? "#ffffff" : "#666" }, // Cor dos ticks do eixo X (modo escuro ou claro)
      },
      y: {
        grid: { color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(200, 200, 200, 0.2)" }, // Cor da grade do eixo Y (modo escuro ou claro)
        ticks: {
          font: { size: 12 },
          color: isDarkMode ? "#ffffff" : "#666", // Cor dos ticks do eixo Y (modo escuro ou claro)
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  return (
    <Card
      className="campaign-card p-3 shadow"
      style={{
        height: "500px",
        backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff", // Cor de fundo do card (modo escuro ou claro)
        color: isDarkMode ? "#ffffff" : "#000000", // Cor do texto do card (modo escuro ou claro)
      }}
    >
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