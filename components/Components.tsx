import React from 'react';
import { Loader2, AlertTriangle, CheckCircle, BrainCircuit } from 'lucide-react';

export const Badge: React.FC<{ children: React.ReactNode, color: string }> = ({ children, color }) => {
  const colorClasses: Record<string, string> = {
    red: 'bg-red-500/10 text-red-300 border-red-500/20',
    green: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border tracking-wide uppercase ${colorClasses[color] || colorClasses.blue}`}>
      {children}
    </span>
  );
};

export const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  let colorClass = 'text-red-500';
  let strokeColor = '#ef4444';
  let label = 'Em Risco';
  
  if (score >= 40) { 
    colorClass = 'text-amber-500'; 
    strokeColor = '#f59e0b';
    label = 'Adaptação'; 
  }
  if (score >= 75) { 
    colorClass = 'text-emerald-500'; 
    strokeColor = '#10b981';
    label = 'Resiliente'; 
  }

  // Circumference for SVG circle
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-2xl border border-gray-800 shadow-inner">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90 drop-shadow-lg">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#1f2937" 
            strokeWidth="10"
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeColor}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-5xl font-bold tracking-tighter ${colorClass}`}>{score}</span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Sobrevivência</span>
        </div>
      </div>
      <span className={`mt-3 text-lg font-bold ${colorClass} bg-gray-950 px-4 py-1 rounded-full border border-gray-800`}>{label}</span>
    </div>
  );
};

export const SectionTitle: React.FC<{ icon: React.ReactNode, title: string, subtitle?: string }> = ({ icon, title, subtitle }) => (
  <div className="mb-6">
    <h3 className="flex items-center gap-3 text-xl font-bold text-gray-100">
      <span className="p-2 bg-gray-800 rounded-lg text-cyan-400 border border-gray-700 shadow-sm">{icon}</span>
      {title}
    </h3>
    {subtitle && <p className="text-gray-400 text-sm mt-1 ml-11">{subtitle}</p>}
  </div>
);

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-80 text-center animate-fade-in bg-gray-900 rounded-2xl border border-gray-800 p-8">
    <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-cyan-500 rounded-full animate-spin mb-6"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-cyan-500 animate-pulse" />
        </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">Processando Análise</h3>
    <p className="text-gray-400 max-w-md mx-auto">Nossos modelos estão avaliando o impacto da IA nas competências desta profissão...</p>
  </div>
);

export const ErrorState = ({ message, onRetry }: { message: string, onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center h-80 text-center bg-gray-900 rounded-2xl border border-red-900/30 p-8">
    <div className="p-4 bg-red-900/20 rounded-full mb-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">Não foi possível completar a análise</h3>
    <p className="text-gray-400 mb-8 max-w-md">{message}</p>
    <button 
      onClick={onRetry}
      className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-semibold shadow-lg hover:shadow-red-900/20"
    >
      Tentar Novamente
    </button>
  </div>
);