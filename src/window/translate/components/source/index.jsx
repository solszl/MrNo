import InteractiveWrapper from "@/components/interactive/wrapper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { Copy, Pin, VolumeNotice } from "@icon-park/react";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { cx } from "class-variance-authority";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import useSourceInput from "../../hooks/useSourceInput";
import DetectLanguage from "../detect";
import SettingButton from "../settings";

const MAX = 200;
const SourceInput = () => {
  const { t } = useTranslation();
  const txtRef = useRef(null);

  const { content } = useSourceInput({ inputRef: txtRef });

  return (
    <div className="w-full">
      <div className="flex items-center justify-end space-x-1 rounded-md p-0">
        <InteractiveWrapper tooltip="Pin Window (⌥p)">
          <Pin theme="outline" size="16" fill="#333" strokeWidth={2} />
        </InteractiveWrapper>
        <SettingButton />
      </div>
      <Card className="w-full">
        <CardContent className="p-1">
          <Textarea
            ref={txtRef}
            className="outline-none w-full focus-visible:ring-0 border-none p-1 resize-none  placeholder:font-normal placeholder:text-sm"
            placeholder={t("translate.input_prompt")}
          />
        </CardContent>
        <CardFooter className="flex gap-x-2 p-0 pl-2">
          <InteractiveWrapper tooltip={t("translate.read") + ` (⌥R)`}>
            <VolumeNotice
              theme="outline"
              size="16"
              fill="#333"
              strokeWidth={2}
            />
          </InteractiveWrapper>
          <InteractiveWrapper tooltip={t("translate.copy") + ` (⌥C)`}>
            <Copy theme="outline" size="16" fill="#333" strokeWidth={2} />
          </InteractiveWrapper>
          <DetectLanguage />
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={cx(
                  "text-xs ml-auto mr-2",
                  content.length >= MAX && "text-red-600"
                )}
              >
                {content.length}/{MAX}
              </span>
            </TooltipTrigger>
            {content.length >= MAX && (
              <TooltipContent>{t("translate.explain")}</TooltipContent>
            )}
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SourceInput;
