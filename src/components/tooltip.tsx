import { IconButton, Tooltip, TooltipProps } from "@radix-ui/themes";
import { Info } from "lucide-react";

export default function UiTooltip() {}

interface UiTooltipProps extends TooltipProps {}

UiTooltip.Root = (props: UiTooltipProps) => {
  const { children, ...restProps } = props;
  return <Tooltip {...restProps}>{children}</Tooltip>;
};

UiTooltip.Info = (props: UiTooltipProps) => {
  return (
    <Tooltip {...props}>
      <IconButton asChild variant="ghost" color="gray" size="1" radius="full" style={{ opacity: 0.6 }} tabIndex={0}>
        <Info size={16} />
      </IconButton>
    </Tooltip>
  );
};
