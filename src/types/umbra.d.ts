type Mode = "global" | "website";

interface Settings {
  website: {
    hostname: string;
    on: boolean;
    mode: Mode;
    overlay: { opacity: number; color: string };
  };
  global: {
    overlay: { opacity: number; color: string };
  };
}

interface State {
  settings: Settings;
}
