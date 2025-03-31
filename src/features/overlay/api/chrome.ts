import messagesJson from "../../../locales/en/messages.json";

const overlay = { opacity: 0.5, blend: "multiply", color: "#18181a" };

export const defaultSettings: Settings = {
  website: {
    hostname: "*",
    on: false,
    mode: "global",
    overlay,
  },
  global: { overlay },
};

const messages = messagesJson as {
  [key: string]: { message: string };
};

export default function chromeApi() {}

chromeApi.getMessage = (key: string, substitutions?: string | string[]): string => {
  try {
    return chrome.i18n.getMessage(key, substitutions);
  } catch (_error) {
    return messages[key].message || "";
  }
};

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
