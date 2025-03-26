import { ColorPickerValueChangeDetails, SliderValueChangeDetails, SwitchCheckedChangeDetails } from "@chakra-ui/react";
import { PageState } from "./page.tsx";
import useChrome, { defaultSettings } from "../hooks/chrome.ts";
import getMessage from "../i18n.ts";

export default function pageHandler() {}

pageHandler.save = (settings: typeof defaultSettings, state: PageState) => {
  state.setSettings(settings);
  useChrome().saveSettings(settings);
};

pageHandler.on = (details: SwitchCheckedChangeDetails, state: PageState) => {
  const settings = { ...state.settings };
  settings.website.on = details.checked;
  pageHandler.save(settings, state);
};

pageHandler.mode = (details: SwitchCheckedChangeDetails, state: PageState) => {
  const settings = { ...state.settings };
  settings.website.mode = details.checked ? "global" : "website";
  pageHandler.save(settings, state);
};

pageHandler.opacity = (details: SliderValueChangeDetails, state: PageState) => {
  const settings = { ...state.settings };
  settings[settings.website.mode].overlay.opacity = details.value[0] / 100;
  pageHandler.save(settings, state);
};

pageHandler.color = (details: ColorPickerValueChangeDetails, state: PageState) => {
  const settings = { ...state.settings };
  settings[settings.website.mode].overlay.color = details.value.toString("rgb");
  pageHandler.save(settings, state);
};

pageHandler.resetWebsite = (state: PageState) => {
  if (!window.confirm(getMessage("resetWebsiteConfirm"))) return;
  const settings = structuredClone(defaultSettings);
  settings.website.hostname = state.settings.website.hostname;
  settings.global = state.settings.global;
  pageHandler.save(settings, state);
};

pageHandler.resetAll = (state: PageState) => {
  if (!window.confirm(getMessage("resetAllConfirm"))) return;
  const settings = structuredClone(defaultSettings);
  settings.website.hostname = state.settings.website.hostname;
  state.setSettings(settings);
  useChrome().resetSettings("all");
};
