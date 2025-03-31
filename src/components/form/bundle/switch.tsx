import { memo, ReactNode } from "react";
import { Check, X } from "lucide-react";
import { Group, Switch } from "@chakra-ui/react";
import Ui from "../../ui/bundle.ts";

interface SwitchProps extends Switch.RootProps {
  displayLabel: string | ReactNode;
  tooltip: string;
}

const FormSwitch = (props: SwitchProps) => {
  const { displayLabel, tooltip, ...restProps } = props;

  return (
    <Group display="flex" mb={3}>
      <Ui.Tooltip.Info content={tooltip} />

      <Switch.Root display="flex" justifyContent="space-between" flexGrow={1} {...restProps}>
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
    </Group>
  );
};

export default memo(FormSwitch, (prevProps, nextProps) => {
  return prevProps.checked === nextProps.checked;
});
