import { defaultSettings } from "../api/chrome.ts";

async function updateTabs(settings: Settings, type: UpdateType = null) {
  if (type !== "reset" && settings.website.hostname === "*") return;
  const tabs = await chrome.tabs.query({ url: `*://${settings.website.hostname}/*` });
  if (!tabs) return;

  await Promise.all(
    tabs.map(async (tab) => {
      try {
        if (!tab.id) return;
        await chrome.tabs.sendMessage(tab.id, { action: "update", payload: { settings, type } });
      } catch (_error) {}
    }),
  );
}

async function getSettings(tabId?: number) {
  let tab: chrome.tabs.Tab | undefined;
  if (tabId) tab = await chrome.tabs.get(tabId);
  else tab = (await chrome.tabs.query({ currentWindow: true, active: true })).pop();

  const settings = structuredClone(defaultSettings);
  const globalSettings = await chrome.storage.local.get(["_global"]);
  if (globalSettings._global) settings.global = globalSettings._global;

  // Check whether the tab can run content scripts.
  if (!tab?.id || !tab.url) return settings;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => true,
    });
  } catch (_error) {
    return settings;
  }

  const { hostname } = new URL(tab.url);
  settings.website.hostname = hostname;

  const websiteSettings = await chrome.storage.local.get([hostname]);
  if (websiteSettings[hostname]) settings.website = websiteSettings[hostname];

  return settings;
}

async function saveSettings(newSettings: Settings) {
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
      getSettings().then((settings) => response(settings));
      return true;

    case "saveSettings":
      saveSettings(message.payload);
      break;

    case "resetSettings":
      chrome.storage.local.clear().then(() => updateTabs(defaultSettings, "reset"));
      break;
  }
});

// Watch for the toggle command to be activated.
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "activate") return;
  const settings = await getSettings();
  if (settings) {
    settings.website.on = !settings.website.on;
    await saveSettings(settings);
  }
});

// Watch for changes in tabs.
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "complete") await updateTabs(await getSettings(tabId));
});
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (activeInfo.tabId) await updateTabs(await getSettings(activeInfo.tabId), "activated");
});
