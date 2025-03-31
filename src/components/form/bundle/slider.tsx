import { memo, ReactNode } from "react";
import { HStack, Slider } from "@chakra-ui/react";
import Ui from "../../ui/bundle.ts";

interface SliderProps extends Slider.RootProps {
  displayLabel: string | ReactNode;
  tooltip: string;
  unit: string;
}

const FormSlider = (props: SliderProps) => {
  const { displayLabel, tooltip, unit, ...restProps } = props;

  let marks: any[] = [];
  if (restProps.max) {
    marks = [
      { value: restProps.min, label: "" },
      { value: restProps.max / 2, label: "" },
      { value: restProps.max, label: "" },
    ];
  }

  return (
    <Slider.Root gap="md" px={4} mb={-4} {...restProps}>
      <HStack justify="space-between">
        <Slider.Label>
          <HStack>
            <Ui.Tooltip.Info content={tooltip} /> {displayLabel}
          </HStack>
        </Slider.Label>
        <HStack gap={0} color="fg.subtle">
          <Slider.ValueText /> {unit}
        </HStack>
      </HStack>

      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
        {marks.length && <Slider.Marks marks={marks} mb={0} />}
      </Slider.Control>
    </Slider.Root>
  );
};

export default memo(FormSlider, (prevProps, nextProps) => {
  if (prevProps.disabled !== nextProps.disabled) return false;
  if (prevProps.value && nextProps.value) return prevProps.value[0] === nextProps.value[0];
  return false;
});
