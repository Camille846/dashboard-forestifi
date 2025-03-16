# Documentação Técnica - ForestiFi Dashboard

## 🌳 Visão Geral do Projeto
O ForestiFi Dashboard é uma interface web desenvolvida para facilitar a visualização de investimentos e impactos ambientais na Amazônia através da tokenização de ativos naturais. 

O objetivo é proporcionar uma experiência intuitiva e informativa para investidores, permitindo que acompanhem seus portfólios, vejam o desempenho financeiro, projetem ganhos futuros e entendam o impacto ambiental positivo de seus investimentos.

Este projeto foi desenvolvido como parte do desafio técnico da ForestiFi, que exigiu a criação de um dashboard funcional com design moderno, gráficos dinâmicos, integração com uma API fictícia, e foco em boas práticas de UX/UI, responsividade e performance. O dashboard foi implementado com um foco em minimalismo, usabilidade e interatividade, atendendo aos requisitos essenciais e incorporando alguns desafios bônus, como internacionalização e dark mode.

## 🛠 Escolhas Técnicas

### Framework Principal
- **Next.js 14**
  - Justificativa: Escolhido pela sua robusta performance, otimização built-in e facilidade de deploy
  - Benefícios:
    - Server-side rendering (SSR) para melhor SEO e performance
    - Otimização automática de imagens
    - Suporte nativo a TypeScript
    - Embora menos relevante para um dashboard, a estrutura de rotas do Next.js facilita a escalabilidade para futuras páginas públicas.
    - A integração com Vercel (usada para o deploy) permite CI/CD contínuo e deploy automático.

### Principais Bibliotecas e Tecnologias
1. **Estilização**
   - TailwindCSS
   - Razão: Selecionado por sua abordagem utility-first, que acelera o desenvolvimento de interfaces consistentes e responsiva
   - Benefícios:
     - Sistema de design consistente
     - Menor quantidade de CSS personalizado
     - Excelente suporte a modo escuro
     - Facilidade de manutenção e escalabilidade para novos componentes

2. **Visualização de Dados**
   - Recharts (^2.15.1)
   - Razão: Biblioteca React nativa com boa performance e personalização
   - Recursos implementados:
     - Gráficos de linha interativos
     - Tooltips personalizados
     - Responsividade automática

3. **Internacionalização**
   - Sistema próprio via `/lib/i18n`
   - Suporte a PT-BR e EN
   - Uma solução customizada foi preferida para evitar o overhead de bibliotecas pesadas como react-i18next, considerando que o projeto precisava apenas de suporte básico para português e inglês
   - Um toggle de idioma (visível no canto superior direito com "PT" selecionado) permite alternar entre português e inglês, conforme o desafio bônus de internacionalização (i18n).
   - Implementação:
     ```
     lib/
     └── i18n
     ```

4. **Componentes de UI**
   - Lucide React para ícones
   - Sistema de toasts para notificações
   - Modais interativos

## 🎨 Design System

### Paleta de Cores
- Verde Floresta: `#2D4F4A` (Principal)
- Verde Claro: `#78D484` (Secundária)
- Amarelo: `#FFF085` (Impacto)
- Laranja: `#F87B36` (Ação)

### Tipografia
- Fonte da Marca: BRSonomafamilyfont
- Hierarquia clara de textos
- Otimizada para legibilidade

## 💡 Funcionalidades Principais

### 1. Overview Dashboard
- **Gráfico de Desempenho**
  - Visualização interativa
  - Filtros temporais (semana/mês/ano/total)
  - Filtro por token
  - Hover com detalhes de investimento

- **Métricas Principais**
  - Total Investido
  - Retorno Total
  - Créditos de Carbono (tCO2)

- **Impacto Ambiental**
  - Redução de CO2
  - Hectares preservados
  - Famílias beneficiadas

### 2. Portfolio (Carteira de investimentos)
- **Tabela de Ativos**
  - Ordenação multidirecional
  - Métricas detalhadas por ativo
  - Sistema de filtros avançado

- **Transações Recentes**
  - Histórico visual
  - Indicadores de compra/venda

### 3. Earnings (Projeções)
- **Simulador Interativo**
  - Três cenários: Conservador (4% de taxa de crescimento anual), Moderado (8% de taxa de crescimento anual), Otimista (12% de taxa de crescimento anual)
  - Slider temporal interativo
  - Cálculos dinâmicos

- **Modal de Simulação**
  - Calculadora de investimento
  - Preview de retornos
  - Fluxo de compra integrado

## 📁 Estrutura do Projeto

public/
├── fonts/
│   └── BRSonomafamilyfont
src/
├── app/
├── components/
│   ├── charts/      # Componentes de visualização de gráficos
│   ├── ui/          # Componentes de interface reutilizáveis
├── hooks/           # Hooks customizados
├── lib/             # Configurações e utilidades
│   ├── i18n/        # Sistema de internacionalização
│   ├── api.ts       # Configuração e funções de API
│   ├── types.ts     # Tipagens TypeScript globais
│   └── utils.ts     # Funções auxiliares 
└──
```

## 🚀 Performance e Otimizações
- Lazy loading
- Otimização de imagens via Next.js
- Animações otimizadas
- Dark Mode para acessibilidade

## 🔄 Deploy
- Deploy automatizado via Vercel

## 📱 Responsividade
- Design Mobile-first
- Interações touch-friendly
- Adaptação de visualizações para mobile

## 🔗 Links Importantes
- [Repositório](https://github.com/Camille846/dashboard-forestifi)
- [Demo](https://dashboard-forestifi.vercel.app/)