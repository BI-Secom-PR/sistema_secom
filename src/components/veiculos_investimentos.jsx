import React from "react";
import { Card } from "react-bootstrap";
import { data } from "../data/investimento_veiculos";

const Veiculos_investimentos = () => {  

  return (
    <Card className="investment-card">
      <h3 className="card-title">Investimento por veículo</h3>
      {data.map((item, index) => (
        <div key={index} className="platform-row">
          <div className="platform-header">
            <div className="icon">{item.icon}</div>
            <div className="platform-info">
              <strong>{item.platform}</strong>
              <div className="investment">{item.investment}</div>
            </div>
          </div>
          <div className="metrics-row">
            {Object.entries(item.metrics).map(([key, value]) => (
              <div key={key} className="metric">
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(index + 1) * 20}%`, backgroundColor: "#DB4437" }}></div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default Veiculos_investimentos;
