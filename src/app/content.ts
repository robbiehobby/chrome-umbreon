import { defaultSettings } from "../hooks/chrome.ts";

(function () {
  let overlay: HTMLElement | null = document.querySelector("screen-dimmer");

  if (!overlay) {
    let localSettings: typeof defaultSettings | undefined;
    let localMode;
    try {
      localSettings = JSON.parse(localStorage.getItem("screen-dimmer") || "");
      localMode = localSettings?.website.mode;
    } catch (_e) {}

    overlay = document.createElement("screen-dimmer") as HTMLElement;
    overlay.style.position = "fixed";
    overlay.style.zIndex = "2147483647";
    overlay.style.inset = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.visibility = localSettings?.website.on ? "visible" : "hidden";
    if (localSettings && localMode) {
      overlay.style.opacity = String(localSettings[localMode].overlay.opacity);
      overlay.style.backgroundColor = localSettings[localMode].overlay.color;
    } else {
      overlay.style.opacity = "0";
      overlay.style.backgroundColor = "#000";
    }
    overlay.style.mixBlendMode = "multiply";
    document.documentElement.appendChild(overlay);
  }

  function init(settings: typeof defaultSettings) {
    if (!overlay || !settings) return;
    const { mode } = settings.website;

    overlay.style.visibility = settings.website.on ? "visible" : "hidden";
    overlay.style.opacity = settings.website.on ? String(settings[mode].overlay.opacity) : "0";
    overlay.style.backgroundColor = settings[mode].overlay.color;

    if (!overlay.style.transition) {
      setTimeout(() => {
        overlay.style.transition = "all";
        overlay.style.transitionDuration = "0.25s";
        overlay.style.transitionTimingFunction = "ease";
      });
    }

    localStorage.setItem("screen-dimmer", JSON.stringify(settings));
  }

  chrome.runtime.sendMessage({ type: "getSettings" }, (settings: typeof defaultSettings) => init(settings));
})();
