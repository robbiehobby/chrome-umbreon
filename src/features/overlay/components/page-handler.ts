import chromeApi, { defaultSettings } from "../api/chrome.ts";

type Action = { type: string; value: any; dispatch?: (action: Action) => void };

const handler: { [key: string]: Function } = {};

handler.loadSettings = async (state: State, value: Settings) => {
  state.settings = { ...value };
};

handler.setOn = (state: State, value: any) => {
  state.settings.website.on = value;
};

handler.setMode = (state: State, value: any) => {
  state.settings.website.mode = value ? "global" : "website";
};

handler.setOpacity = (state: State, value: any) => {
  state.settings[state.settings.website.mode].overlay.opacity = value[0] / 100;
};

handler.setBlend = (state: State, value: any) => {
  state.settings[state.settings.website.mode].overlay.blend = value;
};

handler.setColor = (state: State, value: any) => {
  state.settings[state.settings.website.mode].overlay.color = value;
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
  if (handler[action.type]) handler[action.type](state, action.value);
  chromeApi.saveSettings(state.settings, action.type === "resetAll");
  return state;
}
