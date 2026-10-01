document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.EDUKIDS_CONFIG || {};
  document.querySelectorAll("[data-brand]").forEach(el => el.textContent = cfg.BRAND_NAME || "Educação Kids");
  document.querySelectorAll("[data-exit-price]").forEach(el => el.textContent = `R$ ${(cfg.EXIT_PRICE || 17.9).toFixed(2).replace('.', ',')}`);
  const year = document.getElementById("year"); if (year) year.textContent = new Date().getFullYear();

  const header = document.getElementById("siteHeader");
  const buybar = document.getElementById("mobileBuybar");
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", scrollY > 10);
    if (buybar) buybar.classList.toggle("show", scrollY > 620 && scrollY < document.documentElement.scrollHeight - innerHeight - 500);
  };
  addEventListener("scroll", onScroll, { passive:true }); onScroll();

  const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
  }), { threshold:.12, rootMargin:"0px 0px -20px" });
  document.querySelectorAll(".reveal,.reveal-stagger").forEach(el => revealObserver.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const id = a.getAttribute("href"); if (id === "#" || !document.querySelector(id)) return;
    e.preventDefault(); document.querySelector(id).scrollIntoView({behavior:"smooth",block:"start"});
  }));

  const lightbox = document.getElementById("lightbox"); const lightboxImg = lightbox?.querySelector("img");
  document.querySelectorAll("[data-lightbox]").forEach(btn => btn.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return; lightboxImg.src = btn.dataset.lightbox; lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
  }));
  const closeLightbox = () => { if (!lightbox) return; lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden","true"); document.body.style.overflow=""; };
  document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

  const pricing = document.getElementById("precos");
  if (pricing) new IntersectionObserver(entries => { if (entries[0].isIntersecting) trackEvent("pricing_view",{},"pricing_view"); },{threshold:.35}).observe(pricing);
  const bible = document.getElementById("bible");
  if (bible) new IntersectionObserver(entries => { if (entries[0].isIntersecting) trackEvent("bible_section_view",{},"bible_view"); },{threshold:.35}).observe(bible);
});
