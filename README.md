# GiraReturns RMS — Painel Administrativo (Demo Live View)

Este repositório contém uma **demonstração interativa autônoma** baseada no front-end do ecossistema **GiraReturns / Giraê**, originalmente administrado pela **Gira Tecnologia**. O projeto foi adaptado para **portfólio e apresentações públicas**: não há chamadas a APIs reais, credenciais ou dados de clientes.

---

## Parte técnica

### Título e contexto do projeto original

- **Nome:** GiraReturns — módulo de administração (BFF Front-End).
- **Propósito original:** painel para análise de **remessas**, **precificação**, **produtividade** de operadores e **auditoria** de alterações de preço, com autenticação e permissões ligadas a um back-end corporativo.

### Tecnologias utilizadas

| Área | Tecnologia |
|------|------------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router, export estático) |
| Linguagem | TypeScript |
| UI | React 19, [MUI](https://mui.com/) (X-Charts, Date Pickers) |
| Estilo | Sass (SCSS modules), Emotion |
| Animações | Motion (Framer Motion) |
| Datas | dayjs, date-fns |
| PWA | @ducanh2912/next-pwa |

### Como clonar e executar a demo localmente

1. **Pré-requisitos:** Node.js 20+ (recomendado) e npm.

2. **Entrar na pasta da aplicação:**
   ```bash
   cd girareturns
   ```

3. **Instalar dependências:**
   ```bash
   npm install
   ```

4. **Modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra [http://localhost:3000](http://localhost:3000).

5. **Build de produção (export estático):**
   ```bash
   npm run build
   ```
   A saída estática fica em `girareturns/out/` — adequada para hospedagem em qualquer CDN ou storage estático (S3, Azure Static Web Apps, Netlify, Vercel, etc.).

### Instalar o PWA no celular (iOS e Android)

Depois de publicar a demo em uma URL com **HTTPS**, você pode instalar o app na tela inicial e testar o mesmo fluxo do navegador, com ícone próprio e comportamento próximo ao de um aplicativo. O projeto usa `@ducanh2912/next-pwa`; o **service worker** e o registro do PWA entram em vigor no **build de produção** (não no `npm run dev`).

**Requisitos gerais**

- Acesse a **URL publicada** da demo (não `http://localhost`).
- Conexão **HTTPS** (padrão em praticamente todas as hospedagens modernas).
- Na primeira visita, aceite cookies/armazenamento se o navegador pedir (o app usa `localStorage` para o “login” da demo).

#### Android (Chrome ou navegador baseado em Chromium)

1. Abra a URL da demo no **Google Chrome** (recomendado).
2. Toque no menu **⋮** (três pontos) no canto superior direito.
3. Toque em **Instalar app**, **Adicionar à tela inicial** ou **Instalar** (o texto varia conforme a versão do Chrome).
4. Confirme na caixa de diálogo. O ícone **GiraReturns** (nome curto definido em `public/manifest.json`) aparece na gaveta de apps / tela inicial.
5. Abra pelo ícone: a demo roda em modo **standalone** (sem barra de endereço completa, dependendo do launcher).

*Dica:* Se a opção “Instalar” não aparecer, verifique se o site já terminou de carregar, se não está em aba anônima restrita e se a hospedagem está servindo os arquivos `manifest.json` e `sw.js` na raiz corretamente.

#### iPhone e iPad (Safari)

No iOS, a forma suportada pela Apple para **“Adicionar à Tela de Início”** a partir da Web costuma ser o **Safari**.

1. Abra a URL da demo no **Safari** (não use apenas o Chrome no iOS se a opção abaixo não aparecer; no Chrome iOS o fluxo pode ser limitado).
2. Toque no botão **Compartilhar** (ícone de quadrado com seta para cima).
3. Role a lista de ações e toque em **Adicionar à Tela de Início**.
4. Edite o nome se quiser e toque em **Adicionar**.
5. O atalho aparece na **Tela de Início**; ao abrir, a demo usa a área de exibição como app (conforme as metatags / manifest).

*Observações para iOS:* recursos PWA (cache offline, notificações push, etc.) têm **regras mais restritas** que no Android; para esta demo, o foco é **instalação e uso pelo ícone**, alinhado ao que o Safari costuma expor. Se algo não instalar, confirme **HTTPS** e teste de novo após um **build de produção** implantado.

#### Resumo rápido

| Plataforma | Navegador sugerido | Ação principal |
|------------|-------------------|----------------|
| Android | Chrome | Menu ⋮ → **Instalar app** / **Adicionar à tela inicial** |
| iOS / iPadOS | Safari | **Compartilhar** → **Adicionar à Tela de Início** |

### Login na demo

- Qualquer **e-mail** e **senha** preenchidos são aceitos (simulação).
- Para testar o fluxo de **credenciais inválidas**, use a senha literal `erro`.
- O **path da empresa** na URL (`/login?id=...`) continua sendo enviado ao fluxo de login apenas para manter o comportamento da UI; na demo não há validação remota.

### Funcionalidades que você pode explorar na demo

1. **Landing page (`/`)** — apresentação comercial do produto (conteúdo ilustrativo).
2. **Login (`/login`)** — formulário com logo local, link de “suporte” apontando para placeholder configurável.
3. **Remessa (`/remessa`)** — totais fictícios e gráficos de itens e valores por “loja” demo.
4. **Precificação (`/precificacao`)** — KPIs, produtividade por hora, comparativo de descontos, motivos e canais (dados mockados).
5. **Produtividade (`/produtividade`)** — métricas de busca e gráfico por operador fictício.
6. **Auditoria (`/auditoria`)** — tabela de linhas de auditoria; filtros por **operador**, **EAN** (ex.: `7891000123456`) e combinação dos dois; popup de detalhes ao selecionar um item.
7. **Menu lateral** — navegação entre módulos e desconexão (limpa `localStorage` e volta ao login).

### Arquitetura da demo (mock)

- **Arquivo central:** `girareturns/src/mock/demoApi.ts`  
  Concentra funções assíncronas que imitam latência de rede (`delay`) e devolvem **cópias** dos conjuntos de dados fictícios (`structuredClone` onde aplicável).
- **Configuração pública:** `girareturns/src/variaveis.ts`  
  Mantém apenas utilitários (ex.: `formatarNumeroBrasileiro`), tipos (`ILineAuditoria`) e `LINK_SUPORTE_DEMO` — **sem URLs de API reais**.
- **Páginas e componentes** importam as funções `demo*` em vez de `fetch` para endpoints externos.

### Desafios da adaptação e soluções

| Desafio | Solução |
|--------|---------|
| Múltiplos formatos de resposta (JSON, texto booleano) | Unificar permissão e dados em funções mock com assinaturas explícitas. |
| Manter gráficos e tabelas estáveis | Estruturar objetos mock idênticos aos esperados pelos componentes MUI X-Charts e pela tabela de auditoria. |
| Remover riscos de vazamento | Eliminar `fetch`, tokens reais, domínios de API e links de WhatsApp/números reais; substituir por placeholders e rotas internas (`next/link`). |
| Dependência circular tipo `IUsuario` | Tipagem alinhada ao componente de operadores; `import type` onde necessário. |

### Segurança e sensibilidade

- Não inclua nesta demo **tokens**, **senhas reais**, **URLs internas** ou **dados pessoais** de terceiros.
- Antes de publicar, revise `LINK_SUPORTE_DEMO` em `variaveis.ts` e o rodapé da landing para usar **seus** dados de contato.

---

## Parte comercial / portfólio

### GiraReturns RMS — **Demo interativa (front-end autônomo)**

Esta demo mostra como é possível **preservar a experiência de um painel administrativo complexo** enquanto se **desacopla totalmente o back-end** — ideal para portfólio, entrevistas técnicas e apresentações em que não se pode expor infraestrutura real. O trabalho evidencia domínio de **Next.js**, **TypeScript**, **componentização**, **visualização de dados** e **documentação clara** do que foi entregue.

### Minhas habilidades demonstradas neste projeto

- **Front-end moderno:** Next.js (App Router), React, TypeScript, SCSS modules.
- **UI/UX:** reprodução fiel de fluxos (login, menu, filtros, gráficos, tabelas responsivas).
- **Simulação de back-end / mock data:** camada dedicada, dados coerentes com o domínio (retail, precificação, auditoria).
- **Resolução de problemas:** substituição segura de integrações, ajuste de tipos e remoção de dependências mortas.
- **Adaptação de código:** projeto original orientado a API → variante 100% estática e apresentável.
- **Comunicação técnica:** README com visão de produto e de engenharia.
- **Boas práticas:** build estático verificado, sem segredos no código-fonte da demo.

### Funcionalidades principais (visão do usuário)

- Visão consolidada de **remessas** e **precificação** com gráficos interativos.
- Acompanhamento de **produtividade** por operador (dados ilustrativos).
- **Auditoria** rastreável por período, EAN e operador, com detalhamento em modal.
- Experiência **mobile-aware** herdada do projeto original (menu, tabela, popup).

### Contato / chamada para ação

- **Nome:** Victor Teixeira Silva  
- **E-mail:** victor.teixeira@inovasoft.tech
- **LinkedIn:** [https://www.linkedin.com/feed/](https://www.linkedin.com/feed/)  
- **Mensagem sugerida:** _“Demos e provas de conceito em front-end — consultoria ou contratação.”_

---

## Licença e créditos

- Interface e conceito do produto **GiraReturns / Giraê** pertencem ao contexto do projeto original (**Gira Tecnologia**).  
- Esta **versão demo** foi adaptada para fins de **portfólio e demonstração**, sem vínculo operacional com ambientes reais da empresa.

---
