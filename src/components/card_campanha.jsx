import { useState, useEffect } from "react";
import { fetchCampaigns } from "../data/fetchMetrics";
import { Button, Card } from "react-bootstrap";

const CardCampanha = ({ 
  onDateChange, 
  onCampaignSelect, 
  startDate, 
  endDate, 
  selectedCampaign 
}) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputStartDate, setInputStartDate] = useState(startDate);
  const [inputEndDate, setInputEndDate] = useState(endDate);

  const loadCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCampaigns(startDate, endDate);
      setCampaigns(data);
    } catch (error) {
      setError("Erro ao carregar campanhas. Por favor, tente novamente.");
      console.error("Erro ao carregar campanhas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, [startDate, endDate]);

  const handleRefresh = () => {
    const normalizedStartDate = new Date(inputStartDate + "T00:00:00Z").toISOString().split("T")[0];
    const normalizedEndDate = new Date(inputEndDate + "T00:00:00Z").toISOString().split("T")[0];
    console.log(normalizedStartDate, normalizedEndDate)
    
    onDateChange(normalizedStartDate, normalizedEndDate);
  };

  const handleCampaignSelect = (campaignName) => {
    onCampaignSelect(campaignName === selectedCampaign ? null : campaignName);
  };

  return (
    <Card style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', width: '100%', minHeight: '450px' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Campanhas Ativas</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="date"
            value={inputStartDate}
            onChange={(e) => setInputStartDate(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              height: '38px',
              flex: '1',
              minWidth: '130px'
            }}
          />
          <input
            type="date"
            value={inputEndDate}
            onChange={(e) => setInputEndDate(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              height: '38px',
              flex: '1',
              minWidth: '130px'
            }}
          />
          <Button
            onClick={handleRefresh}
            disabled={loading}
            style={{
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              height: '38px',
              minWidth: '100px'
            }}
          >
            {loading ? "Carregando..." : "Atualizar"}
          </Button>
        </div>
        <br/>
        {error && <p className="error-message">{error}</p>}
        {loading ? <p className="loading-message">Carregando campanhas...</p> : null}
        
        {campaigns.length > 0 ? (
          <div className="campaigns-list">
            {campaigns.map((campaign) => (
              <div 
                key={campaign.Nome_Interno_Campanha}
                className={`campaign-item ${selectedCampaign === campaign.Nome_Interno_Campanha ? 'selected' : ''}`}
                onClick={() => handleCampaignSelect(campaign.Nome_Interno_Campanha)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '8px', 
                  cursor: 'pointer',
                  width: '100%',
                  backgroundColor: selectedCampaign === campaign.Nome_Interno_Campanha ? '#e6f0ff' : 'transparent'
                }}
              >
                <span
                  className="status-dot"
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'green',
                    flexShrink: 0
                  }}
                ></span>
              
                <span className="campaign-name" style={{ flex: 1 }}>
                  {campaign.Nome_Interno_Campanha || 'Sem nome'}
                </span>
              </div>            
            ))}
          </div>
        ) : (
          <p className="no-campaigns-message">Nenhuma campanha ativa encontrada.</p>
        )}
      </div>
    </Card>
  );
};

export default CardCampanha;