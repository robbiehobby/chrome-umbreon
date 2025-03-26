import { Tooltip, Portal } from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";

export interface TooltipProps extends Tooltip.RootProps {
  content: ReactNode;
}

const TooltipElement = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const { children, content, ...restProps } = props;

  if (!restProps.openDelay) restProps.openDelay = 250;

  return (
    <Tooltip.Root {...restProps}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content ref={ref}>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            {content}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  );
});

export default TooltipElement;
