import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const InteractiveWrapper = ({ children, tooltip = "", onClick = () => {} }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer" onClick={onClick}>
          {children}
        </div>
      </TooltipTrigger>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  );
};

export default InteractiveWrapper;
