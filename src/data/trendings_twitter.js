const axios = require('axios');

// Substitua 'YOUR_BEARER_TOKEN' pelo seu token de autenticação
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAIGyyQEAAAAAsurF68AeESRfmHVwxuVoc5%2B6BgA%3DW84wnfEY1nQFgLbINKw0NAn0A0lGmp9OY8KIzrXgawYBEulpT0";

// Função para obter os trending topics de uma determinada localização
async function getTrendingTopics(woeid) {
  const url = `https://api.x.com/1.1/trends/available.json?id=${woeid}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      },
    });

    const trends = response.data[0].trends;
    // Filtra as 3 hashtags mais usadas
    const topThreeHashtags = trends
      .filter(trend => trend.name.startsWith('#'))
      .slice(0, 3);

    console.log(topThreeHashtags);
  } catch (error) {
    console.error('Erro ao buscar trending topics:', error);
  }
}

// Substitua '23424768' pelo WOEID da localização desejada (23424768 é o WOEID do Brasil)
getTrendingTopics(23424768);