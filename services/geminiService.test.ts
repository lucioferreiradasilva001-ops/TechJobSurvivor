import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeJobRole } from './geminiService';

// Mock do @google/genai
const mockGenerateContent = vi.fn();

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: {
        generateContent: mockGenerateContent
      }
    })),
    Type: {
      OBJECT: 'OBJECT',
      STRING: 'STRING',
      NUMBER: 'NUMBER',
      ARRAY: 'ARRAY'
    }
  };
});

describe('geminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.API_KEY = 'test-api-key';
  });

  it('deve retornar uma análise válida quando a API responde corretamente', async () => {
    const mockResponseData = {
      role: "Dev",
      survivalScore: 85,
      verdict: "Seguro",
      description: "Desc",
      humanMoat: ["Criatividade"],
      automationRisks: [],
      skillShift: [],
      upskilling: [],
      salaryImpactPrediction: "increase"
    };

    mockGenerateContent.mockResolvedValueOnce({
      text: JSON.stringify(mockResponseData)
    });

    const result = await analyzeJobRole('Desenvolvedor');
    
    expect(result).toEqual(mockResponseData);
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });

  it('deve lançar erro se a API Key não estiver definida', async () => {
    delete process.env.API_KEY;
    await expect(analyzeJobRole('Dev')).rejects.toThrow("API Key not found");
  });

  it('deve tratar erros da API graciosamente', async () => {
    process.env.API_KEY = 'test';
    mockGenerateContent.mockRejectedValueOnce(new Error("API Error"));
    await expect(analyzeJobRole('Dev')).rejects.toThrow("API Error");
  });
});