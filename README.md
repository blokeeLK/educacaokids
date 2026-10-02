# Educação Kids — Página principal de vendas

Projeto estático em HTML + CSS + JavaScript, pronto para GitHub, Vercel ou Render Static Site.

## Estrutura

- `index.html` — página principal
- `oferta-especial.html` — oferta de saída
- `css/styles.css` — todo o design
- `js/config.js` — preços, quantidades e links de checkout
- `js/main.js` — comportamento da página
- `js/videos.js` — autoplay/loop dos vídeos
- `js/offer-modal.js` — upsell do Básico para o Completo
- `js/exit-offer.js` — comportamento da oferta de saída
- `assets/images/` — imagens e prévias
- `assets/videos/` — vídeos

## Antes de publicar

### 1. Configure os preços e checkouts
Abra `js/config.js` e altere:

- `CHECKOUT_BASIC_URL`
- `CHECKOUT_COMPLETE_URL`
- `CHECKOUT_UPSELL_URL`
- `CHECKOUT_EXIT_URL`
- `BASIC_PRICE`
- `COMPLETE_PRICE`
- `UPSELL_PRICE`
- `EXIT_PRICE`

### 2. Confirme as quantidades
Ainda em `js/config.js`, confirme:

- `MAIN_ACTIVITY_COUNT`
- `BIBLE_ACTIVITY_COUNT`

Não anuncie números maiores do que o conteúdo realmente entregue.

### 3. Troque os depoimentos em vídeo
Substitua mantendo os nomes:

- `assets/videos/video-01.mp4`
- `assets/videos/video-02.mp4`
- `assets/videos/video-03.mp4`

Os vídeos já estão configurados para `muted + autoplay + loop + playsinline`.

### 4. Troque as imagens dos depoimentos
Substitua:

- `assets/images/crianca-atividade-01.webp`
- `assets/images/crianca-atividade-02.webp`
- `assets/images/crianca-atividade-03.webp`

Use somente material real e autorizado.

### 5. Troque as prévias do produto
Substitua `atividade-01.webp` até `atividade-06.webp` pelas páginas reais do produto.

### 6. Bible Goods
Substitua:

- `bible-kit.webp`
- `atividade-biblica-01.webp`
- `atividade-biblica-02.webp`

### 7. Observação sobre TDAH/autismo/fala
A página não afirma que as atividades previnem ou tratam TDAH, autismo, atraso de fala ou outras condições. Isso reduz risco jurídico e de reprovação em anúncios. O posicionamento é educacional: linguagem, consciência fonológica, leitura, escrita, coordenação e rotina de atenção.

## Render
Use Static Site. Não use `vite build`. O projeto não usa Vite.

## Vercel
Framework Preset: `Other`. Build Command: vazio. Output Directory: vazio.

## GitHub
Mantenha a estrutura de pastas. Não mova `styles.css` ou `config.js` para a raiz.
