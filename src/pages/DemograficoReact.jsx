import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from "../context/ThemeContext";
import './DemograficoReact.css';
import BrazilMap from '../components/MapaBrasil';  // ajuste o caminho se necessário

// Dados fictícios
const genderData = [
  { name: 'Feminino', value: 2817, percent: 46.92, color: '#F2B191' },
  { name: 'Masculino', value: 3167, percent: 52.75, color: '#2E6B62' },
  { name: 'Outro', value: 8, percent: 0.13, color: '#8E8E8E' }
];

const regionData = [
  { name: 'Sudeste', value: 38.5, color: '#5D4777' },
  { name: 'Nordeste', value: 28.8, color: '#7D6C9C' },
  { name: 'Sul', value: 14.8, color: '#9B90B7' },
  { name: 'Centro-Oeste', value: 9.2, color: '#B9B0D1' },
  { name: 'Norte', value: 8.8, color: '#D7D1E4' }
];

const ageData = [
  { age: '18-24', fem: 1123, masc: 1099 },
  { age: '25-34', fem: 610, masc: 724 },
  { age: '35-44', fem: 357, masc: 493 },
  { age: '45-54', fem: 272, masc: 370 },
  { age: '55+', fem: 455, masc: 480 }
];

const cpmData = [
  { estado: 'Distrito Federal', valor: 4.49, color: '#E74C3C' },
  { estado: 'Tocantins', valor: 3.84, color: '#7FBA00' },
  { estado: 'Goias', valor: 3.79, color: '#7FBA00' },
  { estado: 'Minas Gerais', valor: 3.79, color: '#7FBA00' },
  { estado: 'Mato Grosso', valor: 3.78, color: '#7FBA00' }
];

const menoresCPMData = [
  { estado: 'Amapa', valor: 3.32, color: '#7FBA00' },
  { estado: 'Acre', valor: 3.39, color: '#7FBA00' },
  { estado: 'Amazonas', valor: 3.47, color: '#7FBA00' },
  { estado: 'Rio Grande do Sul', valor: 3.51, color: '#7FBA00' },
  { estado: 'Para', valor: 3.57, color: '#7FBA00' },
  { estado: 'Pernambuco', valor: 3.58, color: '#7FBA00' }
];

const cpcData = [
  { estado: 'Distrito Federal', valor: 1.03 },
  { estado: 'Tocantins', valor: 0.88 },
  { estado: 'Mato Grosso', valor: 0.84 },
  { estado: 'Maranhao', valor: 0.82 },
  { estado: 'Goias', valor: 0.80 }
];

const cpeData = [
  { region: 'Mato Grosso', valor: 0.32 },
  { region: 'Distrito Federal', valor: 0.31 },
  { region: 'Tocantins', valor: 0.30 },
  { region: 'Goias', valor: 0.27 },
  { region: 'Mato Grosso do Sul', valor: 0.25 }
];

const ctrData = [
  { estado: 'Distrito Federal', valor: 0.43 },
  { estado: 'Tocantins', valor: 0.44 },
  { estado: 'Mato Grosso', valor: 0.45 },
  { estado: 'Maranhao', valor: 0.46 },
  { estado: 'Goias', valor: 0.48 }
];

const engagementData = [
  { estado: 'Mato Grosso', valor: 1.18 },
  { estado: 'Tocantins', valor: 1.29 },
  { estado: 'Goias', valor: 1.40 },
  { estado: 'Distrito Federal', valor: 1.43 },
  { estado: 'Mato Grosso do Sul', valor: 1.46 }
];

// Componente Header com logo e título
const Header = () => {
  return (
    <div className="header">
      <div className="header-title">Núcleo SPP Digital</div>
    </div>
  );
};

// Componente de Filtro Lateral com estados controlados
const SideFilters = () => {
  const [campaign, setCampaign] = useState('Tudo');
  const [purchaseType, setPurchaseType] = useState('Tudo');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-04-01');
  const [platform, setPlatform] = useState('Tudo');
  const [region, setRegion] = useState('Tudo');

  return (
    <div className="side-filters">
      <h2>Campanhas</h2>
      <div className="filter-select-container">
        <select className="filter-select" value={campaign} onChange={(e) => setCampaign(e.target.value)}>
          <option value="Tudo">Tudo</option>
          <option value="Campanha 1">Campanha 1</option>
          <option value="Campanha 2">Campanha 2</option>
          <option value="Campanha 3">Campanha 3</option>
        </select>
      </div>

      <h2>Tipo de Compra</h2>
      <div className="filter-select-container">
        <select className="filter-select" value={purchaseType} onChange={(e) => setPurchaseType(e.target.value)}>
          <option value="Tudo">Tudo</option>
          <option value="CPC">CPC</option>
          <option value="CPE">CPE</option>
          <option value="CPM">CPM</option>
          <option value="CPV">CPV</option>
        </select>
      </div>

      <h2>Data</h2>
      <div className="date-filters">
        <div className="date-input-container">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="date-input-container">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      <h2>Plataforma</h2>
      <div className="filter-select-container">
        <select className="filter-select" value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="Tudo">Tudo</option>
          <option value="Facebook">Facebook</option>
          <option value="Google">Google</option>
          <option value="Instagram">Instagram</option>
        </select>
      </div>

      <h2>Regiões</h2>
      <div className="filter-select-container">
        <select className="filter-select" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="Tudo">Tudo</option>
          <option value="Norte">Norte</option>
          <option value="Nordeste">Nordeste</option>
          <option value="Centro-Oeste">Centro-Oeste</option>
          <option value="Sudeste">Sudeste</option>
          <option value="Sul">Sul</option>
        </select>
      </div>
    </div>
  );
};

// Card de Impressões por Gênero
const GenderImpressions = () => {
  return (
    <div className="dashboard-card">
      <h2 className="card-title">Impressões por gênero</h2>
      <div className="gender-content">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={genderData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              dataKey="value"
            >
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}M`]} />
          </PieChart>
        </ResponsiveContainer>

        <div className="gender-icons">
          <div className="gender-icon-container">
            <div className="gender-icon female">👩</div>
            <div className="gender-label">
              <div>Feminino</div>
              <div className="gender-line female"></div>
            </div>
          </div>
          <div className="gender-icon-container">
            <div className="gender-icon male">👨</div>
            <div className="gender-label">
              <div>Masculino</div>
              <div className="gender-line male"></div>
            </div>
          </div>
        </div>

        <div className="gender-stats">
          <div className="gender-stat">
            <span>{genderData[0].value}M</span>
            <span>({genderData[0].percent}%)</span>
          </div>
          <div className="gender-stat right">
            <span>{genderData[1].value}M</span>
            <span>({genderData[1].percent}%)</span>
          </div>
        </div>

        <div className="gender-other">
          <span>{genderData[2].value}M ({genderData[2].percent}%)</span>
        </div>
      </div>
    </div>
  );
};

// Card de Distribuição Etária
const AgeDistribution = () => {
  return (
    <div className="dashboard-card">
      <h2 className="card-title">Distribuição Etária</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          layout="vertical"
          data={ageData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis dataKey="age" type="category" width={40} />
          <Tooltip 
            formatter={(value) => [`${value}M`]}
            labelFormatter={(value) => `Faixa etária: ${value}`}
          />
          <Bar dataKey="fem" fill="#F2B191" barSize={20} name="Feminino" />
          <Bar dataKey="masc" fill="#2E6B62" barSize={20} name="Masculino" />
        </BarChart>
      </ResponsiveContainer>

      <div className="age-bars">
        {ageData.map((group) => (
          <div key={group.age} className="age-bar-row">
            <div className="age-label">{group.age}</div>
            <div className="age-bar-container">
              <div 
                className="age-bar female" 
                style={{ width: `${(group.fem / 1200) * 100}%` }}
              >
                {group.fem}M
              </div>
              <div 
                className="age-bar male" 
                style={{ width: `${(group.masc / 1200) * 100}%` }}
              >
                {group.masc}M
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GeographicImpressions = () => {
    return (
      <div className="dashboard-card">
        <h2 className="card-title">Impressões geográficas</h2>
        <div className="geographic-chart">
          <div className="map-container">
            <BrazilMap />
          </div>
          <div className="bar-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={regionData}
                margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, 'dataMax']} 
                  tickFormatter={(value) => `${value}%`} 
                />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}%`]} />
                <Bar dataKey="value" background={{ fill: '#eee' }}>
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };


// Componente de Tabela – com possibilidade de classe extra
const MetricsTable = ({ title, data, valueLabel, valueColor, extraClass }) => {
  return (
    <div className={`dashboard-card metrics-table ${extraClass ? extraClass : ''}`}>
      <h2 className="card-title">{title}</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="left-align">Estado</th>
              <th className="right-align">{valueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="left-align">{item.estado || item.region}</td>
                <td 
                  className="right-align" 
                  style={{ color: item.color || valueColor }}
                >
                  {valueLabel === 'CTR' || title.includes('Tx.') ? 
                    `${item.valor}%` : 
                    `R$ ${item.valor.toFixed(2)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente principal da página
function DemograficoReact() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`demografico-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header />
      <div className="dashboard-content">
        <SideFilters />
        <div className="dashboard-main">
          <div className="dashboard-grid">
            <GenderImpressions />
            <GeographicImpressions />
            <AgeDistribution />
          </div>
          <div className="metrics-grid">
            <MetricsTable 
              title="Maiores CPM" 
              data={cpmData} 
              valueLabel="CPM" 
              valueColor="#1E88E5"
              extraClass="small-card grid-item-a"
            />
            <MetricsTable 
              title="CPC" 
              data={cpcData} 
              valueLabel="CPC" 
              valueColor="#1E88E5"
              extraClass="grid-item-b"
            />
            <MetricsTable 
              title="CPE" 
              data={cpeData} 
              valueLabel="CPE" 
              valueColor="#1E88E5"
              extraClass="grid-item-c"
            />
            <MetricsTable 
              title="Tx. Engajamento" 
              data={engagementData} 
              valueLabel="Tx.Eng." 
              valueColor="#4CAF50"
              extraClass="grid-item-d"
            />
            <MetricsTable 
              title="Menores CPM" 
              data={menoresCPMData} 
              valueLabel="CPM" 
              valueColor="#7FBA00"
              extraClass="grid-item-e"
            />
            <MetricsTable 
              title="CTR" 
              data={ctrData} 
              valueLabel="CTR" 
              valueColor="#FF7043"
              extraClass="grid-item-f"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemograficoReact;
