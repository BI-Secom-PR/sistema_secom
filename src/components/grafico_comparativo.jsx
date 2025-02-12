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

  // Função para formatar a data no formato "DD-MM-YYYY" utilizando métodos UTC para evitar problemas de fuso horário
  const formatarData = (data) => {
    const dateObj = new Date(data);
    const dia = String(dateObj.getUTCDate()).padStart(2, "0");
    const mes = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const ano = dateObj.getUTCFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  // Para os dados atuais: se o label for dia da semana, usa-o; caso contrário, usa a data formatada
  const getXValueActual = (item) => {
    if (diasSemana.includes(item.label)) {
      return item.label;
    }
    return formatarData(item.date);
  };

  // Para os dados anteriores: mesma lógica (sem aplicar deslocamento)
  const getXValuePrevious = (item) => {
    if (diasSemana.includes(item.label)) {
      return item.label;
    }
    return formatarData(item.date);
  };

  // Mapeia os labels de cada série
  const actualLabels = metrics.actual.map(getXValueActual);
  const previousLabels = metrics.previous.map(getXValuePrevious);

  let unionLabels = [];
  // Se o primeiro item dos dados atuais usar dia da semana, assume-se que são dados semanais
  if (metrics.actual.length > 0 && diasSemana.includes(metrics.actual[0].label)) {
    // Preserva a ordem conforme os dados atuais e acrescenta eventuais labels dos dados anteriores que não estejam na lista
    unionLabels = [...actualLabels];
    previousLabels.forEach((label) => {
      if (!unionLabels.includes(label)) {
        unionLabels.push(label);
      }
    });
  } else {
    // Caso sejam datas, cria a união dos labels e os ordena cronologicamente
    const labelsSet = new Set([...actualLabels, ...previousLabels]);
    unionLabels = Array.from(labelsSet);
    unionLabels.sort((a, b) => {
      const [diaA, mesA, anoA] = a.split("-").map(Number);
      const [diaB, mesB, anoB] = b.split("-").map(Number);
      const dateA = new Date(anoA, mesA - 1, diaA);
      const dateB = new Date(anoB, mesB - 1, diaB);
      return dateA - dateB;
    });
  }

  // Para cada label unificado, mapeia os valores de impressões correspondentes (se houver)
  const actualData = unionLabels.map((label) => {
    const item = metrics.actual.find((item) => getXValueActual(item) === label);
    return item ? item.impressions : null;
  });

  const previousData = unionLabels.map((label) => {
    const item = metrics.previous.find((item) => getXValuePrevious(item) === label);
    return item ? item.impressions : null;
  });

  const chartData = {
    labels: unionLabels,
    datasets: [
      {
        label: "Veiculação Atual",
        data: actualData,
        borderColor: "#ff8800", // Vermelho forte
        backgroundColor: "rgba(220, 126, 38, 0.2)",
        borderWidth: 4,
        pointRadius: 4,
        pointBackgroundColor: "#ff7300",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Veiculação Anterior",
        data: previousData,
        borderColor: "rgba(53, 162, 235, 0.8)", // Azul moderno
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderWidth: 3,
        pointRadius: 4,
        borderDash: [5, 5],
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