import { memo, ReactNode } from "react";
import { ColorPicker, InputGroup, parseColor, Stack, VisuallyHidden } from "@chakra-ui/react";

interface ColorPickerProps extends ColorPicker.RootProps {
  displayLabel: string | ReactNode;
  hex: string;
}

const FormColorPicker = (props: ColorPickerProps) => {
  const { displayLabel, hex, ...restProps } = props;

  if (hex) restProps.value = parseColor(hex);

  return (
    <ColorPicker.Root format="hsla" gap={0} px={4} pb={4} borderBottom="subtle" open {...restProps}>
      <VisuallyHidden>
        <ColorPicker.Label>{displayLabel}</ColorPicker.Label>
      </VisuallyHidden>

      <ColorPicker.Control>
        <InputGroup
          startElementProps={{ px: 2 }}
          startElement={
            <Stack p={0.5} border="subtle" rounded="full">
              <ColorPicker.ValueSwatch boxSize="4.5" shadow="none" rounded="full" />
            </Stack>
          }
          endElementProps={{ px: 1 }}
          endElement={<ColorPicker.EyeDropper size="xs" variant="plain" focusVisibleRing="inside" />}
        >
          <ColorPicker.Input />
        </InputGroup>
      </ColorPicker.Control>

      <ColorPicker.Content w="full" gap={0} mt={3} p={0} bg="none" shadow="none" animation="none">
        <ColorPicker.Area roundedBottom="none" />

        <ColorPicker.View format="hsla">
          <ColorPicker.ChannelSlider channel="hue" roundedTop="none">
            <ColorPicker.ChannelSliderTrack shadow="none" opacity={0.75} />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
        </ColorPicker.View>
      </ColorPicker.Content>

      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
};

export default memo(FormColorPicker, (prevProps, nextProps) => {
  return prevProps.hex === nextProps.hex;
});
