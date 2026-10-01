(() => {
 const C=SITE_CONFIG, KEY='exitOfferShown';
 let memorySeen=false, storageAvailable=true;
 const seen=()=>{try{return memorySeen || sessionStorage.getItem(KEY)==='true';}catch{return memorySeen;}};
 const mark=()=>{memorySeen=true;try{sessionStorage.setItem(KEY,'true');}catch{storageAvailable=false;}};
 try{sessionStorage.setItem('ek_storage_probe','1');sessionStorage.removeItem('ek_storage_probe');}catch{storageAvailable=false;}
 const isOffer=document.body.dataset.page==='exit';
 window.checkoutPending=false;
 if(isOffer) {
   mark();trackEvent('exit_offer_view',{price:C.EXIT_PRICE},true);
   document.querySelector('[data-leave]')?.addEventListener('click',()=>{
     // A oferta substitui a entrada principal: voltar não retorna a uma armadilha.
     if(history.length>1) history.back();
     else location.replace('saida.html');
   });return;
 }
 if(!C.EXIT_OFFER_ENABLED || !storageAvailable || document.body.dataset.page!=='home') return;
 let interacted=false, armed=Boolean(history.state?.ekGuard), armedToken=history.state?.ekGuard, consumed=false, priorY=null, upward=false;
 const mobile=matchMedia('(hover: none) and (pointer: coarse)').matches;
 const eligible=()=> !seen() && !window.checkoutPending && !document.querySelector('dialog[open]') && !document.hidden;
 function arm(e) {
   if(!e.isTrusted || e.target.closest('a,button,video,dialog,input,summary')) return;
   interacted=true;
   if(!mobile || !C.EXIT_MOBILE_ENABLED || armed || consumed || !eligible()) return;
   // Uma única guarda, mesma URL; âncoras internas não adicionam histórico.
   try {
     const token=crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
     history.replaceState({...history.state,ekBase:token},'',location.href);
     history.pushState({...history.state,ekGuard:token},'',location.href);
     armedToken=token;armed=true;
   } catch { consumed=true; }
 }
 document.addEventListener('pointerdown',arm,{passive:true});
 document.addEventListener('keydown',arm);
 addEventListener('popstate',()=>{
   if(!armed || consumed) return;
   armed=false;consumed=true;
   if(document.querySelector('dialog[open]')) {document.querySelector('dialog[open]').close();return;}
   if(!eligible() || history.state?.ekBase!==armedToken || history.state?.ekGuard) return;
   mark();location.replace('oferta-especial.html');
 });
 // Restauração pelo cache do navegador nunca arma outra guarda.
 addEventListener('pageshow',e=>{if(e.persisted){consumed=true;armed=false;}});
 if(!mobile && C.EXIT_DESKTOP_ENABLED) {
   document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;upward=priorY!==null && e.clientY<priorY;priorY=e.clientY;},{passive:true});
   document.addEventListener('mouseout',e=>{
     const progress=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);
     if(e.relatedTarget || e.clientY>0 || !upward || priorY>65 || (!interacted && progress<.2) || !eligible())return;
     mark();openSiteDialog('exit-modal');trackEvent('exit_offer_view',{price:C.EXIT_PRICE},true);
   });
 }
})();
