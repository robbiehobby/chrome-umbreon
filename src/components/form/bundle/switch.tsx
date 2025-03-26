import { Check, X } from "lucide-react";
import { Switch } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SwitchProps extends Switch.RootProps {
  displayLabel: string | ReactNode;
}

export default function SwitchElement(props: SwitchProps) {
  const { displayLabel, ...restProps } = props;

  return (
    <Switch.Root w="full" justifyContent="space-between" gap="3" {...restProps}>
      <Switch.Label>{displayLabel}</Switch.Label>

      <Switch.Control>
        <Switch.Thumb>
          <Switch.ThumbIndicator fallback={<X size={12} color="black" />}>
            <Check size={12} color="black" />
          </Switch.ThumbIndicator>
        </Switch.Thumb>
      </Switch.Control>

      <Switch.HiddenInput />
    </Switch.Root>
  );
}
