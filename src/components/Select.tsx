import { Box, NativeSelect } from "@chakra-ui/react";
import { ChangeEventHandler, memo } from "react";

interface SelectProps extends NativeSelect.RootProps {
  options: { [key: string]: string };
  onValueChange: ChangeEventHandler<HTMLSelectElement>;
}

const Select = (props: SelectProps) => {
  const { options, defaultValue, onValueChange, ...restProps } = props;

  return (
    <Box px={4}>
      <NativeSelect.Root {...restProps}>
        <NativeSelect.Field value={defaultValue} onChange={onValueChange}>
          {Object.entries(options).map(([value, title]) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Box>
  );
};

export default memo(Select, (prevProps, nextProps) => {
  return prevProps.defaultValue === nextProps.defaultValue;
});
