import { Tooltip as ChakraTooltip, Portal, Span } from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";
import { Info } from "lucide-react";

export interface TooltipProps extends ChakraTooltip.RootProps {
  content: ReactNode;
}

export default function Tooltip() {}

Tooltip.Root = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const { children, content, ...restProps } = props;

  if (!restProps.openDelay) restProps.openDelay = 250;

  return (
    <ChakraTooltip.Root {...restProps}>
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
      <Portal>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content ref={ref}>
            <ChakraTooltip.Arrow>
              <ChakraTooltip.ArrowTip />
            </ChakraTooltip.Arrow>
            {content}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  );
});

Tooltip.Info = (props: TooltipProps) => {
  return (
    <Tooltip.Root {...props}>
      <Span
        color="fg.subtle"
        rounded="full"
        outline="none"
        _focusVisible={{ color: "colorPalette.focusRing" }}
        tabIndex={0}
      >
        <Info size={16} />
      </Span>
    </Tooltip.Root>
  );
};
