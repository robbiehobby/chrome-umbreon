import { ColorPickerValueChangeDetails, SliderValueChangeDetails, SwitchCheckedChangeDetails } from "@chakra-ui/react";
import chromeApi, { defaultSettings } from "../apis/chrome.ts";

type Action = { type: string; details: any; dispatch?: (action: Action) => void };

const handler: { [key: string]: Function } = {};

handler.loadSettings = async (state: State, details: Settings) => {
  state.settings = { ...details };
};

handler.setOn = (state: State, details: SwitchCheckedChangeDetails) => {
  state.settings.website.on = details.checked;
};

handler.setMode = (state: State, details: SwitchCheckedChangeDetails) => {
  state.settings.website.mode = details.checked ? "global" : "website";
};

handler.setOpacity = (state: State, details: SliderValueChangeDetails) => {
  state.settings[state.settings.website.mode].overlay.opacity = details.value[0] / 100;
};

handler.setColor = (state: State, details: ColorPickerValueChangeDetails) => {
  state.settings[state.settings.website.mode].overlay.color = details.value.toString("rgb");
};

handler.resetWebsite = (state: State) => {
  const settings = structuredClone(defaultSettings);
  settings.website.hostname = state.settings.website.hostname;
  settings.global = state.settings.global;
  state.settings = settings;
};

handler.resetAll = (state: State) => {
  const settings = structuredClone(defaultSettings);
  settings.website.hostname = state.settings.website.hostname;
  state.settings = settings;
};

export default function pageReducer(prevState: State, action: Action) {
  const state = { ...prevState };
  if (handler[action.type]) handler[action.type](state, action.details);
  chromeApi.saveSettings(state.settings, action.type === "resetAll");
  return state;
}
