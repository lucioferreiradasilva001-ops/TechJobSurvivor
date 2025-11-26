import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge, ScoreCircle, SectionTitle } from './Components';
import { Cpu } from 'lucide-react';

describe('UI Components', () => {
  
  describe('Badge', () => {
    it('deve renderizar o texto corretamente', () => {
      render(<Badge color="blue">Teste Badge</Badge>);
      expect(screen.getByText('Teste Badge')).toBeInTheDocument();
    });

    it('deve aplicar classes de cor corretas', () => {
      const { container } = render(<Badge color="red">Perigo</Badge>);
      expect(container.firstChild).toHaveClass('bg-red-500/10');
    });
  });

  describe('ScoreCircle', () => {
    it('deve mostrar o score correto', () => {
      render(<ScoreCircle score={85} />);
      expect(screen.getByText('85')).toBeInTheDocument();
    });

    it('deve mostrar label "Resiliente" para scores altos', () => {
      render(<ScoreCircle score={90} />);
      expect(screen.getByText('Resiliente')).toBeInTheDocument();
    });

    it('deve mostrar label "Em Risco" para scores baixos', () => {
      render(<ScoreCircle score={20} />);
      expect(screen.getByText('Em Risco')).toBeInTheDocument();
    });
  });

  describe('SectionTitle', () => {
    it('deve renderizar título e subtítulo', () => {
      render(
        <SectionTitle 
          icon={<Cpu />} 
          title="Título Principal" 
          subtitle="Subtítulo descritivo" 
        />
      );
      expect(screen.getByText('Título Principal')).toBeInTheDocument();
      expect(screen.getByText('Subtítulo descritivo')).toBeInTheDocument();
    });
  });
});