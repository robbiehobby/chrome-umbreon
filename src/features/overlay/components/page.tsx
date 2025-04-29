import { Box, Button, Callout, Flex, Grid, Heading, Select, Separator, Text } from "@radix-ui/themes";
import { useEffect, useReducer, useState } from "react";
import { HexColorPicker } from "react-colorful";
import UiSlider from "../../../components/slider.tsx";
import UiSwitch from "../../../components/switch.tsx";
import UiTooltip from "../../../components/tooltip.tsx";
import chromeApi, { defaultSettings } from "../api/chrome.ts";
import pageReducer from "./page-handler.ts";
import "./page.css";

export default function Page() {
  const [state, dispatch] = useReducer(pageReducer, { settings: structuredClone(defaultSettings) });
  const [shortcut, setShortcut] = useState("");
  const { settings } = state;
  const mode = settings[settings.website.mode];
  const disabled = settings.website.hostname === "*";

  useEffect(() => {
    (async () => {
      dispatch({ type: "loadSettings", value: await chromeApi.getSettings(), dispatch });
      setShortcut(await chromeApi.getShortcut());
    })();
  }, []);

  const onChange = (type: string, value: any) => {
    dispatch({ type, value, dispatch });
  };

  let help = "onDisabledHelp";
  if (!disabled) help = !settings.website.on ? "onHelp" : "offHelp";

  return (
    <Box p="5" width="400px">
      <Heading as="h1" size="5" mt="-1" mb="3">
        {chromeApi.getMessage("name")}
      </Heading>

      <Callout.Root color={!shortcut ? "orange" : "grass"} mb="5">
        <Callout.Text>
          <Flex as="span" align="center" gap="4">
            <UiTooltip.Root content={chromeApi.getMessage("shortcutHelp")}>
              <Button size="1" variant="surface" my="-2" onClick={chromeApi.openShortcuts}>
                {!shortcut ? chromeApi.getMessage("shortcutAssign") : shortcut}
              </Button>
            </UiTooltip.Root>
            <Text>{chromeApi.getMessage(!shortcut ? "shortcutUnassigned" : "shortcutAssigned")}</Text>
          </Flex>
        </Callout.Text>
      </Callout.Root>

      <Flex direction="column" gap="3">
        <UiSwitch
          label={chromeApi.getMessage(!settings.website.on ? "on" : "off")}
          tooltip={chromeApi.getMessage(help)}
          checked={settings.website.on}
          onCheckedChange={(value) => onChange("setOn", value)}
          disabled={disabled}
        />
        <UiSwitch
          label={chromeApi.getMessage("global")}
          tooltip={chromeApi.getMessage("globalHelp")}
          checked={settings.website.mode === "global"}
          onCheckedChange={(value) => onChange("setMode", value)}
          disabled={disabled}
        />

        <Box my="3" mx="-5">
          <Separator size="4" />
        </Box>

        <Select.Root
          value={mode.overlay.blend}
          defaultValue={mode.overlay.blend}
          onValueChange={(value) => onChange("setBlend", value)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>{chromeApi.getMessage("blend")}</Select.Label>
              <Select.Item value="color-burn">{chromeApi.getMessage("blendColorBurn")}</Select.Item>
              <Select.Item value="darken">{chromeApi.getMessage("blendDarken")}</Select.Item>
              <Select.Item value="difference">{chromeApi.getMessage("blendDifference")}</Select.Item>
              <Select.Item value="exclusion">{chromeApi.getMessage("blendExclusion")}</Select.Item>
              <Select.Item value="hard-light">{chromeApi.getMessage("blendHardLight")}</Select.Item>
              <Select.Item value="luminosity">{chromeApi.getMessage("blendLuminosity")}</Select.Item>
              <Select.Item value="multiply">{chromeApi.getMessage("blendMultiply")}</Select.Item>
              <Select.Item value="normal">{chromeApi.getMessage("blendNormal")}</Select.Item>
              <Select.Item value="saturation">{chromeApi.getMessage("blendSaturation")}</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <Box mb="2">
          <UiSlider
            label={chromeApi.getMessage("opacity")}
            tooltip={chromeApi.getMessage("opacityHelp")}
            step={1}
            min={0}
            max={100}
            unit="%"
            value={[Math.round(mode.overlay.opacity * 100)]}
            defaultValue={[Math.round(mode.overlay.opacity * 100)]}
            onValueChange={(value) => onChange("setOpacity", value)}
          />
        </Box>

        <HexColorPicker
          className="color-picker"
          color={mode.overlay.color}
          onChange={(value) => onChange("setColor", value)}
        />

        <Box my="3" mx="-5">
          <Separator size="4" />
        </Box>

        <Grid columns="2" gap="3" my="-2">
          <Button
            variant="surface"
            color="red"
            onClick={() => window.confirm(chromeApi.getMessage("resetWebsiteConfirm")) && onChange("resetWebsite", {})}
          >
            {chromeApi.getMessage("resetWebsite")}
          </Button>
          <Button
            variant="surface"
            color="red"
            onClick={() => window.confirm(chromeApi.getMessage("resetAllConfirm")) && onChange("resetAll", {})}
          >
            {chromeApi.getMessage("resetAll")}
          </Button>
        </Grid>
      </Flex>
    </Box>
  );
}
