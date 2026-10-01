# Verificação da entrega — 01/10/2026

## Executado e aprovado

- Validação de sintaxe dos seis arquivos JavaScript com Node.
- Verificação dos HTMLs: referências locais, âncoras, IDs exclusivos, idioma e JSON da Vercel.
- Chrome disponível no ambiente: inspeção visual desktop e layout mobile de 390 px em iframe real.
- Responsividade renderizada no Chrome em 360, 390, 430, 768, 1366 e 1920 px: sem overflow horizontal; imagens presentes; CTA principal com 54 px.
- Galerias de vídeos, fotos e prévias com duas colunas em 360/390/430/768 px. Vídeos e prévias com quatro colunas em 1366/1920 px.
- Básico abre modal com R$ 22,00; diferença de R$ 12,00; economia de R$ 5,90; desconto arredondado de 21%.
- Fechar pelo X e por Escape. Tab/Shift+Tab permanecem no modal; fechar restaura foco ao botão que o abriu.
- Aceitar e recusar upsell com links temporários locais: destinos UPSELL e BASIC corretos. Completo direto e saída encaminham aos destinos COMPLETE e EXIT. Links temporários foram removidos da versão final.
- Links não configurados mostram status; não abrem domínios fictícios.
- FAQ abre resposta. Lightbox abre a imagem e fecha por Escape.
- Links para as três páginas legais abrem o documento correto.
- Vídeos sem `src` no carregamento inicial da página. Ao aproximar a seção, os quatro MP4s chegam a `readyState = 4`, duração 3 s, reproduzem silenciados; pausa/reprodução manual funcionam; `loop` está ativo.
- Botões de som alternam `muted`; ao ativar o segundo, o primeiro volta a ficar mudo. Os MP4s demonstrativos não têm áudio; áudio perceptível precisa ser validado com os arquivos reais.
- Falha de `play()` simulada no Chrome: mostra Play; ação manual inicia reprodução.
- Preferência de redução de movimento simulada no Chrome: não carrega MP4 nem reproduz automaticamente; ação Play inicia normalmente. Corrigido autoplay nativo ao anexar fonte nesse modo.
- Ramo mobile de histórico executado no Chrome com detecção touch simulada: uma guarda; recarga não adiciona outra; âncora, abrir e fechar modal não redirecionam; Voltar abre a oferta; recusar sai para a origem; nova visita na mesma sessão não repete a oferta.
- Exit intent desktop com eventos de ponteiro simulados: modal na primeira saída pelo topo; depois de fechar, não repete na sessão.
- Nenhum erro de JavaScript do site encontrado no console durante esses fluxos.
- Integridade do ZIP e referências locais verificadas após remoção da instrumentação.

## Limites de cobertura

- Edge, Firefox e Safari não foram executados. O ambiente disponibilizou Chrome; a tentativa de obter browsers adicionais não forneceu executáveis utilizáveis.
- iPhone e Android físicos não foram utilizados. Larguras mobile reais foram renderizadas em iframe Chrome, sem emulação completa de sistema operacional.
- Histórico mobile, exit intent desktop e redução de movimento tiveram instrumentação exclusivamente de teste, removida da entrega. Isso valida os ramos do código; gestos, BFCache e políticas de mídia ainda precisam de validação em aparelhos reais.
- Não houve pagamento, teste com gateway real nem entrega de PDF real porque os links e materiais ainda não foram fornecidos.
- Não há medição de Core Web Vitals de usuários reais, nota Lighthouse prometida, taxa de conversão ou alegação de resultado pedagógico.
- Os documentos legais são conteúdo-base a revisar, e a garantia está desativada.

## Antes de tráfego pago

Substituir mídia e depoimentos; confirmar oferta e licença; preencher os checkouts e dados reais da empresa; testar uma compra e entrega; verificar Safari/iPhone, Chrome/Android, Edge e Firefox na URL definitiva. O README descreve a configuração e os caminhos de teste.
