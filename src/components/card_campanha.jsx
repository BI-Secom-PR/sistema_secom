import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { campaigns } from '../data/campaigns';

const Card_campanha = () => {
 const [selectedCampaigns, setSelectedCampaigns] = useState([]);
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');

 const toggleCampaignSelection = (id) => {
   setSelectedCampaigns((prevSelected) =>
     prevSelected.includes(id)
       ? prevSelected.filter((campaignId) => campaignId !== id)
       : [...prevSelected, id]
   );
 };

 return (
   <Card className="campaign-card">
     <Card.Body>
       <h3 className="campaign-title">Campanhas Secom</h3>

       <div className="status-legend d-flex flex-wrap gap-3 mb-3">
         <span className="d-flex align-items-center">
           <span className="dot active"></span> Ativas
         </span>
         <span className="d-flex align-items-center">
           <span className="dot paused"></span> Pausada/Cancelada
         </span>
         <span className="d-flex align-items-center">
           <span className="dot concluded"></span> Concluída
         </span>
       </div>

       <div className="date-filter">
         <div className="date-inputs" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <input
             type="date"
             value={startDate}
             onChange={(e) => setStartDate(e.target.value)}
             className="date-input"
           />
           <span className="date-separator">até</span>
           <input
             type="date"
             value={endDate}
             onChange={(e) => setEndDate(e.target.value)}
             className="date-input"
           />
           <Button variant="success" className="apply-filter" style={{ marginLeft: '2rem' }}>
             Aplicar
           </Button>
         </div>
       </div>

       <div className="campaigns-list">
         {campaigns.map((campaign) => (
           <div
             key={campaign.id}
             className={`campaign-item ${
               selectedCampaigns.includes(campaign.id) ? 'selected' : ''
             } d-flex flex-wrap justify-content-between align-items-center p-2`}
             onClick={() => toggleCampaignSelection(campaign.id)}
           >
             <div className="campaign-info d-flex align-items-center gap-2">
               <span className={`dot ${campaign.status}`}></span>
               <span className="campaign-name text-break">{campaign.name}</span>
             </div>
             <img
               src={campaign.image}
               alt={campaign.name}
               className="campaign-image img-fluid"
               style={{ 
                 width: '110px', 
                 height: '70px',
                 maxWidth: '100%',
                 objectFit: 'cover' 
               }}
             />
           </div>
         ))}
       </div>
     </Card.Body>
   </Card>
 );
};

export default Card_campanha;