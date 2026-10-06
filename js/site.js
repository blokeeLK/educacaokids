(function(){
  'use strict';

  const BASIC_URL = 'https://pay.cakto.com.br/57cvs4c';
  const OFFER22_URL = 'https://pay.cakto.com.br/evp3xed';

  function initOfferModal(){
    const modal = document.getElementById('alexUpsellModal');
    const accept = document.getElementById('alexAcceptUpsell');
    const decline = document.getElementById('alexDeclineUpsell');
    if(!modal) return;

    function openModal(){
      modal.classList.add('alex-open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }
    function closeModal(){
      modal.classList.remove('alex-open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
    }

    document.addEventListener('click', function(e){
      const basic = e.target.closest('.js-basic-offer');
      if(basic){ e.preventDefault(); openModal(); return; }
      if(e.target.closest('[data-alex-modal-close]')){ e.preventDefault(); closeModal(); }
    });
    if(accept) accept.addEventListener('click', function(){ window.location.href = OFFER22_URL; });
    if(decline) decline.addEventListener('click', function(){ window.location.href = BASIC_URL; });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });
  }

  function initFaq(){
    document.querySelectorAll('[data-alex-faq-button]').forEach(function(btn){
      btn.addEventListener('click', function(){
        const id = btn.getAttribute('data-alex-faq-button');
        const answer = document.querySelector('[data-alex-faq-answer="'+id+'"]');
        if(!answer) return;
        const isOpen = answer.style.display !== 'none';
        document.querySelectorAll('[data-alex-faq-answer]').forEach(function(a){ a.style.display='none'; });
        document.querySelectorAll('[data-alex-faq-button] svg').forEach(function(svg){ svg.style.transform='rotate(0deg)'; });
        if(!isOpen){
          answer.style.display='block';
          const svg = btn.querySelector('svg');
          if(svg) svg.style.transform='rotate(180deg)';
        }
      });
    });
  }

  function initCarousel(){
    const track = document.querySelector('[data-alex-carousel-track]');
    if(!track) return;
    const items = Array.from(track.children);
    const originalCount = Math.floor(items.length / 2) || items.length;
    const dots = Array.from(document.querySelectorAll('[data-alex-carousel-dot]'));
    if(originalCount < 2 || items.length < 2) return;

    let index = 0;
    let timer = null;
    let resetTimer = null;

    function getStepPx(){
      const first = items[0];
      const second = items[1];
      if(!first || !second) return 0;
      return Math.max(0, second.offsetLeft - first.offsetLeft);
    }

    function paintDots(){
      dots.forEach(function(dot,i){
        dot.classList.toggle('bg-[#8B6914]', i === (index % originalCount));
        dot.classList.toggle('bg-gray-300', i !== (index % originalCount));
      });
    }

    function move(animate){
      const step = getStepPx();
      if(!step) return;
      track.style.transition = animate ? 'transform 500ms ease-in-out' : 'none';
      track.style.transform = 'translate3d(-' + (index * step) + 'px,0,0)';
      paintDots();
    }

    function next(){
      clearTimeout(resetTimer);
      index += 1;
      move(true);
      if(index >= originalCount){
        resetTimer = setTimeout(function(){
          index = 0;
          move(false);
          void track.offsetWidth;
          track.style.transition='transform 500ms ease-in-out';
        }, 520);
      }
    }

    function start(){
      clearInterval(timer);
      timer=setInterval(next,3000);
    }

    dots.forEach(function(dot,i){
      dot.addEventListener('click',function(){
        clearTimeout(resetTimer);
        index=i;
        move(true);
        start();
      });
    });

    let resizeTimer = null;
    window.addEventListener('resize',function(){
      clearTimeout(resizeTimer);
      resizeTimer=setTimeout(function(){ move(false); },80);
    }, {passive:true});

    move(false);
    start();
  }

  document.addEventListener('DOMContentLoaded', function(){
    initOfferModal();
    initFaq();
    initCarousel();
  });
})();
