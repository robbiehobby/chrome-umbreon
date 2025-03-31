import { defaultSettings } from "../hooks/chrome.ts";

async function updateTabs(settings: typeof defaultSettings) {
  const tabs = await chrome.tabs.query({ url: `*://${settings.website.hostname}/*` });
  if (!tabs) return;

  await Promise.all(
    tabs.map(async (tab) => {
      if (!tab.id) return;
      try {
        await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["assets/content.js"] });
      } catch (_error) {}
    }),
  );
}

async function getSettings() {
  const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
  const settings = structuredClone(defaultSettings);

  const globalSettings = await chrome.storage.local.get(["_global"]);
  if (globalSettings._global) settings.global = globalSettings._global;

  // Check whether the current tab can run content scripts.
  if (!tabs.length || !tabs[0].id || !tabs[0].url) return settings;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => true,
    });
  } catch (_error) {
    return settings;
  }

  const { hostname } = new URL(tabs[0].url);
  settings.website.hostname = hostname;

  const websiteSettings = await chrome.storage.local.get([hostname]);
  if (websiteSettings[hostname]) settings.website = websiteSettings[hostname];

  return settings;
}

async function saveSettings(newSettings: typeof defaultSettings) {
  if (newSettings.website.hostname === "*" || newSettings.website.mode === "global") {
    await chrome.storage.local.set({ _global: newSettings.global });
  }
  // Do not save website settings for tabs that cannot run content scripts.
  if (newSettings.website.hostname === "*") return;

  const settings = await getSettings();
  await chrome.storage.local.set({ [settings.website.hostname]: newSettings.website });
  await updateTabs(newSettings);
}

chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (sender.id !== chrome.runtime.id) return;

  switch (message.type) {
    case "getSettings":
      getSettings().then((values) => response(values));
      return true;

    case "saveSettings":
      saveSettings(message.payload);
      break;

    case "resetSettings":
      chrome.storage.local.clear().then(() => updateTabs(defaultSettings));
      break;
  }
});

// Watch for the toggle command to be activated.
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "toggle-dimmer") return;
  const settings = await getSettings();
  if (settings) {
    settings.website.on = !settings.website.on;
    await saveSettings(settings);
  }
});

// Watch for the active tab to change.
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (activeInfo.tabId) await updateTabs(await getSettings());
});
