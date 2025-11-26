export interface SkillMetric {
  name: string;
  value: number; // 0-100
  type: 'human' | 'ai'; // 'human' means human advantage, 'ai' means AI advantage
}

export interface RiskFactor {
  factor: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface UpskillRecommendation {
  skill: string;
  priority: 'must-have' | 'good-to-have';
  reason: string;
  steps: string[];
}

export interface JobAnalysis {
  role: string;
  survivalScore: number; // 0-100 (100 = safe/thriving)
  verdict: string; // One sentence summary
  description: string;
  humanMoat: string[]; // Traits hard for AI to replicate
  automationRisks: RiskFactor[];
  skillShift: SkillMetric[]; // For radar chart
  upskilling: UpskillRecommendation[];
  salaryImpactPrediction: 'increase' | 'stable' | 'decrease';
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}