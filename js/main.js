(() => {
 const C=SITE_CONFIG;
 window.money=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
 document.querySelectorAll('[data-config]').forEach(el=>{const key=el.dataset.config;if(C[key]!==undefined)el.textContent=key.endsWith('_PRICE')?money(C[key]):C[key];});
 const savings=C.COMPLETE_PRICE-C.UPSELL_PRICE;
 document.querySelectorAll('[data-saving]').forEach(el=>el.textContent=money(savings));
 document.querySelectorAll('[data-extra]').forEach(el=>el.textContent=money(C.UPSELL_PRICE-C.BASIC_PRICE));
 document.querySelectorAll('[data-discount]').forEach(el=>el.textContent=Math.round(savings/C.COMPLETE_PRICE*100)+'%');
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 if(C.HERO_VARIANT==='B' && document.querySelector('#hero-title')) document.querySelector('#hero-title').textContent='Uma forma simples de participar mais de perto da alfabetização do seu pequeno — sem precisar inventar atividades todos os dias.';
 document.querySelectorAll('[data-guarantee]').forEach(el=>el.hidden=!C.GUARANTEE_ENABLED);
 document.querySelectorAll('[data-guarantee-days]').forEach(el=>el.textContent=C.GUARANTEE_DAYS);
 if(!C.DEMO_MEDIA) document.querySelectorAll('[data-demo]').forEach(el=>el.hidden=true);
 if(C.SITE_URL) {
   const base=C.SITE_URL.replace(/\/$/,'');
   document.querySelector('link[rel="canonical"]')?.setAttribute('href',base+location.pathname);
   document.querySelector('meta[property="og:url"]')?.setAttribute('content',base+location.pathname);
   if(document.body.dataset.page==='home') {
     const schema=document.createElement('script');schema.type='application/ld+json';
     schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Product',name:C.PRODUCT_NAME,description:'Material educacional digital complementar para imprimir.',image:base+'/assets/images/hero.webp',offers:[['BASIC',C.BASIC_PRICE],['COMPLETE',C.COMPLETE_PRICE]].map(([k,p])=>({'@type':'Offer',name:k==='BASIC'?'Kit Básico':'Kit Completo',price:p.toFixed(2),priceCurrency:'BRL',url:base+'/#kits'}))});
     document.head.appendChild(schema);
   }
 }
 window.goCheckout=type=> {
   const url=C['CHECKOUT_'+type+'_URL'];
   if(!url || /SEU-CHECKOUT/i.test(url)) {
     const s=document.getElementById('site-status');s.textContent='O link de pagamento ainda não foi configurado. Entre em contato com o suporte.';s.hidden=false;
     // Status também dentro do modal para leitura por tecnologia assistiva.
     const d=document.querySelector('dialog[open] .checkout-status');if(d){d.textContent=s.textContent;d.hidden=false;}
     return;
   }
   let parsed;try{parsed=new URL(url);}catch{return;}
   if(parsed.protocol!=='https:' && parsed.protocol!=='http:')return;
   window.checkoutPending=true;location.assign(parsed.href);
 };
 document.querySelectorAll('[data-support]').forEach(a=>{
   if(C.WHATSAPP && /^\d{10,15}$/.test(C.WHATSAPP)){a.href='https://wa.me/'+C.WHATSAPP+'?text='+encodeURIComponent('Olá! Quero saber mais sobre o '+C.PRODUCT_NAME+'.');}
   else if(C.SUPPORT_EMAIL){a.href='mailto:'+C.SUPPORT_EMAIL;}
   else {a.href='suporte.html';}
 });
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
   const target=document.getElementById(a.getAttribute('href').slice(1));if(!target)return;
   e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
   target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
 }));
 const header=document.querySelector('.header');
 const sticky=()=>header?.classList.toggle('is-sticky',scrollY>80);
 addEventListener('scroll',sticky,{passive:true});sticky();
 document.querySelectorAll('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>{
   const img=document.querySelector('#lightbox img'),src=b.querySelector('img');img.src=src.src;img.alt=src.alt;
   document.getElementById('lightbox-title').textContent=src.alt;openSiteDialog('lightbox');
 }));
 const views=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){trackEvent(e.target.dataset.view,{},true);views.unobserve(e.target);}}),{threshold:.15});
 document.querySelectorAll('[data-view]').forEach(el=>views.observe(el));
 if(document.body.dataset.page==='home')trackEvent('view_content',{},true);
})();
