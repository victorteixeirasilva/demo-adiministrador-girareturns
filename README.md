# GiraReturns RMS — Painel Administrativo (Demo Live View)

Este repositório contém uma **demonstração interativa autônoma** baseada no front-end do ecossistema **GiraReturns / Giraê**, originalmente administrado pela **Gira Tecnologia**. O projeto foi adaptado para **portfólio e apresentações públicas**: não há chamadas a APIs reais, credenciais ou dados de clientes.

**Link Para Teste:** [https://girareturnsdemo.inovasoft.tech/](https://girareturnsdemo.inovasoft.tech/)

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
<img width="1912" height="3813" alt="screencapture-girareturnsdemo-inovasoft-tech-2026-03-31-21_17_04" src="https://github.com/user-attachments/assets/15701d98-1a66-40a2-a01d-9303a6ac176b" />
<img width="1905" height="941" alt="Captura de tela 2026-03-31 212412" src="https://github.com/user-attachments/assets/3a78b65b-5724-42c9-9df4-1af980b166cf" />
<img width="1912" height="946" alt="Captura de tela 2026-03-31 212450" src="https://github.com/user-attachments/assets/ff632ae2-4c8b-4157-9806-992ce9bae267" />
<img width="1915" height="943" alt="Captura de tela 2026-03-31 212510" src="https://github.com/user-attachments/assets/eb1db25f-7e41-4c5a-b7cc-6050c0238929" />
<img width="1912" height="944" alt="Captura de tela 2026-03-31 212531" src="https://github.com/user-attachments/assets/da33fd3f-5404-4800-9999-9744aca5ea7c" />
<img width="1914" height="941" alt="Captura de tela 2026-03-31 212628" src="https://github.com/user-attachments/assets/106b9a4e-2f8a-41cd-8a33-8281fd1e5de6" />
<img width="1913" height="945" alt="Captura de tela 2026-03-31 212705" src="https://github.com/user-attachments/assets/0fcdfa65-bfce-457e-b54f-bdf6b78debf5" />
<img width="1912" height="942" alt="Captura de tela 2026-03-31 212733" src="https://github.com/user-attachments/assets/c8305680-da65-4448-933c-76a8a69c17ed" />
<img width="1915" height="944" alt="Captura de tela 2026-03-31 212826" src="https://github.com/user-attachments/assets/a8cc35f2-fdc6-4b29-aea0-0bc254401d90" />
<img width="1914" height="942" alt="Captura de tela 2026-03-31 212857" src="https://github.com/user-attachments/assets/d882c621-87b1-4296-8b93-e9cd04a705a8" />
<img width="1910" height="944" alt="Captura de tela 2026-03-31 212936" src="https://github.com/user-attachments/assets/96bb8d6e-de1b-4b49-b062-2fe6952eec96" />
<img width="1912" height="943" alt="Captura de tela 2026-03-31 212956" src="https://github.com/user-attachments/assets/0ce84566-fdc4-4cfd-b3ff-7ff52725ebfb" />
<img width="1913" height="946" alt="Captura de tela 2026-03-31 213018" src="https://github.com/user-attachments/assets/7c324d13-06ba-478c-8b60-8c97b1d6b28e" />

<img width="360" height="896" alt="IMG_8249" src="https://github.com/user-attachments/assets/85bf1755-115f-42d1-b543-348046a21eee" />
<img width="414" height="896" alt="IMG_8250" src="https://github.com/user-attachments/assets/08d3d84c-562d-450f-83cb-5f58c87a16bd" />
<img width="414" height="896" alt="IMG_8251" src="https://github.com/user-attachments/assets/d90316bb-420d-4325-972e-1e521026c048" />
<img width="414" height="896" alt="IMG_8252" src="https://github.com/user-attachments/assets/50fce473-fb57-4e1e-84d2-9d6a067b571b" />
<img width="414" height="896" alt="IMG_8253" src="https://github.com/user-attachments/assets/5261fa78-c48a-4660-8358-ca2ca40109ee" />
<img width="414" height="896" alt="IMG_8254" src="https://github.com/user-attachments/assets/8413f3ce-2f7d-4357-8b61-1e5e65f2467d" />
<img width="414" height="896" alt="IMG_8255" src="https://github.com/user-attachments/assets/4a03108f-2fe0-4d30-9be0-6ba06fbf8fc4" />
<img width="414" height="896" alt="IMG_8256" src="https://github.com/user-attachments/assets/6c1c8683-372f-479f-8361-f56411134e11" />
<img width="414" height="896" alt="IMG_8257" src="https://github.com/user-attachments/assets/cff0365b-4808-4a43-93ab-48fdef3dbe85" />
<img width="414" height="896" alt="IMG_8258" src="https://github.com/user-attachments/assets/6916802a-6011-4da6-9f57-54befbaa38d1" />
<img width="414" height="896" alt="IMG_8258" src="https://github.com/user-attachments/assets/d7347d63-55cb-4da0-933b-00241e263ad7" />
<img width="414" height="896" alt="IMG_8260" src="https://github.com/user-attachments/assets/7aefc671-7e02-4eef-95ce-ef5bc208291b" />
<img width="414" height="896" alt="IMG_8261" src="https://github.com/user-attachments/assets/75fddb17-ad9b-4bba-8726-35682d1abbec" />
<img width="414" height="896" alt="IMG_8262" src="https://github.com/user-attachments/assets/ebe76c23-bb8a-4195-b756-cb26aaaf171b" />
<img width="414" height="896" alt="IMG_8263" src="https://github.com/user-attachments/assets/c342f2ec-3a74-4c6d-8f30-e07bdb8af5b7" />
<img width="414" height="896" alt="IMG_8264" src="https://github.com/user-attachments/assets/7d38dba8-3605-4277-8d53-ac38ce7dea7e" />
<img width="414" height="896" alt="IMG_8265" src="https://github.com/user-attachments/assets/475b88b4-deb2-42df-b5e0-5f6a14816326" />
<img width="414" height="896" alt="IMG_8266" src="https://github.com/user-attachments/assets/c4c3f449-a148-4a8b-bf0c-14cb484c3d7c" />
<img width="414" height="896" alt="IMG_8267" src="https://github.com/user-attachments/assets/c45a6d5f-5009-4347-9533-c9c9e36cffd2" />
<img width="414" height="896" alt="IMG_8268" src="https://github.com/user-attachments/assets/7f503c50-c231-4ad8-9df5-6930e83d3cd6" />
<img width="414" height="896" alt="IMG_8269" src="https://github.com/user-attachments/assets/1ac38fc9-523c-4b78-9289-add15243f451" />
<img width="414" height="896" alt="IMG_8270" src="https://github.com/user-attachments/assets/f483ce94-2d0f-49f4-b424-bd8671f1e967" />
<img width="414" height="896" alt="IMG_8271" src="https://github.com/user-attachments/assets/67ec6c0c-3a07-4a77-8844-f69fc2198c0e" />
<img width="414" height="896" alt="IMG_8272" src="https://github.com/user-attachments/assets/36951fc6-7bc3-4f81-8c88-bedd43893a09" />
<img width="414" height="896" alt="IMG_8273" src="https://github.com/user-attachments/assets/956f66cf-1de2-47fe-8808-2c20ae5006f9" />
<img width="414" height="896" alt="IMG_8274" src="https://github.com/user-attachments/assets/1d6aae02-9618-4cac-b257-3465a0f0ee0e" />
<img width="414" height="896" alt="IMG_8275" src="https://github.com/user-attachments/assets/8dca1b8c-0789-4bfe-9bdd-9df552b5785f" />
<img width="414" height="896" alt="IMG_8276" src="https://github.com/user-attachments/assets/e0e24f29-645f-4873-9cb6-5093f9f00a3e" />
<img width="414" height="896" alt="IMG_8277" src="https://github.com/user-attachments/assets/db3658f0-7c66-4c03-8127-8902a177a02a" />
<img width="414" height="896" alt="IMG_8278" src="https://github.com/user-attachments/assets/de486794-a248-4d0b-a26d-3414c61fdfae" />
<img width="414" height="896" alt="IMG_8279" src="https://github.com/user-attachments/assets/ad819336-3286-4509-a450-5a4b892c0782" />















