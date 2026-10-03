document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.EDUKIDS_CONFIG || {};
  const modal = document.getElementById("upsellModal");
  let previousFocus = null;
  const isUnavailable = url => !url;
  const toast = msg => { const el = document.getElementById("toast"); if (!el) return; el.textContent = msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),3200); };
  const navigate = (url, eventName) => {
    trackEvent(eventName || "checkout_click", { destination:url || "" });
    if (isUnavailable(url)) { toast("O checkout ainda não está disponível. Tente novamente em instantes."); return; }
    sessionStorage.setItem("edukidsNavigatingToCheckout","1");
    location.href = url;
  };
  window.eduKidsNavigate = navigate;
  const open = () => { if (!modal) return; previousFocus = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; trackEvent("upsell_view",{},"upsell_view"); setTimeout(()=>document.getElementById("acceptUpsell")?.focus(),40); };
  const close = () => { if (!modal) return; modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow=""; previousFocus?.focus?.(); };
  document.querySelectorAll(".js-basic-offer").forEach(btn => btn.addEventListener("click", () => { trackEvent("cta_basic_click"); open(); }));
  document.querySelectorAll(".js-complete-buy").forEach(btn => btn.addEventListener("click", () => navigate(cfg.CHECKOUT_COMPLETE_URL,"cta_complete_click")));
  document.querySelectorAll("[data-modal-close]").forEach(el => el.addEventListener("click", close));
  document.getElementById("acceptUpsell")?.addEventListener("click", () => navigate(cfg.CHECKOUT_UPSELL_URL,"upsell_accept"));
  document.getElementById("declineUpsell")?.addEventListener("click", () => { trackEvent("upsell_decline"); navigate(cfg.CHECKOUT_BASIC_URL,"checkout_basic"); });
  modal?.addEventListener("keydown", e => {
    if (e.key === "Escape") close();
    if (e.key !== "Tab") return;
    const focusables=[...modal.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(x=>!x.disabled);
    if (!focusables.length) return; const first=focusables[0], last=focusables[focusables.length-1];
    if (e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();} else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
  });
});
