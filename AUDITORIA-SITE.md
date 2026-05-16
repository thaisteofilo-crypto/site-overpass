# Auditoria de Conversão — Site Overpass

**Data:** 2026-05-16
**Auditor:** Orquestrador de Auditoria (lentes copy-vendas, ux-cro, oferta-pricing, prova-social)
**Arquivo analisado:** `src/App.tsx` (1325 linhas), `src/index.css`, `index.html`, `index-react.html`

---

## TL;DR — Top 3 alavancas de conversão

1. **A página não nomeia "Overpass" como plataforma de evolução com clareza no hero.** O H1 "O ecossistema da evolução criativa" é poético, mas não responde "o que estou comprando?" em 3 segundos. O sub fala do problema (acumular cursos) sem nomear a solução. **Impacto estimado: alto** — corrige a primeira impressão.

2. **Falta a espinha dorsal narrativa do produto: a jornada Operante → Convergente → Emergente → Nexialista.** Esse é o diferencial central do produto segundo o manual, e está completamente ausente da landing. Sem os níveis, "plataforma de evolução" vira jargão. **Impacto estimado: alto** — diferencia de qualquer outra plataforma.

3. **A oferta de R$ 1.800 (12×180) está deslocada do storytelling.** Não existe ancoragem do "porquê esse preço", os 7 entregáveis do produto não aparecem listados explicitamente (Onboarding, Plataforma gamificada, Overchat, Trilhas, Biblioteca, Encontros, WhatsApp) — apenas 4 features aparecem no ticket. O lead chega no preço sem ter visto a profundidade do que recebe. **Impacto estimado: alto** — quebra de objeção "vale R$ 1.800?".

---

## Diagnóstico Geral — está pronto para vender?

**PARCIAL.** A landing tem fundação visual e estrutural sólida (hero forte, design system aplicado, animações sofisticadas, prova social abundante, CTA persistente, modal de aplicação funcional). É **publicável**, mas opera abaixo do seu potencial porque:

- **Não comunica o diferencial central** (jornada com níveis nomeados) → vira mais uma "plataforma de cursos com IA"
- **Não lista os 7 entregáveis** do manual canônico → comprador não vê o tamanho do que recebe
- **Oferta sub-construída** — preço aparece sem ancoragem, sem urgência real, sem detalhamento de bônus
- **Subutiliza os depoimentos Tier S** (especialmente Monica Veiga/mestrado e os de antes/depois)
- **Hero copy abstrato** — "ecossistema da evolução criativa" é eyebrow, não headline

**Recomendação:** liberar o tráfego pago somente após corrigir os 5 itens críticos abaixo. Para tráfego orgânico/baixo volume, já pode publicar.

---

## Top 5 Problemas Críticos (priorizados por impacto × esforço)

### 1. Hero não nomeia o produto nem a transformação | IMPACTO ALTO | ESFORÇO PEQUENO
**Achado:** O H1 "O ecossistema da **evolução criativa**" funciona como tagline mas não como headline. Quem chega frio não entende em 3 segundos o que está sendo vendido. Subhead fala só do problema (consumo de cursos), nunca da solução (jornada estruturada com níveis nomeados).

**Por que importa:** primeiros 3 segundos definem bounce rate. Um visitante vindo de anúncio precisa saber "o que é isso, é pra mim, vou ficar".

**Recomendação:**
- H1 deve nomear: "Overpass: a plataforma que transforma estudo em jornada de evolução criativa"
- Sub deve carregar mecanismo + transformação: "Trilhas profundas, Overchat com lentes mentais e marcos verificáveis. Você sai sendo Operante, Convergente, Emergente — e chega a Nexialista."
- Os 2 CTAs ("Fazer aplicação" / "Conhecer mais") estão corretos; preservar.

**Arquivo:** `src/App.tsx:510-520`

---

### 2. Os 4 níveis (Operante / Convergente / Emergente / Nexialista) estão ausentes | IMPACTO ALTO | ESFORÇO MÉDIO
**Achado:** Esse é o diferencial central do produto segundo `produto-overpass.md`. Os níveis transformam "plataforma de cursos" em "jornada com começo, meio, evolução visível". Na landing atual, "Como funciona" mostra 3 camadas (Trilhas / Desafios / Marcos) que são genéricas — qualquer plataforma EAD fala isso. Os níveis nomeados são únicos do Overpass.

**Por que importa:** sem os níveis, não há "para onde estou indo?". É a peça que faz a copy parar de soar como mais uma plataforma de cursos com IA.

**Recomendação:** criar uma nova seção (entre "Como funciona" e "Para quem é") chamada "A jornada" ou "Os 4 marcos de evolução". Visual horizontal ou vertical mostrando:
- **Operante** — executa o que pedem
- **Convergente** — conecta o que já sabe
- **Emergente** — começa a criar próprio
- **Nexialista** — integra saberes e cria impacto real

Cada nível com 1 linha do que o aluno "consegue fazer" naquele estágio.

**Arquivo:** `src/App.tsx` (nova seção após `<HowItWorks />` linha 718)

---

### 3. Os 7 entregáveis do produto não estão listados de forma explícita | IMPACTO ALTO | ESFORÇO MÉDIO
**Achado:** O manual canônico lista 7 entregáveis: Onboarding, Plataforma gamificada, Overchat, Trilhas, Biblioteca, Encontros, WhatsApp. Na landing:
- "Como funciona" mostra só 3 (Trilhas, Desafios, Marcos)
- Pricing card mostra 4 features (Trilhas, Overchat, Encontros, "Sem enrolação") — uma delas nem é entregável
- **Biblioteca não é mencionada em lugar nenhum**
- **WhatsApp comunidade aparece só como botão flutuante**, nunca como entregável
- **Onboarding não aparece**

**Por que importa:** alunos sentem que estão comprando 3 coisas quando estão comprando 7. Reduz percepção de valor justamente antes do preço.

**Recomendação:** criar uma seção "O que está incluído" antes do pricing, com card-grid dos 7 entregáveis. Cada card com ícone + nome + 1 linha do benefício. Modelo do bento atual (`ba-card`) já serve.

**Arquivo:** `src/App.tsx` (nova seção entre linha 926 "Resultado" e 928 "Depoimentos")

---

### 4. Marquee de trilhas anônimo — nomes sem promessa | IMPACTO MÉDIO | ESFORÇO PEQUENO
**Achado:** Linhas 524-551 mostram 12 cards (Protocolo 3-2-1, AI First, Nexgen, Syntax, Codexia, Chrome, Spectrum, Synthetic, Expedição Global, FIT, Maestro, Codexia II). São só imagens com `alt={title}`. Nomes criativos mas nenhum diz o que o aluno aprende.

**Por que importa:** é a primeira coisa que o visitante vê depois do hero. Hoje funciona como "decoração com brand names". Pode funcionar como prova de profundidade do catálogo.

**Recomendação:** adicionar microcopy sob cada card (1 linha: "O que essa trilha desenvolve"). Ex: "Codexia — sintaxe visual aplicada a IA generativa". Ou agrupar em 3-4 famílias temáticas com label visível (Fundamentos / IA Aplicada / Criação Avançada / Mercado).

**Arquivo:** `src/App.tsx:524-551`

---

### 5. Oferta sub-construída: falta urgência real, ancoragem e detalhamento de bônus | IMPACTO ALTO | ESFORÇO MÉDIO
**Achado:** Pricing card (linhas 976-1075) mostra:
- "De R$ 2.300 POR R$ 1.800" — ancoragem existe mas frágil (por que R$ 2.300? Por que agora R$ 1.800?)
- "Preço travado pra sempre" — promessa boa mas perdida na meta-line
- "Lote Founders" mencionado no modal mas não explicado em lugar nenhum da página (o que é? quantas vagas? até quando?)
- Garantia de 7 dias aparece como bullet pequeno, não como argumento de vendas
- "12× de R$ 180 sem juros" — bom, mas parcelamento via cartão? Boleto? Pix? Página menciona os 3 métodos mas não explica como funciona o parcelamento em cada um

**Por que importa:** essa é a seção que fecha. Hoje funciona como "ticket bonito"; precisa funcionar como "argumento de compra".

**Recomendação:**
- Ancorar o "De R$ 2.300" em algo concreto: "Próximo lote: R$ 2.300. Lote Founders (até DATA): R$ 1.800."
- Explicar Lote Founders em 1 parágrafo: o que vem incluso, por que existe, quando termina, quantas vagas restam
- Promover garantia para argumento independente: "Teste por 7 dias. Não te servir, devolvemos integral."
- Listar os 7 entregáveis dentro do ticket (não só os 4 atuais)
- Adicionar bônus claros, se houver — hoje só há entregáveis, não bônus de oferta

**Arquivo:** `src/App.tsx:976-1099`

---

## Top 3 Acertos (preservar a todo custo)

### 1. Seção "Para quem NÃO é" é exemplar
**Onde:** linhas 761-786. Três cards diretos: "Quem busca atalho / Quem só consome / Quem evita pensar fundo". Copy alinhada com o tom sóbrio do manual. Eyebrow "Honestidade" é genial — diferencia da maior parte do mercado que mascara isso. **Manter intacto.**

### 2. Seção "Resultado em prática" com formato De → Para
**Onde:** linhas 871-906. Três casos reais (Maiham, Bia, Marcella) com transformação explícita "De" → "Para" + citação de quote real. Esse é o modelo correto de prova social. **Manter e multiplicar** (considerar adicionar mais 2-3 cards no mesmo formato com os Tier S restantes: André Lucas, Bruno Chaves, Monica Veiga, Beatriz Ribeiro, Vinicio).

**Pequeno ajuste necessário:** linha 886 escreve "Marcella Kaminda" — o nome correto na fonte de depoimentos é "Marcella Kamilla". Corrigir typo.

### 3. Tom sóbrio e intelectual da copy mantido em todas as seções
A landing **resiste** à tentação de virar guru. Frases como "Não prometemos resultado financeiro. Prometemos a estrutura para você construir o seu" (linha 1078) são exatamente a voz do manual. Mesmo o CTA final ("A era de consumir conteúdo passivamente acabou") é mais reflexivo do que persuasivo. **Esse tom é um ativo de marca — preservar absolutamente.**

---

## Achados secundários (não-críticos, agrupados)

### Copy / clareza
- Linha 514 (hero sub): "Vencerá quem trocar a estante de cursos por um sistema que mede, exige e avança junto com quem aprende" — boa, mas longa demais para hero. Cortar para 1 frase.
- Linha 1232 (CTA final): bem escrito, manter.
- Linha 78 (Kalleb): texto truncou frase importante. Original: "...especialmente por ter base no repertório acadêmico. O que está sendo entregue aqui, não vi mais em nenhum outro lugar." Atual: "...mas o que está sendo entregue aqui, não vi mais em nenhum outro lugar!" — quase OK, manter.
- Linha 139 (Natália Pereira): typo "air" deveria ser "ar" — `"o mesmo air reciclado"`.

### Prova social — uso dos depoimentos
- **Monica Veiga (mestrado / dissertação)** existe na lista (linha 106-107) mas está marcada como `group: 'manifesto'` e foi filtrada fora da wall principal (linha 943: `testimonials.filter(t => t.group !== 'manifesto')`). É um dos Tier S mais fortes do produto — autoridade acadêmica. Trazer para seção visível, talvez próximo de "O que desenvolve" ou "Quem ensina".
- **Vinicio (assistente social)** mesmo problema — group `manifesto`, filtrado fora. Ampliaria o ICP visível. Trazer.
- **Andressa Alves** tem o apelido "Filósofo do Design" (linha 93). Esse apelido aparece só dentro do quote. Considerar usá-lo como microcopy ou eyebrow na seção do Ruan (linha 1102) — é posicionamento puro.
- **Faltam fotos reais** nos depoimentos — todos usam iniciais em avatar fallback. Substituir pelo menos os 6-8 Tier S por foto real eleva conversão.
- Há 28 depoimentos com toggle "mostrar mais". Bom volume. Considerar destacar 3-4 em formato "hero" antes da wall.

### Oferta / pricing
- "Sticky CTA bar" (linha 1286-1294) é excelente — preserva CTA persistente. Manter.
- Falta contador de vagas / urgência. "Lote Founders" existe no modal mas sem explicar quanto resta.
- Falta menção a método de pagamento detalhado. Pix à vista tem desconto? Cartão é 12×180?
- Modal de aplicação (linhas 241-353) está pulando direto para checkout sem qualificar leads via WhatsApp. Considerar: o copy diz "Falaremos com você em breve pelo WhatsApp" mas o input é tudo manual — não há sequência de qualificação no próprio modal.

### UX / friction
- Modal abre instantâneo, sem animação de entrada — funciona, mas sente seco. Adicionar fade-in.
- O botão de WhatsApp flutuante (linha 1309) tem `wa.me/` sem número. Precisa ser corrigido antes do go-live.
- O link "Falar no WhatsApp" no CTA final (linha 1236) é `href="#"` — link morto. Corrigir.
- Links do footer (linhas 1255-1273) muitos são `href="#"` — Manifesto, WhatsApp, Newsletter, Overlens, FAQ, Contato. Antes do go-live, validar todos.
- Header só tem logo + 1 CTA. Não tem menu de seções. Em landing longa, faltam âncoras navegáveis (Como funciona, Para quem, Preço). Adicionar menu desktop simples.
- Mobile: classe `nav-simple` cria layout, mas com 1 CTA pequeno no canto direito o lead em mobile pode confundir o botão "Fazer aplicação" com um "voltar". Validar visualmente em mobile.

### Tracking / mensuração
- Linha 256: `onSubmit` faz `console.log('Aplicação:', data)`. **Crítico para go-live**: precisa estar integrado a CRM/endpoint real antes de publicar. Sem isso, todas as aplicações são perdidas.
- Não há tracking (GTM, Pixel, GA) visível em `index.html`. Adicionar antes de tráfego pago.

### Hierarquia de seções
A ordem atual é razoável mas pode ser otimizada:
- Hero → Trilhas (marquee) → Por que entrar → Como funciona → **(nova: Os 4 níveis)** → Para quem é → Para quem NÃO é → O que desenvolve → **(nova: 7 entregáveis)** → Resultado em prática → Depoimentos → Pricing → Ruan → FAQ → CTA final
- Trocar ordem de "Resultado em prática" e "Depoimentos" — Resultado é mais forte (formato de/para), deve vir DEPOIS da wall de depoimentos para crescendo emocional.

### Tipografia / visual
- O sistema visual (cores, tipos, animações) está coerente e de alto padrão. Manter.
- `font-display` uppercase é forte demais para CTAs como "Fazer aplicação" (já está em Inter/Outfit normal? confirmar). Manter como está se for o caso.

---

## Sequência sugerida de execução

**Fase 1 — Pré go-live obrigatório (3-5 dias)**
1. Corrigir todos os `href="#"` mortos + integrar `onSubmit` do modal a CRM/email/Notion
2. Adicionar tracking (GTM/Pixel/GA) no `index.html`
3. Configurar número real no WhatsApp flutuante
4. Corrigir typos: "Marcella Kaminda" → "Marcella Kamilla"; "air" → "ar"

**Fase 2 — Refazer núcleo de conversão (1 semana)**
5. Reescrever H1 + sub do hero (nomear produto + transformação)
6. Criar seção "Os 4 níveis de evolução"
7. Criar seção "O que está incluído" com os 7 entregáveis
8. Reescrever bloco de pricing: ancoragem + Lote Founders + garantia como argumento

**Fase 3 — Refinamento de prova social e oferta (1 semana)**
9. Trazer Monica Veiga e Vinicio para wall visível (remover filtro `manifesto`)
10. Adicionar 2-3 cards extras em "Resultado em prática" (André Lucas, Bruno Chaves, Beatriz Ribeiro)
11. Substituir avatars com iniciais por fotos reais dos 6-8 Tier S
12. Adicionar microcopy nos cards do marquee de trilhas
13. Promover "Filósofo do Design" como microcopy na seção do Ruan

**Fase 4 — Pós-launch (otimização contínua)**
14. Adicionar contador de vagas/urgência no Lote Founders
15. Adicionar menu desktop com âncoras de seção no header
16. Testar variações de hero copy (A/B)
17. Adicionar fade-in no modal

---

## Próximo passo recomendado (1 linha)

**Antes de qualquer mudança de copy, fazer reunião de 30 min com o time para responder: o que exatamente é o "Lote Founders" (vagas, prazo, bônus, preço pós-lote)? Sem isso, a seção de oferta não pode ser reconstruída.**
