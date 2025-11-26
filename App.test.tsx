import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import * as geminiService from './services/geminiService';

// Mock dos gráficos pois Recharts não renderiza bem em ambiente de teste headless
vi.mock('./components/AnalysisCharts', () => ({
  SkillRadar: () => <div data-testid="mock-radar">Radar Chart</div>,
  RiskBarChart: () => <div data-testid="mock-bar">Bar Chart</div>
}));

// Mock do serviço
vi.mock('./services/geminiService');

const mockAnalysisData = {
  role: "Engenheiro de Prompt",
  survivalScore: 90,
  verdict: "Profissão do Futuro",
  description: "Essencial para interagir com LLMs.",
  humanMoat: ["Contexto", "Ética"],
  automationRisks: [{ factor: "Geração de texto", severity: "medium", description: "IA gera texto rápido" }],
  skillShift: [{ name: "Lógica", value: 80, type: "human" }],
  upskilling: [{ skill: "Python", priority: "must-have", reason: "Automação", steps: ["Estude sintaxe"] }],
  salaryImpactPrediction: "increase"
};

describe('App Integration', () => {
  it('deve renderizar a tela inicial corretamente', () => {
    render(<App />);
    expect(screen.getByText(/Sua carreira está/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ex: Desenvolvedor React/i)).toBeInTheDocument();
  });

  it('deve realizar uma busca e exibir resultados', async () => {
    // Configura o mock para resolver com sucesso
    vi.spyOn(geminiService, 'analyzeJobRole').mockResolvedValue(mockAnalysisData as any);

    render(<App />);

    // Simula digitação
    const input = screen.getByPlaceholderText(/Ex: Desenvolvedor React/i);
    fireEvent.change(input, { target: { value: 'Engenheiro de Prompt' } });

    // Simula clique no botão
    const button = screen.getByText('Analisar');
    fireEvent.click(button);

    // Verifica estado de loading
    expect(screen.getByText(/Processando Análise/i)).toBeInTheDocument();

    // Aguarda o resultado
    await waitFor(() => {
      expect(screen.getByText('Engenheiro de Prompt')).toBeInTheDocument();
      expect(screen.getByText('"Profissão do Futuro"')).toBeInTheDocument();
      expect(screen.getByTestId('mock-radar')).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando a análise falha', async () => {
    // Configura o mock para rejeitar
    vi.spyOn(geminiService, 'analyzeJobRole').mockRejectedValue(new Error("Erro na API"));

    render(<App />);

    const input = screen.getByPlaceholderText(/Ex: Desenvolvedor React/i);
    fireEvent.change(input, { target: { value: 'Fail Job' } });
    fireEvent.click(screen.getByText('Analisar'));

    await waitFor(() => {
      expect(screen.getByText(/Não foi possível completar a análise/i)).toBeInTheDocument();
      expect(screen.getByText(/Erro na API/i)).toBeInTheDocument();
    });
  });
});