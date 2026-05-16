# Overpass — Landing

Landing page do **Overpass**, plataforma de evolução criativa da [Overlens](https://overlens.com.br).

> Overpass não é curso. É plataforma de evolução: jornada estruturada em níveis (Operante → Convergente → Emergente → Nexialista), baseada em nexialismo — conectar saberes para gerar impacto.

## Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- Tailwind via `src/index.css`
- Entry: `index.html` → `src/main.tsx` → `src/App.tsx`

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  App.tsx       Componente principal — toda a landing
  main.tsx      Entry React
  index.css     Estilos globais + Tailwind
public/         Assets estáticos servidos diretamente
index.html      HTML de entrada (Vite)
```

## Auditoria

Diagnóstico de conversão atual em [`AUDITORIA-SITE.md`](./AUDITORIA-SITE.md).
