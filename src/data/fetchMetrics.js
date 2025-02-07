// src/utils/api.js
import { format, subDays, differenceInDays, parseISO } from 'date-fns';
import campaigns from '../data/campaigns';

const calculateSums = (data) => {
  return data.reduce(
    (acc, item) => {
      acc.investment += item.spend || 0;
      acc.impressions += item.impressions || 0;
      acc.views += item['video_view_25%'] || 0;
      acc.clicks += item.clicks || 0;
      acc.engagement += item.engagement || 0;
      return acc;
    },
    { investment: 0, impressions: 0, views: 0, clicks: 0, engagement: 0 }
  );
};

export const fetchMetrics = async (metricCards, startDate = null, endDate = null, selectedCampaign = null) => {
  try {
    // Define as datas formatadas corretamente
    const end = endDate ? endDate : format(new Date(), 'yyyy-MM-dd');
    const start = startDate ? startDate : format(subDays(new Date(), 7), 'yyyy-MM-dd');

    // Calcula o período em dias
    const periodDays = differenceInDays(new Date(end), new Date(start));

    // Construção da URL para a requisição atual
    const url = selectedCampaign 
      ? `https://api-nest-alpha.vercel.app/campaigns?campaignName=${encodeURIComponent(selectedCampaign)}&startDate=${start}&endDate=${end}`
      : `https://api-nest-alpha.vercel.app/campaigns?startDate=${start}&endDate=${end}`;

    const responseCurrent = await fetch(url);
    if (!responseCurrent.ok) throw new Error(`Erro na requisição atual: ${responseCurrent.statusText}`);
    const dataCurrent = await responseCurrent.json();
    const sumsCurrent = calculateSums(dataCurrent);

    // Definição correta do período anterior
    const endDatePrevious = format(subDays(parseISO(start), 1), 'yyyy-MM-dd');
    const startDatePrevious = format(subDays(parseISO(endDatePrevious), periodDays), 'yyyy-MM-dd');

    // Construção da URL para a requisição do período anterior
    const url_previous = selectedCampaign 
      ? `https://api-nest-alpha.vercel.app/campaigns?campaignName=${encodeURIComponent(selectedCampaign)}&startDate=${startDatePrevious}&endDate=${endDatePrevious}`
      : `https://api-nest-alpha.vercel.app/campaigns?startDate=${startDatePrevious}&endDate=${endDatePrevious}`;

    const responsePrevious = await fetch(url_previous);
    if (!responsePrevious.ok) throw new Error(`Erro na requisição anterior: ${responsePrevious.statusText}`);
    const dataPrevious = await responsePrevious.json();
    const sumsPrevious = calculateSums(dataPrevious);

    // Mapeia os dados para os cards
    const updatedMetrics = metricCards.map((card) => ({
      ...card,
      currentValue: sumsCurrent[card.type] || 0,
      previousValue: sumsPrevious[card.type] || 0,
    }));

    return updatedMetrics;
  } catch (error) {
    console.error('Erro ao buscar métricas:', error.message);
    return [];
  }
};

export const fetchCampaigns = async (startDate = null, endDate = null) => {
  try {
    const end = endDate ? endDate : format(new Date(), 'yyyy-MM-dd');
    const start = startDate ? startDate : format(subDays(new Date(), 7), 'yyyy-MM-dd');

    const response = await fetch(
      `https://api-nest-alpha.vercel.app/campaigns?startDate=${start}&endDate=${end}`
    );
    
    if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
    
    const data = await response.json();
    
    // Filtrando campanhas com pelo menos uma impressão ou investimento
    const validCampaigns = data.filter(c => (c.impressions > 1 || c.spend > 1));
    
    // Populando o array de campanhas
    campaigns.length = 0;
    campaigns.push(...validCampaigns);
    
    return validCampaigns;
  } catch (error) {
    console.error('Erro ao buscar campanhas:', error.message);
    throw error; // Relançando o erro para ser tratado no componente
  }
};

export const fetchCampaignMetrics = async (metricCards, campaignName, startDate, endDate) => {
    try {
      const url = `https://api-nest-alpha.vercel.app/campaigns?campaignName=${encodeURIComponent(campaignName)}&startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
  
      if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
  
      const data = await response.json();
      const validCampaigns = data.filter(c => (c.impressions > 1 || c.spend > 1));
      
      const sumsCurrent = calculateSums(validCampaigns);

        const updatedMetrics = [...metricCards].map((card) => ({
        ...card,
        currentValue: sumsCurrent[card.type] || 0,
        }));

        return updatedMetrics;
    } catch (error) {
      console.error("Erro ao buscar métricas da campanha:", error.message);
      return [];
    }
  };

  export const fetchPlatformMetrics = async (startDate = null, endDate = null, selectedCampaign = null) => {
    try {
      const end = endDate ? endDate : format(new Date(), 'yyyy-MM-dd');
      const start = startDate ? startDate : format(subDays(new Date(), 7), 'yyyy-MM-dd');
  
      // Construção da URL com ou sem o parâmetro de campanha
      const url = selectedCampaign
        ? `https://api-nest-alpha.vercel.app/platform?campaignName=${encodeURIComponent(selectedCampaign)}&startDate=${start}&endDate=${end}`
        : `https://api-nest-alpha.vercel.app/platform?startDate=${start}&endDate=${end}`;
  
      const response = await fetch(url);
  
      if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Erro ao buscar métricas da plataforma:', error.message);
      return null;
    }
  };


  export const fetchPlatformEngagement = async (startDate = null, endDate = null, selectedCampaign = null) => {
    try {
      const end = endDate ? endDate : format(new Date(), 'yyyy-MM-dd');
      const start = startDate ? startDate : format(subDays(new Date(), 7), 'yyyy-MM-dd');
  
      // Construção da URL com ou sem o parâmetro de campanha
      const url = selectedCampaign
        ? `https://api-nest-alpha.vercel.app/platform/meta/engagement?campaignName=${encodeURIComponent(selectedCampaign)}&startDate=${start}&endDate=${end}`
        : `https://api-nest-alpha.vercel.app/platform/meta/engagement?startDate=${start}&endDate=${end}`;
  
      const response = await fetch(url);
  
      if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Erro ao buscar métricas da plataforma:', error.message);
      return null;
    }
  };