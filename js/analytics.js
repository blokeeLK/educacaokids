(() => {
 const once = new Set();
 window.trackEvent = (eventName, parameters = {}, unique = false) => {
   if (unique && once.has(eventName)) return;
   if (unique) once.add(eventName);
   const detail = { event: eventName, ...parameters };
   document.dispatchEvent(new CustomEvent('site:analytics', {detail}));
   // Nenhum script externo, cookie de marketing ou dado pessoal é enviado por padrão.
   if (!SITE_CONFIG.ANALYTICS_ENABLED || window.analyticsConsent !== true) return;
   if (typeof window.gtag === 'function') window.gtag('event', eventName, parameters);
   if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, parameters);
   if (window.ttq && typeof window.ttq.track === 'function') window.ttq.track(eventName, parameters);
 };
})();
