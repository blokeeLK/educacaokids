# Educação Kids — projeto completo

Landing page estática em HTML, CSS e JavaScript Vanilla. Não há React, backend, banco de dados ou serviço de pagamento interno. Vite é exclusivamente uma ferramenta opcional de desenvolvimento; o site publicado não depende dele.

## Comece por aqui

1. Extraia `educacao-kids-site.zip`.
2. Abra a pasta `educacao-kids-site`.
3. Edite `js/config.js`: nomes, quatro links de checkout, preços, suporte e domínio.
4. Substitua as mídias demonstrativas pelos materiais e registros autorizados.
5. Confirme composição dos kits, faixa etária, licença, entrega, bônus e políticas com a empresa/plataforma.
6. Publique **o conteúdo desta pasta** no GitHub e importe esse repositório na Vercel.

**Estado desta entrega:** implementação completa; conteúdos do produto, depoimentos e mídia comercial reais ainda não fornecidos; checkout e dados da empresa precisam ser preenchidos. Não iniciar tráfego pago antes dessas substituições. Os arquivos demonstrativos de atividades são prévias visuais para a página, não um acervo pedagógico fornecido para venda.

## Arquivos

- `index.html`: página principal, apresentação, vídeos, fotos, depoimentos, conteúdo, Bible Kids, galeria, preços, FAQ e CTAs.
- `oferta-especial.html`: oferta de saída, independente, sem menu.
- `saida.html`: saída neutra quando a oferta é aberta diretamente e não existe página anterior.
- `politica-de-privacidade.html`, `termos-de-uso.html`, `politica-de-reembolso.html`: textos-base marcados para revisão.
- `suporte.html`: fallback até preencher contato.
- `css/styles.css`: visual, responsividade, foco e redução de movimento.
- `js/config.js`: configuração central.
- `js/main.js`: aplicação dos dados, navegação, checkout, lightbox, metadados e schema.
- `js/offer-modal.js`: modais acessíveis e upsell.
- `js/videos.js`: carregamento sob demanda, reprodução e som.
- `js/exit-offer.js`: saída controlada, sem loop.
- `js/analytics.js`: eventos locais e adaptadores opcionais.
- `assets/images`: SVGs e WebPs, incluindo todos os placeholders.
- `assets/videos`: quatro MP4s demonstrativos válidos.
- `vercel.json`, `robots.txt`, `sitemap.xml`: configuração de publicação/SEO.
- `scripts/check.mjs`: validação estática de referências e sintaxe.
- `TESTES.md`: resultados, cobertura e limitações da verificação.

## 1. Trocar a logo

O header e o footer usam `assets/images/favicon.svg` como marca e o texto configurável `BRAND_NAME`. Substitua esse SVG para atualizar o símbolo. `assets/images/logo.svg` é uma versão completa de apoio para usar fora do site; se quiser usá-la no header, substitua o conteúdo de `.brand` no HTML por uma imagem da logo completa. Atualize também o favicon se necessário. Preserve `width`, `height` e um texto alternativo/`aria-label` adequado.

## 2. Trocar as imagens e prévias

Substitua mantendo os nomes:

| Arquivo | Uso | Proporção original |
|---|---|---|
| `hero.webp` | Hero e oferta especial | 1200 × 1160 |
| `atividade-01.webp` a `atividade-06.webp` | Galeria educativa | 720 × 960 |
| `atividade-biblica-01.webp` e `atividade-biblica-02.webp` | Bible Kids e galeria | 720 × 960 |
| `crianca-atividade-01.webp` e `crianca-atividade-02.webp` | Fotos abaixo dos vídeos | 1000 × 620 |
| `poster-video-01.webp` a `poster-video-04.webp` | Capa dos vídeos | 480 × 640 |

Se alterar proporções, atualize `width`/`height` no HTML. As fotos usam `object-fit: contain` para preservar rostos, mãos e materiais. Os vídeos usam `cover`: se o enquadramento exigir, altere para `contain` ou ajuste `object-position`. Use WebP/AVIF comprimido para fotos; preserve legibilidade nas páginas de atividade.

**Não remova só o rótulo de demonstração.** Troque o arquivo por um material verdadeiro antes. Depois de substituir todas as mídias, altere `DEMO_MEDIA: false` em `config.js`. Atualize `alt`, títulos e legendas no HTML, removendo a palavra “ilustrativa” somente quando apropriado.

### Adicionar uma prévia

Copie um `<button data-lightbox class="preview-card">` da galeria e altere arquivo, `alt`, título e `aria-label`. Não precisa alterar JavaScript. A galeria permanece fixa, com duas colunas mobile.

## 3. Trocar os vídeos

Coloque seus arquivos em:

- `assets/videos/video-01.mp4`
- `assets/videos/video-02.mp4`
- `assets/videos/video-03.mp4`
- `assets/videos/video-04.mp4`

Troque as quatro capas em `assets/images`. Os placeholders MP4 são cartões estáticos silenciosos de 3 segundos, identificados como demonstrativos; não são depoimentos nem registros de crianças.

Use preferencialmente MP4 H.264 com áudio AAC e `faststart`. Exporte com tamanho compatível com a exibição, por exemplo 540 × 720 ou 720 × 960, e bitrate moderado. Remova áudio se não for necessário. Exemplo com FFmpeg:

```bash
ffmpeg -i original.mp4 -c:v libx264 -crf 25 -preset medium -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart video-01.mp4
```

Os vídeos têm `autoplay muted loop playsinline`; o endereço do MP4 está em `data-src` e só passa para `src` perto do viewport. `IntersectionObserver` usa margem de 250 px. Fora da região próxima ou com aba oculta, a reprodução pausa. Só um vídeo pode ter som ativo de cada vez. O botão Pausar está disponível para acessibilidade. Com redução de movimento, o usuário inicia a reprodução manualmente. Autoplay depende das políticas do navegador: há poster e botão Play de fallback. Os placeholders não têm faixa de áudio; os botões de som alternam o estado, mas só produzirão som com um MP4 que contenha áudio.

## 4. Alterar preços

Todos os valores comerciais vêm de `js/config.js`, como números, usando ponto decimal:

```js
BASIC_PRICE: 10,
COMPLETE_PRICE: 27.90,
UPSELL_PRICE: 22,
EXIT_PRICE: 17.90,
```

A formatação em reais, economia, percentual de desconto e diferença para o Básico são calculados automaticamente. Com os valores iniciais: economia no upsell de R$ 5,90; desconto arredondado de 21%; diferença de R$ 12,00 para o Básico.

## 5. Inserir os quatro checkouts

Preencha `CHECKOUT_BASIC_URL`, `CHECKOUT_COMPLETE_URL`, `CHECKOUT_UPSELL_URL` e `CHECKOUT_EXIT_URL` com URLs HTTPS verdadeiras. Cada link deve corresponder ao preço, conteúdo e condições exibidos.

- Clique no Básico: abre modal; não envia direto para checkout.
- Aceitar upsell: vai ao link UPSELL.
- Recusar upsell: vai ao link BASIC.
- Completo normal: vai ao link COMPLETE sem upsell.
- Oferta especial: vai ao link EXIT.

Enquanto um link ainda contiver `SEU-CHECKOUT`, aparece um aviso e não ocorre navegação para um domínio fictício. O fluxo não processa nem coleta dados de pagamento. A entrega do produto acontece no checkout/plataforma contratada.

## 6. Alterar WhatsApp e suporte

`WHATSAPP` deve conter apenas dígitos, com código do país e DDD, como `55DDDNÚMERO`, sem espaços, sinal de mais ou pontuação. Não use esse exemplo como número real. A mensagem é criada a partir de `PRODUCT_NAME`.

Preencha `SUPPORT_EMAIL`. Se houver WhatsApp válido, o suporte usa WhatsApp. Na ausência, usa e-mail. Sem ambos, leva a `suporte.html`. Edite essa página com horário e prazo de atendimento reais.

## 7. Trocar marca, produto e módulo religioso

Edite `BRAND_NAME`, `PRODUCT_NAME` e `BIBLE_NAME` em `config.js`. Os elementos com `data-config` são atualizados automaticamente. Revise ainda títulos SEO, textos legais, respostas específicas do FAQ, alternativas das imagens e textos incorporados nas imagens/logo: esses são conteúdo editorial e precisam acompanhar a mudança de marca.

Para headline alternativa: `HERO_VARIANT: 'B'`. `'A'` é a versão principal. A troca é determinística e não instala ferramenta de experimento, cookies ou sorteio de variante.

## 8. Alterar a oferta de saída

Mude `EXIT_PRICE` e `CHECKOUT_EXIT_URL`. Ajuste texto e composição em `oferta-especial.html` e no `#exit-modal` do `index.html` quando necessário.

> Uma oferta de saída muito inferior ao preço principal pode aumentar conversão de abandono, mas também pode ensinar visitantes recorrentes a procurar descontos. Testar R$ 17,90, R$ 19,90 e uma oferta diferente antes de escolher definitivamente.

## 9. Ativar/desativar exit offer e entender o botão voltar

```js
EXIT_OFFER_ENABLED: true,
EXIT_MOBILE_ENABLED: true,
EXIT_DESKTOP_ENABLED: true,
```

Desativar a chave geral interrompe a interceptação. A página especial continua acessível por URL direta.

### Mobile

A detecção usa `(hover: none) and (pointer: coarse)`. Após interação real com o conteúdo, cria uma única guarda no histórico na mesma URL. Cliques em links, botões, vídeos, FAQ e modais não armam a guarda. Scroll sozinho também não arma. Recarregar uma guarda existente não cria outra.

No primeiro `popstate` correspondente à guarda, se não houver modal aberto, checkout pendente nem oferta já vista, registra `exitOfferShown = true` em `sessionStorage` e usa `location.replace` para a oferta especial. Essa substituição permite que o próximo Voltar saia em direção à página anterior. Não usa `beforeunload`, `unload`, alerta nativo, timer de redirecionamento ou novo `pushState` depois da primeira guarda.

Se houver modal aberto na tentativa de voltar, fecha o modal e não redireciona. A guarda já foi consumida; a próxima tentativa segue o histórico normal. Âncoras internas rolam até a seção sem adicionar histórico. Voltar para um documento restaurado pelo cache não cria outra guarda. Se o armazenamento de sessão estiver bloqueado, a oferta automática é desativada para evitar repetição.

Limite técnico: o navegador não oferece um sinal universal de intenção humana; a implementação responde a um retorno pelo histórico, inclusive gestos que o navegador interprete como Voltar. O efeito da guarda pode exigir um Voltar adicional quando a oferta é suprimida. Teste nos dispositivos e caminhos reais de campanha. Uma página aberta diretamente sem origem anterior oferece uma saída neutra, sem prender o visitante.

### Desktop

Não cria guarda de histórico. Somente oferece modal quando o ponteiro sobe e deixa o topo da janela, após interação de conteúdo ou pelo menos 20% de progresso de rolagem. Não mostra ao clicar, rolar, abrir/fechar modal, atualizar ou sair por outra borda. No máximo uma vez por sessão. Fechar o modal não prende a saída normal.

## 10–12. Analytics: Meta, Google e TikTok

Nenhum Pixel foi instalado; nenhum ID foi inventado. `trackEvent(eventName, parameters)` em `js/analytics.js` emite um evento local `site:analytics`. Visualizações de seções usam deduplicação por documento; uma nova carga de página é uma nova visualização. Cliques e novas aberturas de upsell são ações distintas.

Eventos preparados: `view_content`, `cta_basic_click`, `cta_complete_click`, `upsell_view`, `upsell_accept`, `upsell_decline`, `video_section_view`, `bible_section_view`, `pricing_view`, `exit_offer_view`, `exit_offer_accept`.

Para depurar sem transmitir a terceiros:

```js
document.addEventListener('site:analytics', e => console.log(e.detail));
```

Para ativar uma integração de produção:

1. Defina os IDs verdadeiros da sua conta e use o snippet oficial atual do fornecedor.
2. Implemente consentimento e revogação conforme sua operação; **carregue o snippet somente após a escolha aplicável**, porque scripts de terceiros podem enviar informações antes de `trackEvent`.
3. Depois de carregar o snippet e obter a escolha, defina `window.analyticsConsent = true` e `ANALYTICS_ENABLED: true` no config.
4. O adaptador reconhece `fbq`, `gtag` e `ttq`. Os eventos da camada são customizados; configure conversões correspondentes nos painéis, sem confundi-los com compra aprovada.
5. Evite duplicar PageView com envio automático e manual simultaneamente. O checkout é responsável por eventos de compra real. Não envie dados pessoais de crianças.
6. Ao revogar, interrompa envio e carregamento conforme a ferramenta de consentimento. O projeto não inclui banner ou CMP porque não há rastreamento externo ativo.

**Meta:** instale seu código-base oficial autorizado para criar `window.fbq`; esta camada usa `trackCustom`.
**Google:** instale a tag oficial para criar `window.gtag`; esta camada usa eventos `gtag('event', ...)`.
**TikTok:** instale o código oficial para criar `window.ttq`; esta camada usa `ttq.track(...)`.

Consulte as instruções atuais de cada fornecedor no momento de configurar. Não copie IDs de projetos antigos.

## 13. Publicar no GitHub

Crie um repositório, por exemplo `educacao-kids-site`. Faça upload **de todos os arquivos do projeto com suas subpastas**, deixando `index.html` na raiz. Não envie o ZIP como único arquivo do repositório. Não envie `node_modules`.

Alternativa via Git, dentro da pasta extraída:

```bash
git init
git add .
git commit -m "Site Educação Kids"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

Substitua `URL_DO_SEU_REPOSITORIO` pela URL real. Autentique-se no GitHub pelo fluxo da sua ferramenta. Não coloque senhas ou tokens no código.

Referência oficial: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github

## 14. Publicar na Vercel

Na Vercel: **Add New → Project → importar o repositório GitHub**.

- Framework Preset: **Other**.
- Root Directory: pasta que contém `index.html` (normalmente raiz).
- Build Command: sem comando de build. `vercel.json` contém `buildCommand: null`.
- Output Directory: `.`.
- Install Command: pode ser deixado vazio, pois não é necessário para servir os arquivos estáticos.

O `package.json` inclui apenas a pré-visualização opcional, não um build de framework. A publicação deve servir os arquivos tal como estão. O ZIP não precisa de compilação.

Configure seu domínio e atualize `SITE_URL`, os canonical/Open Graph no HTML, `robots.txt` e `sitemap.xml`. `SITE_URL` gera canonical e schema no navegador; mantenha também o HTML estático atualizado para robôs que não executam JavaScript. Oferta e páginas legais têm `noindex` por padrão para não indexar ofertas privadas e textos-base incompletos. Remova `noindex` das páginas legais somente após revisão se desejar indexá-las. Atualize a marca em title, description, Open Graph e Twitter.

Referências oficiais:
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/git

## 15. Testar localmente e no celular

Opção com Python, sem instalar dependências:

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`. No celular conectado à mesma rede Wi-Fi, use o IP local do computador com a porta 8080. Permita a conexão local quando necessário. Pare o servidor após testar.

Opção de desenvolvimento com Node/npm:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Use o endereço apresentado. Para checagem de referências e sintaxe: `npm run check` (Node 22 ou superior recomendado). Abrir `index.html` diretamente também permite conferir o visual, mas servidor local é mais representativo para vídeo/histórico/SEO.

Teste 360, 390, 430, 768, 1366 e 1920 px. Confira modais com teclado, Tab/Shift+Tab, Escape, navegação interna, quatro destinos, autoplay/fallback, som e os caminhos de Voltar. Teste iPhone/Safari e Android/Chrome físicos antes de tráfego. Em navegadores com economia de dados/energia, autoplay pode falhar; o botão Play cobre esse caso. Sem dados reais de usuários, nenhuma nota de Core Web Vitals ou conversão é prometida.

## 16. Substituir depoimentos

No `index.html`, procure `<!-- SUBSTITUIR POR DEPOIMENTO REAL -->`. Existem três posições. Substitua foto, nome, cidade e relato, com autorização do adulto. Não invente números, avaliações ou conversas. Remova o rótulo de espaço reservado somente após inserir os relatos verdadeiros. A imagem da mãe deve ser um `<img>` com dimensões definidas e texto alternativo apropriado.

## 17–18. Consentimento e mídia real

> Utilize somente fotos e vídeos de crianças com autorização dos pais ou responsáveis.

Exigem especial atenção os quatro `video-0X.mp4`, suas capas e as duas `crianca-atividade-0X.webp`. Uma criança identificável em qualquer outra imagem ou vídeo também exige autorização apropriada. Guarde os registros fora do repositório público. Não publique nome da criança, escola, endereço ou informação médica. Previews de atividades precisam de direito de uso dos materiais; depoimentos/fotos das mães precisam de autorização do adulto. Não utilize material encontrado na internet como cliente real.

## Garantia e textos legais

`GUARANTEE_ENABLED` começa como `false`. Confirme a política no checkout; se aplicável, ative e ajuste `GUARANTEE_DAYS`. Ajuste a resposta do FAQ e `politica-de-reembolso.html` para refletir exatamente o combinado e direitos aplicáveis. Nenhuma garantia adicional foi assumida.

Preencha todos os campos entre colchetes nos documentos legais. Eles são uma base editorial pendente de revisão, não uma política definitiva de uma empresa cuja operação ainda não foi informada.

## Checklist final de lançamento

- Checkout certo para cada preço, compra de teste e entrega do acesso funcionando.
- Composição dos kits, faixa etária, quantidade, licença, bônus e condições de acesso confirmados.
- Todos os placeholders de mídia/depoimentos e textos legais substituídos/revisados.
- Dados reais de suporte e empresa preenchidos.
- Domain, canonical, robots e sitemap atualizados.
- Mobile real, autoplay/Play, áudio e histórico testados na URL de produção.
- Pixels somente após configuração e consentimento aplicável.
- Não anunciar alfabetização garantida, resultados em prazo fixo ou tratamento de condição médica.
