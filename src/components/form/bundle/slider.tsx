import { ReactNode } from "react";
import { HStack, Slider } from "@chakra-ui/react";

interface SliderProps extends Slider.RootProps {
  displayLabel: string | ReactNode;
  unit: string;
}

export default function FormSlider(props: SliderProps) {
  const { displayLabel, unit, ...restProps } = props;

  let marks: any[] = [];
  if (restProps.max) {
    marks = [
      { value: restProps.min, label: "" },
      { value: restProps.max / 2, label: "" },
      { value: restProps.max, label: "" },
    ];
  }

  return (
    <Slider.Root gap="md" {...restProps}>
      <HStack justify="space-between">
        <Slider.Label>{displayLabel}</Slider.Label>
        <HStack gap={0} color="fg.subtle">
          <Slider.ValueText /> {unit}
        </HStack>
      </HStack>

      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
        {marks && <Slider.Marks marks={marks} mb="0" />}
      </Slider.Control>
    </Slider.Root>
  );
}
