import React, { useState, useCallback } from 'react';
import { 
  Search, 
  Terminal, 
  Cpu, 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  AlertOctagon, 
  Code,
  Users,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  BrainCircuit,
  Menu,
  X,
  Target,
  ChevronRight
} from 'lucide-react';
import { analyzeJobRole } from './services/geminiService';
import { AnalysisStatus, JobAnalysis } from './types';
import { SkillRadar, RiskBarChart } from './components/AnalysisCharts';
import { 
  Card, 
  ScoreCircle, 
  SectionTitle, 
  Badge, 
  LoadingState, 
  ErrorState 
} from './components/Components';

// Common presets for quick access translated to PT-BR
const PRESETS = [
  "Desenvolvedor Frontend",
  "Designer UX/UI",
  "Cientista de Dados",
  "Engenheiro DevOps",
  "Gerente de Produto",
  "Analista de QA"
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleAnalysis = useCallback(async (role: string) => {
    if (!role.trim()) return;
    
    setStatus(AnalysisStatus.LOADING);
    setAnalysis(null);
    setError(null);

    try {
      const result = await analyzeJobRole(role);
      setAnalysis(result);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "Falha ao analisar a profissão. Tente novamente.");
      setStatus(AnalysisStatus.ERROR);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAnalysis(searchTerm);
  };

  const resetApp = () => {
    setSearchTerm('');
    setAnalysis(null);
    setStatus(AnalysisStatus.IDLE);
    setError(null);
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-gray-200">
      
      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setShowAbout(false)}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowAbout(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Cpu className="text-cyan-500" /> Sobre o TechSurvivor.ai
            </h2>
            <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
              <p>
                O <strong>TechSurvivor.ai</strong> é uma ferramenta experimental projetada para ajudar profissionais de tecnologia a navegarem pela revolução da Inteligência Artificial.
              </p>
              <p>
                Utilizamos modelos avançados de IA (Google Gemini 2.5) para analisar tendências de mercado, relatórios de automação e mudanças nas competências exigidas.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="font-semibold text-white mb-3 text-base">Nossa Metodologia de Análise</h3>
                <ul className="space-y-2 text-base">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    Análise de tarefas repetitivas vs. criativas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    Avaliação de "Human Moat" (barreiras contra automação)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    Previsão de impacto salarial (Oferta x Demanda)
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-500 mt-4 border-t border-gray-800 pt-4">
                Nota: As previsões são estimativas baseadas em dados atuais e não constituem aconselhamento financeiro ou de carreira definitivo.
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setShowAbout(false)}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-semibold"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        
        {/* Navigation / Header */}
        <nav className="flex items-center justify-between py-6 mb-8 border-b border-gray-800/50">
           <div 
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={resetApp}
          >
            <div className="p-2.5 bg-gray-800 rounded-xl border border-gray-700 group-hover:border-cyan-500/50 transition-all duration-300">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                TechSurvivor<span className="text-cyan-500">.ai</span>
              </h1>
            </div>
          </div>

          <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Menu className="w-7 h-7" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden z-50">
                  <div className="p-2">
                    <button 
                      onClick={() => { resetApp(); setIsMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg hover:text-white transition-colors flex items-center gap-3 font-medium"
                    >
                      <Search className="w-4 h-4 text-cyan-400" /> Nova Análise
                    </button>
                    <button 
                      onClick={toggleAbout}
                      className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg hover:text-white transition-colors flex items-center gap-3 font-medium"
                    >
                      <Briefcase className="w-4 h-4 text-purple-400" /> Metodologia
                    </button>
                  </div>
                </div>
              )}
            </div>
        </nav>

        {/* Content Body */}
        <main>
          {status === AnalysisStatus.IDLE && (
            <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in relative">
              
              <div className="text-center space-y-6 max-w-3xl mx-auto z-10">
                <Badge color="blue">Beta Público</Badge>
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight text-balance">
                  Sua carreira está <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">preparada para o futuro?</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
                  A IA está transformando o mercado de tecnologia. Descubra quais habilidades tornam você insubstituível e onde estão os riscos.
                </p>

                <div className="pt-8 w-full max-w-2xl mx-auto">
                  <form onSubmit={handleSearchSubmit} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative flex items-center bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden p-2">
                      <Search className="h-6 w-6 text-gray-500 ml-4" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Ex: Desenvolvedor React, Product Manager..."
                        className="block w-full px-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                        autoFocus
                      />
                      <button 
                        type="submit"
                        className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors shadow-lg"
                        disabled={!searchTerm.trim()}
                      >
                        Analisar
                      </button>
                    </div>
                  </form>
                </div>

                <div className="pt-12">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">Buscas Frequentes</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {PRESETS.map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setSearchTerm(role);
                          handleAnalysis(role);
                        }}
                        className="px-5 py-2.5 rounded-lg bg-gray-800 border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-750 transition-all text-gray-300 text-sm font-medium hover:text-white"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {status === AnalysisStatus.LOADING && <LoadingState />}

          {status === AnalysisStatus.ERROR && (
            <ErrorState message={error || "Erro desconhecido"} onRetry={() => handleAnalysis(searchTerm)} />
          )}

          {status === AnalysisStatus.SUCCESS && analysis && (
            <div className="animate-fade-in space-y-8 pb-12">
              
              {/* --- HERO RESULT SECTION --- */}
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-cyan-500/10 to-transparent rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>

                <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                  <div className="flex-shrink-0">
                    <ScoreCircle score={analysis.survivalScore} />
                  </div>
                  
                  <div className="flex-1 text-center lg:text-left space-y-6">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{analysis.role}</h2>
                      <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-4">
                        <Badge color={analysis.salaryImpactPrediction === 'increase' ? 'green' : analysis.salaryImpactPrediction === 'decrease' ? 'red' : 'amber'}>
                          Salário: {analysis.salaryImpactPrediction === 'increase' ? 'Tendência de Alta' : analysis.salaryImpactPrediction === 'decrease' ? 'Tendência de Queda' : 'Estável'}
                        </Badge>
                        <Badge color="purple">
                          Automação Estimada: {100 - analysis.survivalScore}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-xl border-l-4 border-l-cyan-500">
                      <p className="text-2xl text-gray-100 font-medium leading-snug">"{analysis.verdict}"</p>
                    </div>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">{analysis.description}</p>
                  </div>
                </div>
              </div>

              {/* --- MAIN GRID --- */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* COLUMN 1: RISKS (Left) */}
                <div className="lg:col-span-7 space-y-8">
                  <Card className="h-full">
                    <SectionTitle 
                      icon={<AlertOctagon className="w-5 h-5 text-white" />} 
                      title="Vulnerabilidades e Riscos" 
                      subtitle="Aspectos da profissão mais suscetíveis à automação por IA."
                    />
                    
                    <div className="mb-8 p-4 bg-gray-950/50 rounded-xl border border-gray-800">
                       <RiskBarChart data={analysis.automationRisks} />
                    </div>

                    <div className="space-y-4">
                      {analysis.automationRisks.map((risk, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-xl bg-gray-800/40 hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700">
                          <div className={`w-1 h-full rounded-full self-stretch flex-shrink-0 ${
                            risk.severity === 'high' ? 'bg-red-500' :
                            risk.severity === 'medium' ? 'bg-amber-500' :
                            'bg-emerald-500'
                          }`}></div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold text-gray-200">{risk.factor}</h4>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">{risk.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* COLUMN 2: HUMAN EDGE (Right) */}
                <div className="lg:col-span-5 space-y-8">
                   <Card>
                      <SectionTitle 
                        icon={<ShieldCheck className="w-5 h-5 text-white" />} 
                        title="Seu Diferencial Humano" 
                        subtitle="Onde a IA ainda não consegue competir com você."
                      />
                      <ul className="space-y-4">
                        {analysis.humanMoat.map((moat, idx) => (
                          <li key={idx} className="flex gap-4 p-3 rounded-lg bg-emerald-900/10 border border-emerald-900/20">
                            <div className="bg-emerald-500/20 p-1.5 rounded-full h-fit">
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                            </div>
                            <span className="text-gray-200 font-medium">{moat}</span>
                          </li>
                        ))}
                      </ul>
                   </Card>

                   <Card>
                      <SectionTitle 
                        icon={<BrainCircuit className="w-5 h-5 text-white" />} 
                        title="Radar de Competências" 
                        subtitle="Equilíbrio entre habilidades técnicas e humanas."
                      />
                      {/* Increased height here for mobile responsiveness */}
                      <div className="h-80 -mx-2 md:mx-0">
                        <SkillRadar data={analysis.skillShift} />
                      </div>
                   </Card>
                </div>

                {/* --- BOTTOM: ACTION PLAN --- */}
                <div className="lg:col-span-12">
                  <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-3xl p-8">
                    <SectionTitle 
                      icon={<TrendingUp className="w-5 h-5 text-white" />} 
                      title="Plano de Evolução (Upskilling)" 
                      subtitle="Habilidades estratégicas para garantir sua relevância nos próximos 5 anos."
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {analysis.upskilling.map((item, idx) => (
                        <div key={idx} className="flex flex-col bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/40 transition-all group shadow-lg">
                           <div className="flex justify-between items-start mb-4">
                             <div className={`p-3 rounded-xl ${item.priority === 'must-have' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-800 text-gray-400'}`}>
                               {item.priority === 'must-have' ? <Target className="w-6 h-6" /> : <Lightbulb className="w-6 h-6" />}
                             </div>
                             {item.priority === 'must-have' && (
                               <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase rounded tracking-wider">
                                 Prioridade
                               </span>
                             )}
                           </div>
                           
                           <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{item.skill}</h4>
                           <p className="text-sm text-gray-400 leading-relaxed mb-4">{item.reason}</p>

                           {/* Steps Section */}
                           {item.steps && item.steps.length > 0 && (
                             <div className="mt-auto pt-4 border-t border-gray-800">
                               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Como evoluir:</p>
                               <ul className="space-y-2">
                                 {item.steps.map((step, sIdx) => (
                                   <li key={sIdx} className="flex items-start gap-2.5 text-sm text-gray-300">
                                     <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                     <span className="leading-snug">{step}</span>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;