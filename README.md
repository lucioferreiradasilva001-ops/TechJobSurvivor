# TechJob Survivor AI 🛡️🤖

> **O futuro do trabalho na era da IA.**

O **TechJob Survivor AI** é uma Progressive Web App (PWA) interativa que utiliza a inteligência artificial do Google (Gemini 2.5) para analisar carreiras de tecnologia. A aplicação determina a probabilidade de sobrevivência de uma profissão, identifica riscos de automação e gera planos de evolução (upskilling) personalizados.

## 🚀 Funcionalidades

- **Análise de Sobrevivência**: Score de 0 a 100 indicando a resiliência da profissão.
- **Radar de Competências**: Comparativo visual entre habilidades onde a IA domina vs. Habilidades Humanas.
- **Análise de Riscos**: Gráficos detalhando vulnerabilidades de automação.
- **Plano de Ação**: Passos práticos (Upskilling) para se manter relevante.
- **PWA**: Instale no desktop ou mobile e funcione parcialmente offline.
- **Internacionalização**: Interface e respostas totalmente em Português (BR).

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Estilização**: Tailwind CSS
- **Visualização de Dados**: Recharts
- **IA / LLM**: Google Gemini API (`@google/genai`)
- **Ícones**: Lucide React
- **Build/Tooling**: ES Modules (No-build setup para desenvolvimento rápido)

## 📂 Estrutura do Projeto

```
/
├── index.html              # Ponto de entrada e configuração do Tailwind/Importmap
├── index.tsx               # Montagem do React e registro do Service Worker
├── App.tsx                 # Lógica principal e orquestração da UI
├── types.ts                # Definições de Tipos TypeScript (Interfaces)
├── manifest.json           # Manifesto PWA
├── service-worker.js       # Configuração de Cache e Offline
├── services/
│   └── geminiService.ts    # Integração com a Google Gemini API
├── components/
│   ├── Components.tsx      # Componentes de UI (Cards, Badges, Loaders)
│   └── AnalysisCharts.tsx  # Gráficos (Radar, Barras)
└── tests/                  # (Opcional) Testes automatizados
```

## 🚦 Como Executar

1. **Clone o repositório**
2. **Configure a API Key**:
   Você precisa de uma chave de API do Google Gemini.
   Certifique-se de que a variável de ambiente `process.env.API_KEY` esteja disponível no seu ambiente de build ou injetada globalmente.

3. **Instalação e Start**:
   Este projeto foi desenhado para rodar em ambientes web modernos ou containers. Se estiver usando Node.js localmente com Vite:

   ```bash
   npm install
   npm run dev
   ```

## 🧪 Testes

O projeto inclui testes unitários e de integração utilizando Vitest e React Testing Library.

```bash
npm run test
```

## 📝 Licença

MIT
