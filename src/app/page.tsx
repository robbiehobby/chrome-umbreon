import { Box, Button, Container, Group, HStack, parseColor, Span } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { TriangleAlert, Zap } from "lucide-react";
import chromeApi, { defaultSettings } from "../apis/chrome.ts";
import pageReducer from "./page-handler.ts";
import Form from "../components/form/bundle.ts";
import Ui from "../components/ui/bundle.ts";
import getMessage from "../i18n.ts";

export default function App() {
  const [disabled, setDisabled] = useState(false);
  const [state, dispatch] = useReducer(pageReducer, { settings: structuredClone(defaultSettings) });
  const { settings } = state;

  useEffect(() => setDisabled(settings.website.hostname === "123456*"), [settings.website.hostname]);

  useEffect(() => {
    (async () => {
      dispatch({ type: "loadSettings", details: await chromeApi.getSettings(), dispatch });
    })();
  }, []);

  const onChange = (type: string, details: any) => {
    dispatch({ type, details, dispatch });
  };

  return (
    <Container w={400} p={4}>
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

      <Box css={{ mb: 3, px: 3, pt: 2.5 }} border="subtle" rounded="sm">
        <Form.Slider
          displayLabel={
            <HStack>
              <Ui.Tooltip.Info content={getMessage("opacityHelp")} positioning={{ placement: "bottom-start" }} />
              {getMessage("opacity")}
            </HStack>
          }
          unit="%"
          step={0.5}
          min={0}
          max={100}
          size="sm"
          mb={-1}
          value={[settings[settings.website.mode].overlay.opacity * 100]}
          onValueChange={(details) => onChange("setOpacity", details)}
        />
      </Box>

      <Form.ColorPicker
        displayLabel={getMessage("color")}
        mb={3}
        value={parseColor(settings[settings.website.mode].overlay.color)}
        onValueChange={(details) => onChange("setColor", details)}
      />

      <Group attached grow gap={3}>
        <Button
          colorPalette="gray"
          size="sm"
          variant="outline"
          onClick={() => window.confirm(getMessage("resetWebsiteConfirm")) && onChange("resetWebsite", {})}
        >
          <Span color="fg.warning">
            <TriangleAlert />
          </Span>
          {getMessage("resetWebsite")}
        </Button>
        <Button
          colorPalette="gray"
          size="sm"
          variant="outline"
          onClick={() => window.confirm(getMessage("resetAllConfirm")) && onChange("resetAll", {})}
        >
          <Span color="fg.error">
            <Zap />
          </Span>
          {getMessage("resetAll")}
        </Button>
      </Group>
    </Container>
  );
}
