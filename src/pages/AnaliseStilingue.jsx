import React from 'react';

const Stilingue = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Meses começam em 0
  const day = String(today.getDate()).padStart(2, "0");

  const dateRange = `${year}${month}${day}0000:${year}${month}${day}2359`;

  const dashboardUrl = `https://studio.stilingue.com.br/6048375534911488/5539833958760448/dashboard?public=1&date_range=${dateRange}&dashboard=kZjChclZ9WpwzDbZxQhB`;

  return (
    <iframe 
      title="Análise Demográfica" 
      width="100%" 
      height="1060" 
      src={dashboardUrl} 
      frameBorder="0" 
      allowFullScreen>
    </iframe>
  );
}

export default Stilingue;
