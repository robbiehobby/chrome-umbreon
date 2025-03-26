import { HStack, Slider } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SliderProps extends Slider.RootProps {
  displayLabel: string | ReactNode;
  unit: string;
}

export default function SliderElement(props: SliderProps) {
  const { displayLabel, unit, ...restProps } = props;

  let marks;
  if (restProps.max) marks = [{ value: restProps.max / 2, label: "" }];

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
