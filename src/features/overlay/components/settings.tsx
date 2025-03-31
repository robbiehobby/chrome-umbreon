import { Button, Container, createListCollection, Group, Separator, Stack } from "@chakra-ui/react";
import { memo, useEffect, useReducer } from "react";
import { TriangleAlert, Zap } from "lucide-react";
import Color from "../../../components/Color.tsx";
import Select from "../../../components/Select.tsx";
import Slider from "../../../components/Slider.tsx";
import Switch from "../../../components/Switch.tsx";
import chromeApi, { defaultSettings } from "../api/chrome.ts";
import settingsReducer from "./settings-handler.ts";

const render = {
  seperator: <Separator size="xs" />,
};

export default function Settings() {
  const [state, dispatch] = useReducer(settingsReducer, { settings: structuredClone(defaultSettings) });
  const { settings } = state;
  const mode = settings[settings.website.mode];
  const disabled = settings.website.hostname === "*";

  useEffect(() => {
    (async () => {
      dispatch({ type: "loadSettings", details: await chromeApi.getSettings(), dispatch });
    })();
  }, []);

  const onChange = (type: string, details: any) => {
    dispatch({ type, details, dispatch });
  };

  const ResetButtons = memo(
    () => (
      <Group attached grow gap={4} px={4} pb={4}>
        <Button
          colorPalette="orange"
          size="sm"
          variant="outline"
          onClick={() => window.confirm(chromeApi.getMessage("resetWebsiteConfirm")) && onChange("resetWebsite", {})}
        >
          <TriangleAlert /> {chromeApi.getMessage("resetWebsite")}
        </Button>
        <Button
          colorPalette="orange"
          size="sm"
          variant="outline"
          onClick={() => window.confirm(chromeApi.getMessage("resetAllConfirm")) && onChange("resetAll", {})}
        >
          <Zap /> {chromeApi.getMessage("resetAll")}
        </Button>
      </Group>
    ),
    () => true,
  );

  return (
    <Container asChild gap={4} w={400} pt={4} px={0}>
      <Stack>
        <Switch
          fieldLabel={!settings.website.on ? chromeApi.getMessage("on") : chromeApi.getMessage("off")}
          tooltip={disabled ? chromeApi.getMessage("onDisabledHelp") : chromeApi.getMessage("onHelp")}
          checked={settings.website.on}
          onCheckedChange={(details) => onChange("setOn", details)}
          disabled={disabled}
        />
        <Switch
          fieldLabel={chromeApi.getMessage("global")}
          tooltip={chromeApi.getMessage("globalHelp")}
          checked={settings.website.mode === "global"}
          onCheckedChange={(details) => onChange("setMode", details)}
          disabled={disabled}
        />

        {render.seperator}

        <Select
          fieldLabel="Blend Mode"
          collection={createListCollection({
            items: [
              { value: "normal", label: "Normal" },
              { value: "multiply", label: "Multiply" },
              { value: "darken", label: "Darken" },
              { value: "luminosity", label: "Luminosity" },
            ],
          })}
          value={[mode.overlay.blend]}
          defaultValue={[mode.overlay.blend]}
          onValueChange={(details) => onChange("setBlend", details)}
        />
        <Slider
          fieldLabel={chromeApi.getMessage("opacity")}
          tooltip={chromeApi.getMessage("opacityHelp")}
          unit="%"
          step={0.5}
          min={0}
          max={100}
          size="sm"
          value={[mode.overlay.opacity * 100]}
          onValueChange={(details) => onChange("setOpacity", details)}
        />

        {render.seperator}

        <Color
          fieldLabel={chromeApi.getMessage("color")}
          hex={mode.overlay.color}
          onValueChange={(details) => onChange("setColor", details)}
        />

        {render.seperator}

        <ResetButtons />
      </Stack>
    </Container>
  );
}
