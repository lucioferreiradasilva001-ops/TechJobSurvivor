import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { SkillMetric, RiskFactor } from '../types';

interface SkillRadarProps {
  data: SkillMetric[];
}

// Custom Tick Component to handle text wrapping on small screens
const CustomTick = ({ payload, x, y, textAnchor, stroke, radius }: any) => {
  const words = payload.value.split(' ');
  const shouldWrap = payload.value.length > 12 && words.length > 1;
  
  return (
    <g className="recharts-layer recharts-polar-angle-axis-tick">
      <text
        radius={radius}
        stroke={stroke}
        x={x}
        y={y}
        className="recharts-text recharts-polar-angle-axis-tick-value"
        textAnchor={textAnchor}
      >
        {shouldWrap ? (
          <>
            <tspan x={x} dy="-0.5em" fontSize={10} fontWeight={500} fill="#9ca3af">
              {words.slice(0, Math.ceil(words.length / 2)).join(' ')}
            </tspan>
            <tspan x={x} dy="1.2em" fontSize={10} fontWeight={500} fill="#9ca3af">
              {words.slice(Math.ceil(words.length / 2)).join(' ')}
            </tspan>
          </>
        ) : (
          <tspan x={x} dy="0.3em" fontSize={11} fontWeight={500} fill="#9ca3af">
            {payload.value}
          </tspan>
        )}
      </text>
    </g>
  );
};

export const SkillRadar: React.FC<SkillRadarProps> = ({ data }) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="#374151" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="name" 
            tick={(props) => <CustomTick {...props} />}
          />
          <Radar
            name="Habilidades"
            dataKey="value"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="#8b5cf6"
            fillOpacity={0.2}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#f3f4f6' }}
            itemStyle={{ color: '#c4b5fd' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface RiskBarChartProps {
  data: RiskFactor[];
}

export const RiskBarChart: React.FC<RiskBarChartProps> = ({ data }) => {
  const chartData = data.map(d => ({
    name: d.factor,
    value: d.severity === 'high' ? 90 : d.severity === 'medium' ? 60 : 30,
    severity: d.severity,
    original: d
  }));

  const getColor = (severity: string) => {
    if (severity === 'high') return '#ef4444'; // Red-500
    if (severity === 'medium') return '#f59e0b'; // Amber-500
    return '#10b981'; // Emerald-500
  };

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 5, right: 30 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fill: '#e5e7eb', fontSize: 13, fontWeight: 500 }} 
            width={120}
          />
          <Tooltip 
            cursor={{fill: 'rgba(255,255,255,0.03)'}}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl max-w-xs z-50">
                    <p className="font-bold text-white mb-1">{data.name}</p>
                    <p className="text-xs text-gray-300 mb-2">{data.original.description}</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                      data.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                      data.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      Risco {data.severity === 'high' ? 'Alto' : data.severity === 'medium' ? 'Médio' : 'Baixo'}
                    </span>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.severity)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};