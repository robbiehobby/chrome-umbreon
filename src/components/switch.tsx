import { Flex, Text, Switch, SwitchProps } from "@radix-ui/themes";
import UiTooltip from "./tooltip.tsx";

interface UiSwitchProps extends SwitchProps {
  label: string;
  tooltip?: string;
}

export default function UiSwitch(props: UiSwitchProps) {
  const { label, tooltip, ...restProps } = props;

  return (
    <Flex asChild align="center" gap="2" width="100%">
      <Text as="label" size="2">
        {tooltip && <UiTooltip.Info content={tooltip} />}
        <Text weight="medium" style={{ flexGrow: 1 }}>
          {label}
        </Text>
        <Switch size="2" {...restProps} />
      </Text>
    </Flex>
  );
}
