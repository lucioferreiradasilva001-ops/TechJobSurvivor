import { GoogleGenAI, Type } from "@google/genai";
import { JobAnalysis } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeJobRole = async (role: string): Promise<JobAnalysis> => {
  const ai = getAiClient();
  
  const prompt = `Analise a profissão de tecnologia "${role}" no contexto da evolução da Inteligência Artificial (2025-2030).
  
  Objetivo: Determinar o nível de "sobrevivência" e adaptação desta função.
  
  Forneça uma análise honesta, baseada em tendências de mercado atuais. Seja crítico mas construtivo.
  
  Retorne APENAS um objeto JSON válido seguindo estritamente o schema fornecido. O idioma deve ser Português (PT-BR).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING, description: "O nome da profissão analisada" },
            survivalScore: { type: Type.NUMBER, description: "Pontuação de 0 a 100 indicando a probabilidade de sobrevivência/crescimento. 0 = obsoleto, 100 = essencial." },
            verdict: { type: Type.STRING, description: "Um veredito curto e impactante (máx 15 palavras)" },
            description: { type: Type.STRING, description: "Uma breve descrição de como a função muda com a IA." },
            humanMoat: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista de 3 a 5 características humanas que protegem essa função da automação total."
            },
            automationRisks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  factor: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
                  description: { type: Type.STRING }
                },
                required: ['factor', 'severity', 'description']
              }
            },
            skillShift: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  value: { type: Type.NUMBER, description: "0-100" },
                  type: { type: Type.STRING, enum: ['human', 'ai'], description: "'human' para skills onde humanos vencem, 'ai' onde IA domina" }
                },
                required: ['name', 'value', 'type']
              },
              description: "Gere exatamente 6 métricas comparativas (ex: Criatividade, Codificação Repetitiva, Empatia, Análise de Dados, Estratégia, Velocidade)"
            },
            upskilling: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ['must-have', 'good-to-have'] },
                  reason: { type: Type.STRING },
                  steps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Lista de 3 passos curtos e práticos para começar a desenvolver essa habilidade."
                  }
                },
                required: ['skill', 'priority', 'reason', 'steps']
              }
            },
            salaryImpactPrediction: {
              type: Type.STRING,
              enum: ['increase', 'stable', 'decrease'],
              description: "Previsão de impacto salarial"
            }
          },
          required: [
            'role', 
            'survivalScore', 
            'verdict', 
            'description', 
            'humanMoat', 
            'automationRisks', 
            'skillShift', 
            'upskilling', 
            'salaryImpactPrediction'
          ]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(response.text) as JobAnalysis;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};