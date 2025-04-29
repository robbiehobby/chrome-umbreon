import { Flex, Text, SliderProps, Slider, Box } from "@radix-ui/themes";
import UiTooltip from "./tooltip.tsx";

interface UiSliderProps extends SliderProps {
  label: string;
  tooltip?: string;
  unit: string;
}

export default function UiSlider(props: UiSliderProps) {
  const { label, tooltip, unit, ...restProps } = props;

  return (
    <Box>
      <Flex align="center" gap="2" mb="2">
        {tooltip && <UiTooltip.Info content={tooltip} />}
        <Text size="2" style={{ flexGrow: 1 }}>
          {label}
        </Text>
        {props.defaultValue && (
          <Text size="2" style={{ opacity: 0.6 }}>
            {props.defaultValue[0]}
            {unit}
          </Text>
        )}
      </Flex>
      <Slider {...restProps} />
    </Box>
  );
}
