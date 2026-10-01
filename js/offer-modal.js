(() => {
 let origin = null;
 const dialogs = document.querySelectorAll('dialog');
 window.openSiteDialog = id => {
   const dialog = document.getElementById(id);
   if (!dialog || dialog.open) return;
   dialogs.forEach(d => {if(d.open) d.close();});
   origin = document.activeElement;
   dialog.showModal();
   document.body.classList.add('dialog-open');
   requestAnimationFrame(() => dialog.querySelector('[data-close]')?.focus());
 };
 dialogs.forEach(dialog => {
   dialog.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => dialog.close()));
   dialog.addEventListener('click', e => {
     if (e.target !== dialog) return;
     const r = dialog.getBoundingClientRect();
     if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
   });
   dialog.addEventListener('close', () => {
     if(!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open');
     origin?.focus({preventScroll:true});
   });
   // showModal fornece inert no fundo, Escape e confinamento nativo de foco.
   dialog.addEventListener('keydown', e => {
     if(e.key !== 'Tab') return;
     const f = [...dialog.querySelectorAll('button,a[href],input,[tabindex="0"]')].filter(el=>!el.disabled && el.getClientRects().length);
     if(!f.length) {e.preventDefault(); return;}
     if(e.shiftKey && document.activeElement === f[0]) {e.preventDefault(); f.at(-1).focus();}
     else if(!e.shiftKey && document.activeElement === f.at(-1)) {e.preventDefault(); f[0].focus();}
   });
 });
 document.querySelectorAll('[data-basic]').forEach(b => b.addEventListener('click', () => {
   trackEvent('cta_basic_click', {price:SITE_CONFIG.BASIC_PRICE});
   openSiteDialog('upsell-modal');trackEvent('upsell_view', {price:SITE_CONFIG.UPSELL_PRICE});
 }));
 document.querySelectorAll('[data-complete]').forEach(b => b.addEventListener('click', () => {
   trackEvent('cta_complete_click',{price:SITE_CONFIG.COMPLETE_PRICE});goCheckout('COMPLETE');
 }));
 document.querySelectorAll('[data-checkout]').forEach(b => b.addEventListener('click', () => {
   const type=b.dataset.checkout;
   trackEvent(({UPSELL:'upsell_accept',BASIC:'upsell_decline',EXIT:'exit_offer_accept'})[type],{price:SITE_CONFIG[type+'_PRICE']});
   goCheckout(type);
 }));
})();
