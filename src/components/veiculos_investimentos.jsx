import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { data } from "../data/investimento_veiculos";

const Veiculos_investimentos = () => {
 return (
   <Card className="investment-card">
     <h3 className="card-title">Investimento por veículo</h3>
     {data.map((item, index) => (
       <Row key={index} className="platform-row">
         <Col xs={12} sm={12} md={12} lg={12} className="platform">
           <div className="platform-header">
             <div className="icon">{item.icon}</div>
             <div className="platform-info">
               <strong>{item.platform}</strong>
               <div className="investment" style={{ fontSize: '1.3rem' }}>{item.investment}</div>
              </div>
             <div className="metrics d-flex flex-wrap justify-content-between">
               {Object.entries(item.metrics).map(([key, value]) => (
                   <div key={key} className="metric">
                   <span>{key}</span>
                   <strong>{value}</strong>
                   </div>
               ))}
               </div>
           </div>            
           <div className="progress-bar">
             <div
               className="progress"
               style={{
                 width: `${(index + 1) * 20}%`,
                 backgroundColor: "#ff4027",
               }}
             ></div>
           </div>
         </Col>
       </Row>
     ))}
   </Card>
 );
};

export default Veiculos_investimentos;