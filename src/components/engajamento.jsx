import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { ThumbsUp, MessageCircle, Eye } from 'lucide-react';
import { fetchPlatformEngagement } from '../data/fetchMetrics'; // Supondo que sua função esteja em um arquivo utils

const Engajamento = () => {
  // Inicializando o estado com valores padrão
  const [engagementData, setEngagementData] = useState({
    likes: 0,
    comments: 0,
    views: 0,
  });

  useEffect(() => {
    // Função que busca os dados de engajamento
    const fetchEngagement = async () => {
      const data = await fetchPlatformEngagement(); // Ou passe as datas/campanha, se necessário
      if (data) {
        // Somando os dados de todas as campanhas
        const totalLikes = data.reduce((acc, item) => acc + item.likes, 0);
        const totalComments = data.reduce((acc, item) => acc + item.comment, 0);
        const totalViews = data.reduce((acc, item) => acc + item.views, 0);
        
        setEngagementData({
          likes: totalLikes,
          comments: totalComments,
          views: totalViews,
        });
      }
    };

    fetchEngagement();
  }, []);

  return (
    <Card className="campaign-card h-100">
      <h2 className="h5 mb-4">Engajamento (Semanal)</h2>
      <div className="d-flex flex-column gap-5">
        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <ThumbsUp size={20} />
            <span>Curtidas</span>
          </div>
          <span className="fs-6 fw-semibold">{engagementData.likes.toLocaleString()}</span>
        </div>

        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <MessageCircle size={20} />
            <span>Comentários</span>
          </div>
          <span className="fs-6 fw-semibold">{engagementData.comments.toLocaleString()}</span>
        </div>

        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Eye size={20} />
            <span>Visualizações</span>
          </div>
          <span className="fs-6 fw-semibold">{engagementData.views.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default Engajamento;