import InteractiveWrapper from "@/components/interactive/wrapper";
import { Textarea } from "@/components/ui/textarea";
import "@/i18n";
import {
  Copy,
  DeleteTwo,
  Pin,
  Translate as TranslateIcon,
  VolumeNotice,
} from "@icon-park/react";
import { useTranslation } from "react-i18next";
import SettingButton from "./components/settings";

const Translate = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center m-2 flex-col">
      <div className="flex justify-end w-full mx-2 gap-x-2">
        <InteractiveWrapper tooltip="Pin Window (⌥p)">
          <Pin theme="outline" size="24" fill="#333" strokeWidth={2} />
        </InteractiveWrapper>
        <SettingButton />
      </div>
      <Textarea
        placeholder={t("translate.input_prompt")}
        className="outline-none w-full focus-visible:ring-0 min-h-[40px]"
        onChange={() => {
          console.log("123");
        }}
      />

      <div className="flex justify-between items-center w-full ml-2 mr-2 mt-2">
        <InteractiveWrapper tooltip={t("translate.read") + ` (⌥R)`}>
          <VolumeNotice theme="outline" size="24" fill="#333" strokeWidth={2} />
        </InteractiveWrapper>
        <InteractiveWrapper tooltip={t("translate.copy") + ` (⌥C)`}>
          <Copy theme="outline" size="24" fill="#333" strokeWidth={2} />
        </InteractiveWrapper>
        <InteractiveWrapper tooltip={t("translate.clear") + ` (⌥D)`}>
          <DeleteTwo theme="outline" size="24" fill="#333" strokeWidth={2} />
        </InteractiveWrapper>
        <InteractiveWrapper tooltip={t("translate.translate") + ` (⌥T)`}>
          <TranslateIcon
            theme="outline"
            size="24"
            fill="#333"
            strokeWidth={2}
          />
        </InteractiveWrapper>
        <span className="">0/200</span>
      </div>
    </div>
  );
};

export default Translate;
