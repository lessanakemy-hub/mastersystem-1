# 🌐 MasterPortComex

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

> **Next-Generation ERP for Foreign Trade & Finance.**

Uma solução Enterprise robusta que unifica a complexidade logística do Comércio Exterior com a rigozeira de um núcleo financeiro multi-moeda. Desenvolvido com uma arquitetura moderna, escalável e uma interface "Deep Tech" focada em produtividade.

## 🚀 Visão Geral

Este projeto visa resolver a fragmentação entre sistemas de Comex e ERPs Financeiros tradicionais. Diferente de soluções legadas, o **[Nome do Projeto]** atua com gatilhos inteligentes: operações logísticas (Importação/Exportação) geram automaticamente provisões e transações financeiras, eliminando dupla digitação e erros de câmbio.

### 🎨 Design System
Interface "Futuristic Dark" desenvolvida sob medida, utilizando **Glassmorphism**, contrastes profundos e componentes de alta performance para visualização de dados complexos.

## ✨ Funcionalidades Chave

### 🚢 Módulo Comex (Automação)
- **Gestão de Processos:** Controle total de Importação e Exportação (Door-to-Door).
- **Rastreabilidade:** Timeline automatizada de cargas (ETD/ETA).
- **Custo Real:** Cálculo automático de *Landed Cost* (Impostos + Frete + Taxas).
- **Smart Documents:** Geração e leitura de Invoices e Packing Lists.

### 💰 Módulo Financeiro (Core)
- **Multi-Moeda Nativo:** Suporte simultâneo a BRL, USD, EUR com gestão de PTAX.
- **Contas a Pagar/Receber:** Integrado diretamente aos processos logísticos.
- **Fluxo de Caixa:** Previsão financeira baseada nos embarques em andamento.
- **Conciliação:** Semelhante a grandes players (ex: Omie), mas adaptado para câmbio.

## 🛠 Tech Stack

O projeto utiliza o que há de mais moderno no ecossistema React/Node:

- **Core:** [Next.js 14](https://nextjs.org/) (App Router) + [React](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/) (Custom Dark Theme)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest) (Server) + Zustand (Client)
- **Database:** PostgreSQL + [Prisma ORM](https://www.prisma.io/)
- **Forms & Validation:** React Hook Form + Zod
- **Data Visualization:** TanStack Table + Recharts

## 🏁 Setup & Rodar

```bash
# Instalar dependências (recomendado: rodar fora do Google Drive para evitar conflitos)
npm install

# Desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o Shell com tema **Deep Tech**.

> **Nota:** Se `npm install` falhar por causa do caminho no Google Drive, clone o repositório em uma pasta local (ex: `C:\dev\mastersystem`) e rode os comandos lá.

## 📂 Estrutura do Projeto (Architecture)

O sistema segue uma arquitetura modular baseada em domínios (DDD):

```bash
src/
├── modules/
│   ├── finance/    # Core financeiro (Transactions, Ledger, Currency)
│   ├── comex/      # Regras de negócio de Import/Export
│   ├── crm/        # Gestão de parceiros globais
│   └── dashboard/  # Analytics e BI
├── components/     # UI Kit (Atomic Design)
├── lib/            # Configurações de infra (Prisma, Axios)
└── app/            # Next.js App Router (Pages & Layouts)
