import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useTranslateApp from "@/stores/translate";
import { Copy, Down, Up } from "@icon-park/react";
import { useAsyncEffect } from "ahooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import Explain from "../explain";
import Voice from "../voice";

const TranslateItem = ({ platform }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [explain, setExplain] = useState();
  const {
    contentType,
    detectLanguage,
    content,
    sourceLanguage,
    targetLanguage,
  } = useTranslateApp(
    useShallow((state) => ({
      contentType: state.contentType,
      detectLanguage: state.detectLanguage,
      content: state.content,
      sourceLanguage: state.sourceLanguage,
      targetLanguage: state.targetLanguage,
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

    // if (contentType === "translate") {
    //   const { translate } = await import(
    //     /* @vite-ignore */ `/plugins/translate/${platform}.js`
    //   );

    //   result = await translate(content, "en", "zh");
    // } else if (contentType === "paragraph") {
    //   const { translate } = await import(
    //     /* @vite-ignore */ `/plugins/paragraph/${platform}.js`
    //   );

    //   result = await translate(content, sourceLanguage, targetLanguage);
    // }
    // setExplain(result);

    const plugin = await import(/* @vite-ignore */ `/plugins/${platform}.js`);
    const result = await plugin[contentType](
      content,
      sourceLanguage,
      targetLanguage
    );
    setExplain(result);
  }, [isOpen, platform, contentType, detectLanguage, content]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full p-1 border mt-2 rounded-md"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <span className="text-xs font-thin items-center flex select-none">
          {/* <FaGoogle className="w-3 h-3 mr-2" /> */}
          {/* <img src="./youdao.png" alt="" className="w-3 h-3 mr-2" /> */}
          {/* <BiLogoBing className="w-3 h-3 mr-2" /> */}
          {t(`platform.${platform}`)}
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
                {explain.pronounce.map((pronounce) => (
                  <Voice key={pronounce.speech} {...pronounce} />
                ))}
              </div>
              {explain.explains.map((explain, index) => (
                <Explain key={index} {...explain} />
              ))}
            </>
          )}
        </div>
        {contentType === "paragraph" && (
          <div className="w-full space-x-4 px-4 flex items-center pb-2">
            <Copy
              theme="outline"
              size="16"
              fill="#333"
              strokeWidth={2}
              className="cursor-pointer"
            />
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TranslateItem;
