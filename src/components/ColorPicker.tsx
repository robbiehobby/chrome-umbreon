import { memo, ReactNode } from "react";
import { ColorPicker as ChakraColorPicker, InputGroup, parseColor, Stack, VisuallyHidden } from "@chakra-ui/react";

interface ColorPickerProps extends ChakraColorPicker.RootProps {
  fieldLabel: string | ReactNode;
  hex: string;
}

const ColorPicker = (props: ColorPickerProps) => {
  const { fieldLabel, hex, ...restProps } = props;

  if (hex) restProps.value = parseColor(hex);

  return (
    <ChakraColorPicker.Root format="hsla" gap={0} px={4} open {...restProps}>
      <VisuallyHidden asChild>
        <ChakraColorPicker.Label>{fieldLabel}</ChakraColorPicker.Label>
      </VisuallyHidden>

      <ChakraColorPicker.Control>
        <InputGroup
          startElementProps={{ px: 2 }}
          startElement={
            <Stack p={0.5} border="subtle" rounded="full">
              <ChakraColorPicker.ValueSwatch boxSize="4.5" shadow="none" rounded="full" />
            </Stack>
          }
          endElementProps={{ px: 1 }}
          endElement={<ChakraColorPicker.EyeDropper size="xs" variant="plain" focusVisibleRing="inside" />}
        >
          <ChakraColorPicker.Input />
        </InputGroup>
      </ChakraColorPicker.Control>

      <ChakraColorPicker.Content w="full" gap={0} mt={3} p={0} bg="none" shadow="none" animation="none">
        <ChakraColorPicker.Area roundedBottom="none" />

        <ChakraColorPicker.View format="hsla">
          <ChakraColorPicker.ChannelSlider channel="hue" roundedTop="none">
            <ChakraColorPicker.ChannelSliderTrack shadow="none" opacity={0.75} />
            <ChakraColorPicker.ChannelSliderThumb />
          </ChakraColorPicker.ChannelSlider>
        </ChakraColorPicker.View>
      </ChakraColorPicker.Content>

      <ChakraColorPicker.HiddenInput />
    </ChakraColorPicker.Root>
  );
};

export default memo(ColorPicker, (prevProps, nextProps) => {
  return prevProps.hex === nextProps.hex;
});
