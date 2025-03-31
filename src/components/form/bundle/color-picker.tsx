import { memo, ReactNode } from "react";
import { Box, ColorPicker, InputGroup, parseColor, Stack, VisuallyHidden } from "@chakra-ui/react";

interface ColorPickerProps extends ColorPicker.RootProps {
  displayLabel: string | ReactNode;
  hex: string;
}

const FormColorPicker = (props: ColorPickerProps) => {
  const { displayLabel, hex, ...restProps } = props;

  if (hex) restProps.value = parseColor(hex);

  return (
    <ColorPicker.Root format="hsla" gap={0} open {...restProps}>
      <VisuallyHidden>
        <ColorPicker.Label>{displayLabel}</ColorPicker.Label>
      </VisuallyHidden>

      <ColorPicker.Control>
        <InputGroup
          mb={3}
          startElementProps={{ px: 2.5 }}
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

      <ColorPicker.Content p={3} w="full" bg="none" border="subtle" rounded="sm" shadow="none" animation="none">
        <ColorPicker.Area />

        <Box bg="red" rounded="full">
          <ColorPicker.View format="hsla" mx={1.5}>
            <ColorPicker.ChannelSlider channel="hue">
              <ColorPicker.ChannelSliderTrack shadow="none" />
              <ColorPicker.ChannelSliderThumb />
            </ColorPicker.ChannelSlider>
          </ColorPicker.View>
        </Box>
      </ColorPicker.Content>

      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
};

export default memo(FormColorPicker, (prevProps, nextProps) => {
  return prevProps.hex === nextProps.hex;
});
