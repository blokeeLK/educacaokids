# Educação Kids — Landing Page

Projeto estático completo para GitHub + Vercel.

## 1. Como publicar
1. Extraia a pasta `educacao-kids-site`.
2. Suba todos os arquivos para um repositório GitHub mantendo a estrutura.
3. No Vercel, importe o repositório.
4. Framework Preset: `Other` / projeto estático.
5. Não é necessário comando de build.

## 2. Onde alterar preços e checkouts
Edite **apenas** `js/config.js`:
- `BASIC_PRICE`
- `COMPLETE_PRICE`
- `UPSELL_PRICE`
- `EXIT_PRICE`
- `CHECKOUT_BASIC_URL`
- `CHECKOUT_COMPLETE_URL`
- `CHECKOUT_UPSELL_URL`
- `CHECKOUT_EXIT_URL`

Os links atuais são placeholders e, por segurança, o site não navega para eles sem você substituir.

## 3. Fluxo comercial configurado
- Kit Básico: R$ 10,00
- Kit Completo normal: R$ 27,90
- Ao clicar no Básico: modal oferece Completo por R$ 22,00
- Oferta de saída configurada: R$ 17,90

## 4. Back redirect / saída
`js/exit-offer.js` usa History API somente depois de uma interação real. Uma única entrada é adicionada por sessão. Na primeira tentativa de voltar, a navegação é substituída por `oferta-especial.html`. O evento é marcado em `sessionStorage`, por isso não entra em loop.

A página de saída usa `location.replace`, então o próximo Back deixa a oferta em vez de prender o visitante no site.

Também existe exit-intent por mouse no desktop. Pode ser desativado em `js/config.js`.

## 5. Vídeos
Substitua:
- `assets/videos/video-01.mp4`
- `assets/videos/video-02.mp4`
- `assets/videos/video-03.mp4`
- `assets/videos/video-04.mp4`

Os vídeos incluídos são arquivos MP4 válidos de demonstração. O JavaScript usa IntersectionObserver, `muted`, `loop`, `playsinline` e começa a carregar quando a pessoa se aproxima da seção.

Para melhor desempenho, exporte os seus vídeos em H.264 MP4, vertical 9:16, idealmente abaixo de 3–5 MB cada.

## 6. Fotos e materiais
Substitua as imagens em `assets/images/` mantendo os mesmos nomes, ou altere os caminhos no HTML.

As imagens atuais são placeholders autorais gerados apenas para demonstrar o layout. Não representam clientes reais.

### Mídia de crianças
Use apenas fotos e vídeos com autorização dos pais ou responsáveis. Não publique nome completo, escola, endereço, informação médica ou qualquer dado desnecessário da criança.

## 7. Depoimentos
O site NÃO possui depoimentos falsos. Há 3 cards identificados como placeholder. Substitua pelo conteúdo real antes de anunciar.

## 8. Nome e marca
Troque `BRAND_NAME` em `js/config.js`. Para alterar a marca visual, edite os elementos `.brand` em `index.html` e o favicon em `assets/images/favicon.svg`.

## 9. Analytics
O arquivo `js/analytics.js` disponibiliza:
`trackEvent(nome, parametros)`

e já tem pontos preparados para:
- `view_content`
- `cta_basic_click`
- `cta_complete_click`
- `upsell_view`
- `upsell_accept`
- `upsell_decline`
- `video_section_view`
- `bible_section_view`
- `pricing_view`
- `exit_offer_view`
- `exit_offer_accept`

Para Meta Pixel, Google Analytics ou TikTok Pixel, adicione o código oficial do fornecedor no `<head>` e preserve `trackEvent` ou adapte a integração.

## 10. Páginas legais
Revise e substitua:
- `[RAZÃO SOCIAL]`
- `[CNPJ]`
- `[E-MAIL]`
- `[ENDEREÇO]` quando necessário.

Os textos fornecidos são modelos técnicos e precisam refletir sua operação real.

## 11. Garantia
A página possui uma seção de 7 dias marcada como configurável. Só mantenha essa promessa se o checkout realmente oferecer essa política.

## 12. Não fazer
- não use promessa de prevenir TDAH, autismo, dislexia ou atraso de fala;
- não crie urgência, avaliações, compradores ou depoimentos falsos;
- não troque os placeholders por fotos de crianças sem autorização.

## 13. Testes recomendados antes de tráfego pago
- Chrome / Edge / Firefox desktop;
- iPhone 360–430 px;
- Android 360–430 px;
- links de checkout reais;
- fluxo R$ 10 → modal R$ 22;
- recusa do upsell → checkout R$ 10;
- kit completo R$ 27,90;
- Back → oferta especial uma única vez;
- Back novamente → saída normal;
- autoplay/loop dos 4 vídeos;
- páginas legais;
- Meta/TikTok/Google eventos, se instalados.


## Atualização de design (versão colorida)

- Hero mais objetivo com foco em benefício e produto.
- Paleta mais colorida inspirada em páginas educacionais: azul para estrutura, laranja para CTA, amarelo para energia, verde para progresso e coral/roxo como apoio visual.
- Três depoimentos em vídeo e três provas em imagem, conforme solicitado.
- Bônus Bible Goods destacado no Kit Completo.
- Não usei a alegação “evita TDAH” no site por segurança jurídica e de anúncios. A copy trabalha atenção, foco, rotina e estímulo de linguagem sem promessa médica.
