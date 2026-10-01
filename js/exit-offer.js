document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.EDUKIDS_CONFIG || {};
  const KEY = "edukidsExitOfferShown";
  const GUARD = "edukidsBackGuardInstalled";
  const modal = document.getElementById("exitModal");
  let interacted = false, mouseArmed = false;
  const seen = () => sessionStorage.getItem(KEY) === "1";
  const markSeen = () => sessionStorage.setItem(KEY,"1");
  const openExitModal = () => {
    if (!modal || seen()) return;
    markSeen(); modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; trackEvent("exit_offer_view",{source:"desktop_mouse"},"exit_offer_view");
  };
  const closeExitModal = () => { if (!modal) return; modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow=""; };
  document.querySelectorAll("[data-exit-close]").forEach(el => el.addEventListener("click", closeExitModal));
  document.getElementById("acceptExitOffer")?.addEventListener("click", () => { trackEvent("exit_offer_accept"); window.eduKidsNavigate?.(cfg.CHECKOUT_EXIT_URL,"exit_checkout"); });

  const installBackGuard = () => {
    if (!cfg.ENABLE_BACK_EXIT_OFFER || seen() || sessionStorage.getItem(GUARD)==="1") return;
    try {
      history.pushState({edukidsGuard:true}, "", location.href);
      sessionStorage.setItem(GUARD,"1");
    } catch (_) {}
  };
  const registerInteraction = () => {
    if (interacted) return; interacted = true; mouseArmed = true; installBackGuard();
  };
  ["pointerdown","keydown"].forEach(evt => addEventListener(evt, registerInteraction, {once:true,passive:true}));
  addEventListener("scroll", () => { if (scrollY > 160) registerInteraction(); }, {passive:true});

  addEventListener("popstate", () => {
    if (!cfg.ENABLE_BACK_EXIT_OFFER || seen()) return;
    if (sessionStorage.getItem("edukidsNavigatingToCheckout") === "1") return;
    markSeen(); trackEvent("exit_offer_view",{source:"browser_back"},"exit_offer_view");
    location.replace("oferta-especial.html?src=back");
  });

  if (cfg.ENABLE_DESKTOP_EXIT_INTENT) document.addEventListener("mouseout", e => {
    if (!interacted || !mouseArmed || seen() || innerWidth < 900) return;
    if (e.clientY <= 4 && !e.relatedTarget) openExitModal();
  });
});
