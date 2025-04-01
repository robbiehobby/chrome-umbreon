import { memo, ReactNode } from "react";
import { HStack, Switch as ChakraSwitch } from "@chakra-ui/react";
import { Check, X } from "lucide-react";
import Tooltip from "./Tooltip.tsx";

interface SwitchProps extends ChakraSwitch.RootProps {
  fieldLabel: string | ReactNode;
  tooltip: string;
}

const Switch = (props: SwitchProps) => {
  const { fieldLabel, tooltip, ...restProps } = props;

  return (
    <ChakraSwitch.Root display="flex" justifyContent="space-between" flexGrow={1} {...restProps}>
      <HStack>
        <Tooltip.Info content={tooltip} />
        <ChakraSwitch.Label>{fieldLabel}</ChakraSwitch.Label>
      </HStack>

      <ChakraSwitch.Control>
        <ChakraSwitch.Thumb>
          <ChakraSwitch.ThumbIndicator fallback={<X size={12} color="black" />}>
            <Check size={12} color="black" />
          </ChakraSwitch.ThumbIndicator>
        </ChakraSwitch.Thumb>
      </ChakraSwitch.Control>

      <ChakraSwitch.HiddenInput />
    </ChakraSwitch.Root>
  );
};

export default memo(Switch, (prevProps, nextProps) => {
  if (prevProps.disabled !== nextProps.disabled) return false;
  return prevProps.checked === nextProps.checked;
});
