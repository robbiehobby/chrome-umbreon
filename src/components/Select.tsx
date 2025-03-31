import { Select as ChakraSelect, VisuallyHidden } from "@chakra-ui/react";
import { memo } from "react";

interface SelectProps extends ChakraSelect.RootProps {
  fieldLabel: string;
}

const Select = (props: SelectProps) => {
  const { fieldLabel, ...restProps } = props;

  return (
    <ChakraSelect.Root px={4} zIndex={2000} {...restProps}>
      <VisuallyHidden asChild>
        <ChakraSelect.Label>{fieldLabel}</ChakraSelect.Label>
      </VisuallyHidden>

      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>

      <ChakraSelect.Positioner>
        <ChakraSelect.Content>
          {props.collection.items.map((item) => (
            <ChakraSelect.Item item={item} key={item.value}>
              {item.label}
              <ChakraSelect.ItemIndicator />
            </ChakraSelect.Item>
          ))}
        </ChakraSelect.Content>
      </ChakraSelect.Positioner>

      <ChakraSelect.HiddenSelect />
    </ChakraSelect.Root>
  );
};

export default memo(Select, (prevProps, nextProps) => {
  if (prevProps.value && nextProps.value) return prevProps.value[0] === nextProps.value[0];
  return false;
});
