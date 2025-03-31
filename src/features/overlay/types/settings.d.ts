type Mode = "global" | "website";

type Overlay = { opacity: number; blend: string; color: string };

interface Settings {
  website: {
    hostname: string;
    on: boolean;
    mode: Mode;
    overlay: Overlay;
  };
  global: { overlay: Overlay };
}

interface State {
  settings: Settings;
}

type UpdateType = null | "activated" | "reset";
