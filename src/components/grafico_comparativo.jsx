import React from 'react'
import { Card } from 'react-bootstrap'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data_grafico_comparativo } from '../data/grafico_comparativo';

const GraficoComparativo = () => {
  return (
    <Card className="campaign-card" style={{ height: "400px" }}>
        <Card.Title> Comparação de impressões por período</Card.Title>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data_grafico_comparativo}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#ff0000" strokeWidth={2} />
          <Line type="monotone" dataKey="uv" stroke="#ff9191" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default GraficoComparativo