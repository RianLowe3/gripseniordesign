// ── Full-screen scroll features ──────────────────────────────
const FS_FEATURES = [
  {
    index: "01",
    title: "Sensor Glove Input",
    desc: "GRIP captures finger motion through the wearable glove and wirelessly transmits that data for real-time robotic hand replication.",
    orbit: "15deg 75deg 2.8m",
    target: "0m 0m 0m"
  },
  {
    index: "02",
    title: "Calibration & Safety",
    desc: "Calibration captures user range-of-motion while control logic enforces safe motion limits and stable actuation behavior.",
    orbit: "90deg 80deg 2.8m",
    target: "0m 0m 0m"
  },
  {
    index: "03",
    title: "Low-Latency Response",
    desc: "The system is designed for responsive, low-latency motion transfer so the robotic hand mirrors user motion as naturally as possible.",
    orbit: "180deg 75deg 2.8m",
    target: "0m 0m 0m"
  },
  {
    index: "04",
    title: "Wireless Control",
    desc: "Embedded control and wireless communication allow GRIP to operate remotely without requiring direct wired interaction during use.",
    orbit: "35deg 75deg 2.8m",
    target: "0m 0m 0m"
  }
];

(function () {
  const viewer       = document.getElementById("gripViewer");
  const overlayText  = document.getElementById("fsOverlayText");
  const fsIndex      = document.getElementById("fsIndex");
  const fsTitle      = document.getElementById("fsTitle");
  const fsDesc       = document.getElementById("fsDesc");
  const progressFill = document.getElementById("fsProgressFill");
  const pillDock     = document.getElementById("fsPillDock");
  const pills        = pillDock ? pillDock.querySelectorAll(".fs-pill") : [];
  const panels       = document.querySelectorAll(".fs-panel");

  if (!panels.length) return;

  let currentFeature = 0;

  function setFeature(idx, fromPill = false) {
    if (idx === currentFeature && !fromPill) return;
    currentFeature = idx;

    const f = FS_FEATURES[idx];

    // Swap text with fade
    overlayText.classList.add("swapping");
    setTimeout(() => {
      fsIndex.textContent = f.index;
      fsTitle.textContent  = f.title;
      fsDesc.textContent   = f.desc;
      overlayText.classList.remove("swapping");
    }, 320);

    // Rotate model
    if (viewer) {
      viewer.cameraOrbit  = f.orbit;
      viewer.cameraTarget = f.target;
    }

    // Update pills
    pills.forEach((p, i) => p.classList.toggle("active", i === idx));

    // Update progress bar
    progressFill.style.height = ((idx + 1) / FS_FEATURES.length * 100) + "%";
  }

  // ── Scroll-driven switching ──
  function onScroll() {
    const panelContainer = document.getElementById("fsScrollPanels");
    if (!panelContainer) return;

    const containerTop    = panelContainer.getBoundingClientRect().top;
    const containerHeight = panelContainer.offsetHeight;
    const progress        = Math.max(0, Math.min(1, -containerTop / (containerHeight - window.innerHeight)));
    const idx             = Math.min(FS_FEATURES.length - 1, Math.floor(progress * FS_FEATURES.length));

    setFeature(idx);
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // ── Pill clicks ──
  pills.forEach((pill, i) => {
    pill.addEventListener("click", () => {
      setFeature(i, true);

      // Scroll to that panel's position
      const panelContainer = document.getElementById("fsScrollPanels");
      if (!panelContainer) return;
      const panelHeight = panelContainer.offsetHeight / FS_FEATURES.length;
      const targetScroll = panelContainer.offsetTop + panelHeight * i;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    });
  });

  // Init
  setFeature(0, true);
})();