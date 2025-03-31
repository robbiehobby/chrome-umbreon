import { memo, ReactNode } from "react";
import { HStack, Slider as ChakraSlider } from "@chakra-ui/react";
import Tooltip from "./Tooltip.tsx";

interface SliderProps extends ChakraSlider.RootProps {
  fieldLabel: string | ReactNode;
  tooltip: string;
  unit: string;
}

const Slider = (props: SliderProps) => {
  const { fieldLabel, tooltip, unit, ...restProps } = props;

  let marks: any[] = [];
  if (restProps.max) {
    marks = [
      { value: restProps.min, label: "" },
      { value: restProps.max / 2, label: "" },
      { value: restProps.max, label: "" },
    ];
  }

  return (
    <ChakraSlider.Root gap="md" px={4} mb={-4} {...restProps}>
      <HStack justify="space-between">
        <ChakraSlider.Label>
          <HStack>
            <Tooltip.Info content={tooltip} /> {fieldLabel}
          </HStack>
        </ChakraSlider.Label>
        <HStack gap={0} color="fg.subtle">
          <ChakraSlider.ValueText /> {unit}
        </HStack>
      </HStack>

      <ChakraSlider.Control>
        <ChakraSlider.Track>
          <ChakraSlider.Range />
        </ChakraSlider.Track>
        <ChakraSlider.Thumbs />
        {marks.length && <ChakraSlider.Marks marks={marks} mb={0} />}
      </ChakraSlider.Control>
    </ChakraSlider.Root>
  );
};

export default memo(Slider, (prevProps, nextProps) => {
  if (prevProps.disabled !== nextProps.disabled) return false;
  if (prevProps.value && nextProps.value) return prevProps.value[0] === nextProps.value[0];
  return false;
});
