import React, { useEffect, useRef } from 'react';

const BrazilMap = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Certifique-se de que a biblioteca google charts já foi carregada
    if (window.google) {
      window.google.charts.load('current', {
        packages: ['geochart'],
      });
      window.google.charts.setOnLoadCallback(drawChart);
    } else {
      // Se necessário, crie dinamicamente o script (opcional)
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        window.google.charts.load('current', {
          packages: ['geochart'],
        });
        window.google.charts.setOnLoadCallback(drawChart);
      };
      document.head.appendChild(script);
    }

    function drawChart() {
      const data = window.google.visualization.arrayToDataTable([
        ['Estado', 'Valor'],
        ['Brazil', 200],
      ]);
    
      const options = {
        region: 'BR',
        displayMode: 'regions',
        resolution: 'provinces',
        backgroundColor: 'transparent',
        colorAxis: { colors: ['#e0f7fa', '#006064'] },
        legend: 'none',   // Remove a legenda/barras
        width: '100%',    // Mapa preenche horizontalmente
        height: '100%',   // Mapa preenche verticalmente
      };
    
      const chart = new window.google.visualization.GeoChart(chartRef.current);
      chart.draw(data, options);
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default BrazilMap;
