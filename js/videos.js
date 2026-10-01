document.addEventListener("DOMContentLoaded", () => {
  const videos = [...document.querySelectorAll("[data-autoplay-video]")];
  if (!videos.length) return;
  let sectionTracked = false;
  const loadAndPlay = async (video) => {
    const source = video.querySelector("source[data-src]");
    if (source && !source.src) { source.src = source.dataset.src; video.load(); }
    video.muted = true; video.loop = true; video.playsInline = true;
    try { await video.play(); } catch (_) { /* poster remains visible */ }
  };
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    const v = entry.target;
    if (entry.isIntersecting) { loadAndPlay(v); if (!sectionTracked) { sectionTracked = true; trackEvent("video_section_view",{},"video_section_view"); } }
    else if (!v.paused) v.pause();
  }), { rootMargin:"250px 0px", threshold:.03 });
  videos.forEach(v => { observer.observe(v); v.addEventListener("ended", () => { v.currentTime = 0; v.play().catch(()=>{}); }); });
  document.querySelectorAll(".sound-toggle").forEach(btn => btn.addEventListener("click", () => {
    const video = btn.closest(".video-card")?.querySelector("video"); if (!video) return;
    video.muted = !video.muted; btn.textContent = video.muted ? "Som" : "Sem som"; if (video.paused) video.play().catch(()=>{});
  }));
});
