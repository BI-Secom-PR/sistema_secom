import { format, subDays} from 'date-fns';

export const graficoMetrics = async (startDate = null, endDate = null, selectedCampaign = null) => {
    try {

      const end = endDate ? endDate : format(new Date(), 'yyyy-MM-dd');
      const start = startDate ? startDate : format(subDays(new Date(), 7), 'yyyy-MM-dd');

      // Construção da URL com ou sem o parâmetro de campanha
      const url = selectedCampaign
        ? `https://api-nest-alpha.vercel.app/plataforma_dia/chart?campaignName=${encodeURIComponent(selectedCampaign)}&startDate=${start}&endDate=${end}`
        : `https://api-nest-alpha.vercel.app/plataforma_dia/chart?startDate=${start}&endDate=${end}`;
  
      const response = await fetch(url);
  
      if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Erro ao buscar métricas do gráfico:', error.message);
      return null;
    }
  ;
}