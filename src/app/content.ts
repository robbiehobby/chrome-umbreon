(function () {
  let overlay: HTMLElement | null = document.querySelector("screen-dimmer");

  function update(settings: Settings, type: UpdateType = null) {
    if (!overlay) return;
    const mode = settings[settings.website.mode];

    if (type === "activated") overlay.style.transitionProperty = "none";

    overlay.style.visibility = settings.website.on ? "visible" : "hidden";
    overlay.style.opacity = settings.website.on ? String(mode.overlay.opacity) : "0";
    overlay.style.backgroundColor = mode.overlay.color;
    overlay.style.transitionDuration = "0.15s";
    overlay.style.transitionTimingFunction = "ease";

    setTimeout(() => {
      overlay!.style.transitionProperty = "visibility, opacity";
    }, 200);
  }

  async function create() {
    overlay = document.createElement("screen-dimmer") as HTMLElement;
    overlay.style.position = "fixed";
    overlay.style.zIndex = "2147483647";
    overlay.style.inset = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.visibility = "hidden";
    overlay.style.opacity = "0";
    overlay.style.backgroundColor = "#000";
    overlay.style.mixBlendMode = "multiply";
    document.documentElement.appendChild(overlay);

    // Try to load the settings from local storage first.
    let settings: Settings | null = null;
    try {
      settings = JSON.parse(localStorage.getItem("screen-dimmer") || "");
    } catch (_error) {}
    if (!settings) {
      settings = await chrome.runtime.sendMessage({ type: "getSettings" });
    }
    if (settings) update(settings);
  }
  if (!overlay) create();

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (sender.id === chrome.runtime.id && message.action === "update") {
      localStorage.setItem("screen-dimmer", JSON.stringify(message.payload.settings));
      update(message.payload.settings, message.payload.type);
    }
  });
})();
