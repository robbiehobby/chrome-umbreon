import { Button, Container, Group, Stack } from "@chakra-ui/react";
import { memo, useEffect, useReducer, useState } from "react";
import { TriangleAlert, Zap } from "lucide-react";
import chromeApi, { defaultSettings } from "../apis/chrome.ts";
import pageReducer from "./page-handler.ts";
import Form from "../components/form/bundle.ts";
import getMessage from "../i18n.ts";

export default function App() {
  const [disabled, setDisabled] = useState(false);
  const [state, dispatch] = useReducer(pageReducer, { settings: structuredClone(defaultSettings) });
  const { settings } = state;

  useEffect(() => {
    (async () => {
      dispatch({ type: "loadSettings", details: await chromeApi.getSettings(), dispatch });
    })();
  }, []);

  useEffect(() => setDisabled(settings.website.hostname === "*"), [settings.website.hostname]);

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
          displayLabel={getMessage("on")}
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

        <Form.ColorPicker
          displayLabel={getMessage("color")}
          hex={settings[settings.website.mode].overlay.color}
          onValueChange={(details) => onChange("setColor", details)}
        />

        <ResetButtons />
      </Stack>
    </Container>
  );
}
