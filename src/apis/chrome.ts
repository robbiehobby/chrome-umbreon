export const defaultSettings: Settings = {
  website: {
    hostname: "*",
    on: false,
    mode: "global",
    overlay: { opacity: 0.5, color: "#18181a" },
  },
  global: {
    overlay: { opacity: 0.5, color: "#18181a" },
  },
};

export default function chromeApi() {}

chromeApi.getSettings = async () => {
  try {
    return await chrome.runtime.sendMessage({ type: "getSettings" });
  } catch (_error) {
    return structuredClone(defaultSettings);
  }
};

chromeApi.saveSettings = async (settings: Settings, reset = false) => {
  try {
    if (reset) await chrome.runtime.sendMessage({ type: "resetSettings" });
    else await chrome.runtime.sendMessage({ type: "saveSettings", payload: settings });
  } catch (_error) {}
};
