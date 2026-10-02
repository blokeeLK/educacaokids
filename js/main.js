document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.EDUKIDS_CONFIG || {};
  const money = value => Number(value || 0).toFixed(2).replace(".", ",");
  document.querySelectorAll("[data-brand]").forEach(el => el.textContent = cfg.BRAND_NAME || "Educação Kids");
  document.querySelectorAll("[data-bible-count]").forEach(el => el.textContent = cfg.BIBLE_ACTIVITY_COUNT || "400+");
  document.querySelectorAll("[data-exit-price]").forEach(el => el.textContent = `R$ ${money(cfg.EXIT_PRICE || 17.90)}`);
  document.querySelectorAll("[data-basic-price]").forEach(el => el.textContent = String(Math.floor(cfg.BASIC_PRICE || 10)));
  document.querySelectorAll("[data-complete-price]").forEach(el => el.textContent = String(Math.floor(cfg.COMPLETE_PRICE || 27.90)));
  const year = document.getElementById("year"); if (year) year.textContent = new Date().getFullYear();

  const header = document.getElementById("siteHeader");
  const buybar = document.getElementById("mobileBuybar");
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", scrollY > 8);
    if (buybar) buybar.classList.toggle("show", innerWidth < 900 && scrollY > 680 && scrollY < document.documentElement.scrollHeight - innerHeight - 450);
  };
  addEventListener("scroll", onScroll, { passive:true }); onScroll();

  const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
  }), { threshold:.09, rootMargin:"0px 0px -18px" });
  document.querySelectorAll(".reveal,.reveal-stagger").forEach(el => revealObserver.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const id = a.getAttribute("href"); const target = id && id !== "#" ? document.querySelector(id) : null;
    if (!target) return; e.preventDefault(); target.scrollIntoView({behavior:"smooth",block:"start"});
  }));

  const lightbox = document.getElementById("lightbox"); const lightboxImg = lightbox?.querySelector("img");
  const openLightbox = src => { if (!lightbox || !lightboxImg) return; lightboxImg.src = src; lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; };
  const closeLightbox = () => { if (!lightbox) return; lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden","true"); document.body.style.overflow=""; };
  document.querySelectorAll("[data-lightbox]").forEach(btn => btn.addEventListener("click", () => openLightbox(btn.dataset.lightbox)));
  document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

  const observeOnce = (id,eventName,key) => { const el=document.getElementById(id); if(!el) return; const obs=new IntersectionObserver(es=>{if(es[0].isIntersecting){trackEvent(eventName,{},key);obs.disconnect();}},{threshold:.28});obs.observe(el); };
  observeOnce("beneficios","benefits_view","benefits_view");
  observeOnce("provas","proof_view","proof_view");
  observeOnce("bible","bible_section_view","bible_view");
  observeOnce("oferta","pricing_view","pricing_view");
});
