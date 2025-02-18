import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { ThumbsUp, MessageCircle, Eye } from 'lucide-react';
import { fetchPlatformEngagement } from '../data/fetchMetrics';

const formatNumber = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
};

const Engajamento = ({ startDate, endDate, selectedCampaign }) => {
  const [engagementData, setEngagementData] = useState({
    likes: 0,
    comments: 0,
    views: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEngagement = async () => {
      setLoading(true);
      try {
        const data = await fetchPlatformEngagement(startDate, endDate, selectedCampaign);
        if (data) {
          const totalLikes = data.reduce((acc, item) => acc + item.likes, 0);
          const totalComments = data.reduce((acc, item) => acc + item.comment, 0);
          const totalViews = data.reduce((acc, item) => acc + item.views, 0);
          
          setEngagementData({
            likes: totalLikes,
            comments: totalComments,
            views: totalViews,
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEngagement();
  }, [startDate, endDate, selectedCampaign]);

  const EngagementItem = ({ icon: Icon, color, value, background }) => (
    <div 
      className="rounded d-flex justify-content-between align-items-center p-4"
      style={{
        minHeight: '90px',
        background,
        borderLeft: `4px solid ${color}`
      }}
    >
      <div className="d-flex align-items-center" style={{ gap: '1rem' }}>
        <Icon size={32} color={color} />
        {loading ? (
          <Spinner animation="border" variant="primary" size="sm" />
        ) : (
          <span className="fs-4 fw-bold" style={{ color: '#000000' }}>
            {typeof value === 'number' ? formatNumber(value) : value.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Card className="campaign-card h-100 p-4">
      <h2 className="h4 mb-5 text-dark fw-bold">Engajamento</h2>
      {selectedCampaign && <h3 className="text-dark mb-4">Campanha: {selectedCampaign}</h3>}
      <div className="d-flex flex-column gap-5">
        <EngagementItem 
          icon={ThumbsUp}
          color="#183EFF"
          value={engagementData.likes}
          background="linear-gradient(145deg, #ffffff 0%, #f0f7ff 100%)"
        />
        <EngagementItem 
          icon={MessageCircle}
          color="#00D000"
          value={engagementData.comments}
          background="linear-gradient(145deg, #ffffff 0%, #f0fff4 100%)"
        />
        <EngagementItem 
          icon={Eye}
          color="#FFD000"
          value={engagementData.views}
          background="linear-gradient(145deg, #ffffff 0%, #fffdf3 100%)"
        />
      </div>
    </Card>
  );
};

export default Engajamento;