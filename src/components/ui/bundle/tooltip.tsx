import { Tooltip, Portal, Span } from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";
import { Info } from "lucide-react";

export interface TooltipProps extends Tooltip.RootProps {
  content: ReactNode;
}

export default function UiTooltip() {}

UiTooltip.Root = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
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

UiTooltip.Info = (props: TooltipProps) => {
  return (
    <UiTooltip.Root {...props}>
      <Span color="fg.subtle" rounded="full" outline={0} tabIndex={0}>
        <Info size={16} />
      </Span>
    </UiTooltip.Root>
  );
};
