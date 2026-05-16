# Overpass — Landing

Landing page do **Overpass**, plataforma de evolução criativa da [Overlens](https://overlens.com.br).

> Overpass não é curso. É plataforma de evolução: jornada estruturada em níveis (Operante → Convergente → Emergente → Nexialista), baseada em nexialismo — conectar saberes para gerar impacto.

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS 4** (via `@tailwindcss/vite`, importado em `src/index.css`)
- **react-hook-form** (modal de aplicação)
- Design system interno: `@overlens/legacy-components`, `@overlens/legacy-foundations`, `@overlens/legacy-icons`

## Setup

```bash
git clone https://github.com/thaisteofilo-crypto/site-overpass.git
cd site-overpass
npm install
```

## Como rodar

### 1. Desenvolvimento (hot reload)

```bash
npm run dev
```

Abre em `http://localhost:5173/` (ou próxima porta livre).

### 2. Build de produção

```bash
npm run build
```

Gera a pasta `dist/` totalmente auto-contida (~1 MB) com paths relativos. **Pode abrir o `dist/index.html` direto com duplo clique** — não precisa de servidor.

### 3. Preview do build

```bash
npm run preview
```

Sobe um servidor local servindo a versão de produção (`dist/`).

## Estrutura

```
src/
  App.tsx       Componente principal — toda a landing (≈1265 linhas)
  main.tsx      Entry React
  index.css     Estilos globais + Tailwind + variáveis de design
public/
  hero-banner.png
  overlens-white.png, overlens-black.png
  ruan-time-to-build.webp
  cards/        12 cards do marquee (ai-first, chrome, codexia, etc.)
index.html      Entry HTML (Vite injeta o bundle no body)
vite.config.ts  Build configurado como IIFE + paths relativos
```

## Notas para o dev

- **Config de build não-padrão** (`vite.config.ts`):
  - `base: './'` para paths relativos no `dist/`
  - `format: 'iife'` + `inlineDynamicImports: true` no Rollup para gerar bundle único auto-contido
  - Plugin inline `iife-html` troca `type="module"` por `defer` no HTML final (evita CORS via `file://`)
- **Por que essa config?** O build precisa abrir com duplo clique em qualquer máquina sem dev server. Trade-off: bundle único maior (~700 KB) em vez de code-splitting.
- **Imagens** usam paths relativos `./hero-banner.png` em `src/App.tsx` (não `/hero-banner.png`) — mesma razão acima.
- **WhatsApp:** 4 CTAs apontam para `https://wa.me/5511947247072`. Ver [App.tsx:1108, 1178, 1205, 1253](src/App.tsx).
- **Modal de aplicação:** `onSubmit` está com `console.log` — precisa de integração real (CRM/API) antes de receber tráfego pago.

## Pontos de revisão prioritários

Ver [AUDITORIA-SITE.md](./AUDITORIA-SITE.md) — diagnóstico de conversão e responsividade feito por agentes especializados.

Resumo rápido:
- H1 não nomeia o produto (`src/App.tsx:510-520`)
- 4 níveis (Operante → Convergente → Emergente → Nexialista) ausentes
- 7 entregáveis não aparecem explícitos antes do preço
- "Lote Founders" sem definição de vagas/prazo/bônus (`src/App.tsx:976-1099`)

## Deploy

Não há pipeline automática. Para publicar:
- **Vercel / Netlify:** auto-detecta Vite; sem config adicional
- **Estático puro:** copiar `dist/` para qualquer host (S3, Cloudflare Pages, etc.)
- **Compartilhar offline:** zipar `dist/` — quem receber abre o `index.html` com duplo clique
