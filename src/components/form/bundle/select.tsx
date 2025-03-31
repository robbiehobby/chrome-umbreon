import { Box, NativeSelect } from "@chakra-ui/react";
import { memo } from "react";

interface SelectProps extends NativeSelect.RootProps {
  options: { [key: string]: string };
}

const FormSelect = (props: SelectProps) => {
  const { options, defaultValue, ...restProps } = props;

  return (
    <Box px={4}>
      <NativeSelect.Root {...restProps}>
        <NativeSelect.Field value={defaultValue}>
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

export default memo(FormSelect, (prevProps, nextProps) => {
  return prevProps.defaultValue === nextProps.defaultValue;
});
