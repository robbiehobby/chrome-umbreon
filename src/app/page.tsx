import { Box, Button, Container, Group, HStack, parseColor, useToken } from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import { Info, TriangleAlert, Zap } from "lucide-react";
import useChrome, { defaultSettings } from "../hooks/chrome.ts";
import pageHandler from "./page-handler.ts";
import getMessage from "../i18n.ts";
import Form from "../components/form/bundle.ts";
import Ui from "../components/ui/bundle.ts";

export interface PageState {
  settings: typeof defaultSettings;
  setSettings: SetStateAction<any>;
}

export default function App() {
  const [disabled, setDisabled] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const state: PageState = { settings, setSettings };

  useEffect(() => {
    useChrome()
      .getSettings()
      .then((settings) => {
        setSettings(settings);
        if (settings.website.hostname === "*") setDisabled(true);
      });
    return () => {};
  }, []);

  const subtle = String(useToken("colors", "fg.subtle"));

  return (
    <Container w={400} p={4}>
      <Form.Switch
        displayLabel={
          <HStack>
            <Ui.Tooltip
              content={disabled ? getMessage("onDisabledHelp") : getMessage("onHelp")}
              positioning={{ placement: "bottom-start" }}
            >
              <Info size={16} color={subtle} />
            </Ui.Tooltip>{" "}
            {getMessage("on")}
          </HStack>
        }
        css={{ mb: 3, px: 3, py: 2.5 }}
        border="subtle"
        rounded="sm"
        checked={settings.website.on}
        onCheckedChange={(details) => pageHandler.on(details, state)}
        disabled={disabled}
      />

      <Form.Switch
        displayLabel={
          <HStack>
            <Ui.Tooltip content={getMessage("globalHelp")} positioning={{ placement: "bottom-start" }}>
              <Info size={16} color={subtle} />
            </Ui.Tooltip>
            {getMessage("global")}
          </HStack>
        }
        css={{ mb: 3, px: 3, py: 2.5 }}
        border="subtle"
        rounded="sm"
        checked={settings.website.mode === "global"}
        onCheckedChange={(details) => pageHandler.mode(details, state)}
        disabled={disabled}
      />

      <Box css={{ mb: 3, px: 3, pt: 2.5 }} border="subtle" rounded="sm">
        <Form.Slider
          displayLabel={
            <HStack>
              <Ui.Tooltip content={getMessage("opacityHelp")} positioning={{ placement: "bottom-start" }}>
                <Info size={16} color={subtle} />
              </Ui.Tooltip>
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
          onValueChange={(details) => pageHandler.opacity(details, state)}
        />
      </Box>

      <Form.ColorPicker
        displayLabel={getMessage("color")}
        mb={3}
        value={parseColor(settings[settings.website.mode].overlay.color)}
        onValueChange={(details) => pageHandler.color(details, state)}
      />

      <Group attached grow gap={3}>
        <Button variant="outline" size="sm" colorPalette="orange" onClick={() => pageHandler.resetWebsite(state)}>
          <TriangleAlert /> {getMessage("resetWebsite")}
        </Button>
        <Button variant="outline" size="sm" colorPalette="orange" onClick={() => pageHandler.resetAll(state)}>
          <Zap /> {getMessage("resetAll")}
        </Button>
      </Group>
    </Container>
  );
}
