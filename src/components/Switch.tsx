import { memo, ReactNode } from "react";
import { Group, Switch as ChakraSwitch } from "@chakra-ui/react";
import { Check, X } from "lucide-react";
import Tooltip from "./Tooltip.tsx";

interface SwitchProps extends ChakraSwitch.RootProps {
  displayLabel: string | ReactNode;
  tooltip: string;
}

const Switch = (props: SwitchProps) => {
  const { displayLabel, tooltip, ...restProps } = props;

  return (
    <Group display="flex" px={4}>
      <Tooltip.Info content={tooltip} />

      <ChakraSwitch.Root display="flex" justifyContent="space-between" flexGrow={1} {...restProps}>
        <ChakraSwitch.Label>{displayLabel}</ChakraSwitch.Label>

        <ChakraSwitch.Control>
          <ChakraSwitch.Thumb>
            <ChakraSwitch.ThumbIndicator fallback={<X size={12} color="black" />}>
              <Check size={12} color="black" />
            </ChakraSwitch.ThumbIndicator>
          </ChakraSwitch.Thumb>
        </ChakraSwitch.Control>

        <ChakraSwitch.HiddenInput />
      </ChakraSwitch.Root>
    </Group>
  );
};

export default memo(Switch, (prevProps, nextProps) => {
  if (prevProps.disabled !== nextProps.disabled) return false;
  return prevProps.checked === nextProps.checked;
});
