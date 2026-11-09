// Background video: fade-in when ready, pause/play control, respects reduced motion.
(() => {
  const root = document.documentElement;
  const video = document.querySelector("video.sea");
  const toggle = document.querySelector(".motion-toggle");
  if (!video) return;

  const ready = () => root.classList.add("is-ready");
  if (video.readyState >= 2) ready();
  else video.addEventListener("loadeddata", ready, { once: true });
  setTimeout(ready, 3000); // if the video is slow or fails, the poster still shows

  const sync = () => {
    root.classList.toggle("is-paused", video.paused);
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        video.paused ? toggle.dataset.labelPlay : toggle.dataset.labelPause
      );
    }
  };
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
  }
  sync();

  toggle?.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });
})();
