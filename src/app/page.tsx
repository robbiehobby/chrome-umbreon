import { Button, Container, Group, Separator, Stack } from "@chakra-ui/react";
import { memo, useEffect, useReducer } from "react";
import { TriangleAlert, Zap } from "lucide-react";
import chromeApi, { defaultSettings } from "../apis/chrome.ts";
import pageReducer from "./page-handler.ts";
import Form from "../components/form/bundle.ts";
import getMessage from "../i18n.ts";

const render = {
  seperator: <Separator size="xs" />,
};

export default function App() {
  const [state, dispatch] = useReducer(pageReducer, { settings: structuredClone(defaultSettings) });
  const { settings } = state;
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
          onClick={() => window.confirm(getMessage("resetWebsiteConfirm")) && onChange("resetWebsite", {})}
        >
          <TriangleAlert /> {getMessage("resetWebsite")}
        </Button>
        <Button
          colorPalette="orange"
          size="sm"
          variant="outline"
          onClick={() => window.confirm(getMessage("resetAllConfirm")) && onChange("resetAll", {})}
        >
          <Zap /> {getMessage("resetAll")}
        </Button>
      </Group>
    ),
    () => true,
  );

  return (
    <Container asChild gap={4} w={400} pt={4} px={0}>
      <Stack>
        <Form.Switch
          displayLabel={!settings.website.on ? getMessage("on") : getMessage("off")}
          tooltip={disabled ? getMessage("onDisabledHelp") : getMessage("onHelp")}
          checked={settings.website.on}
          onCheckedChange={(details) => onChange("setOn", details)}
          disabled={disabled}
        />

        <Form.Switch
          displayLabel={getMessage("global")}
          tooltip={getMessage("globalHelp")}
          checked={settings.website.mode === "global"}
          onCheckedChange={(details) => onChange("setMode", details)}
          disabled={disabled}
        />

        {render.seperator}

        <Form.Select
          options={{
            normal: "Normal",
            multiply: "Multiply",
            darken: "Darken",
            luminosity: "Luminosity",
          }}
          defaultValue={settings[settings.website.mode].overlay.blend}
          onChange={(event) => onChange("setBlend", event.target)}
        />
        <Form.Slider
          displayLabel={getMessage("opacity")}
          tooltip={getMessage("opacityHelp")}
          unit="%"
          step={0.5}
          min={0}
          max={100}
          size="sm"
          value={[settings[settings.website.mode].overlay.opacity * 100]}
          onValueChange={(details) => onChange("setOpacity", details)}
        />

        {render.seperator}

        <Form.ColorPicker
          displayLabel={getMessage("color")}
          hex={settings[settings.website.mode].overlay.color}
          onValueChange={(details) => onChange("setColor", details)}
        />

        {render.seperator}

        <ResetButtons />
      </Stack>
    </Container>
  );
}
