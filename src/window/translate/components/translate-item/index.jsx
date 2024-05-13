import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useTranslateApp from "@/stores/translate";
import { Copy, Down, Up, VolumeNotice } from "@icon-park/react";
import { useAsyncEffect } from "ahooks";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";
import Explain from "../explain";
import Voice from "../voice";

const TranslateItem = ({ platform }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [explain, setExplain] = useState();
  const { contentType, detectLanguage } = useTranslateApp(
    useShallow((state) => ({
      contentType: state.contentType,
      detectLanguage: state.detectLanguage,
    }))
  );

  useEffect(() => {
    console.log("from translate item", contentType, detectLanguage);
  }, [contentType, detectLanguage]);

  useAsyncEffect(async () => {
    if (!isOpen) {
      return;
    }

    if (!platform || contentType === "web") {
      return;
    }

    const { translate } = await import(
      /* @vite-ignore */ `/plugins/${contentType}/${platform}.js`
    );

    const result = await translate("interface", "en", "zh");
    setExplain(result);
  }, [isOpen, platform, contentType, detectLanguage]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full p-1 border mt-2 rounded-md"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <span className="text-xs font-thin items-center flex select-none">
          <FaGoogle className="w-3 h-3 mr-2" />
          {/* <img src="./youdao.png" alt="" className="w-3 h-3 mr-2" /> */}
          {/* <BiLogoBing className="w-3 h-3 mr-2" /> */}
          谷歌翻译
        </span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? (
              <Up theme="outline" size="16" fill="#333" strokeWidth={2} />
            ) : (
              <Down theme="outline" size="16" fill="#333" strokeWidth={2} />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="w-full px-4 flex flex-col">
          {explain && (
            <>
              <div className="flex gap-x-4">
                {explain.pronounce?.map((pronounce, index) => (
                  <Voice key={index} {...pronounce} />
                ))}
              </div>
              {explain.explains.map((explain, index) => (
                <Explain key={index} {...explain} />
              ))}
            </>
          )}
        </div>
        <div className="w-full space-x-4 px-4 flex items-center pb-2">
          {/* 播放原文声音 */}
          <VolumeNotice theme="outline" size="16" fill="#333" strokeWidth={2} />
          <Copy theme="outline" size="16" fill="#333" strokeWidth={2} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TranslateItem;
