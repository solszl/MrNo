import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

const Explain = ({ partOfSpeech, explain }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-start justify-center my-1">
      <Tooltip>
        <TooltipTrigger asChild>
          {partOfSpeech && (
            <span className="text-base font-normal select-none min-w-6 w-max mr-2 italic cursor-pointer">
              {partOfSpeech}
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent>{t(`speech.${partOfSpeech}`)}</TooltipContent>
      </Tooltip>
      <span className="text-xs font-sm flex-1 leading-6">{explain}</span>
    </div>
  );
};

export default Explain;
