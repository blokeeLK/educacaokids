(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const cards = [...document.querySelectorAll('.video-card')];
 let activeSound=null;
 function load(v) { if (!v.getAttribute('src')) {v.src=v.dataset.src;v.load();} }
 function fallback(card) { card.querySelector('[data-play]').hidden=false; }
 function play(card,manual=false) {
   const v=card.querySelector('video');
   if(reduced.matches && !manual) {v.autoplay=false;v.pause();fallback(card);return;}
   load(v);
   const p=v.play();if(p) p.then(()=>{card.querySelector('[data-play]').hidden=true;}).catch(()=>fallback(card));
 }
 cards.forEach((card,i)=> {
   const v=card.querySelector('video'),sound=card.querySelector('[data-sound]'),pause=card.querySelector('[data-pause]');
   v.autoplay=!reduced.matches;
   v.addEventListener('error',()=>{fallback(card);card.querySelector('.video-status').textContent='Vídeo indisponível. Tente reproduzir novamente.';});
   v.addEventListener('pause',()=>{pause.textContent='Reproduzir';pause.setAttribute('aria-label',`Reproduzir vídeo ${i+1}`);});
   v.addEventListener('play',()=>{pause.textContent='Pausar';pause.setAttribute('aria-label',`Pausar vídeo ${i+1}`);});
   card.querySelector('[data-play]').addEventListener('click',()=>{delete v.dataset.userPaused;play(card,true);});
   pause.addEventListener('click',()=>{if(v.paused) {delete v.dataset.userPaused;play(card,true);} else {v.pause();v.dataset.userPaused='true';}});
   sound.addEventListener('click',()=>{
     const unmute=v.muted;
     if(unmute && activeSound && activeSound!==v) {activeSound.muted=true;sync(activeSound);}
     v.muted=!unmute;activeSound=unmute?v:null;sync(v);if(v.paused) play(card,true);
   });
   function sync(video) {
     const b=video.closest('.video-card').querySelector('[data-sound]');b.textContent=video.muted?'Ativar som':'Silenciar';b.setAttribute('aria-pressed',String(!video.muted));
   }
 });
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
   const v=e.target.querySelector('video');
   if(e.isIntersecting) {if(!v.dataset.userPaused) play(e.target);}
   else v.pause();
 }),{rootMargin:'250px 0px',threshold:0});
 cards.forEach(c=>observer.observe(c));
 document.addEventListener('visibilitychange',()=>{if(document.hidden) cards.forEach(c=>c.querySelector('video').pause());else cards.forEach(c=>{const r=c.getBoundingClientRect();if(r.bottom>-250 && r.top<innerHeight+250 && !c.querySelector('video').dataset.userPaused) play(c);});});
 reduced.addEventListener('change',()=>{cards.forEach(c=>{const v=c.querySelector('video');v.autoplay=!reduced.matches;if(reduced.matches){v.pause();fallback(c);}});});
})();
