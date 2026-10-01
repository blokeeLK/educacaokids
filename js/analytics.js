(() => {
  const sent = new Set();
  window.trackEvent = function(eventName, parameters = {}, onceKey = null) {
    if (onceKey && sent.has(onceKey)) return;
    if (onceKey) sent.add(onceKey);
    const payload = { event: eventName, ...parameters };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    try { if (typeof window.fbq === "function") window.fbq("trackCustom", eventName, parameters); } catch (_) {}
    try { if (window.ttq && typeof window.ttq.track === "function") window.ttq.track(eventName, parameters); } catch (_) {}
    if (location.hostname === "localhost" || location.protocol === "file:") console.info("[analytics]", payload);
  };
})();
