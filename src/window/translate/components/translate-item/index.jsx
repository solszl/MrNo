import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Copy, Down, Up, VolumeNotice } from "@icon-park/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Explain from "../explain";
import Voice from "../voice";

const TranslateItem = () => {
  const [isOpen, setIsOpen] = useState(false);
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
          <div className="flex gap-x-4">
            <Voice label="英" soundmark="/həˈləʊ/" />
            <Voice label="美" soundmark="/həˈloʊ/" />
          </div>
          <Explain
            partOfSpeech="int."
            explain="喂，你好（用于问候或打招呼）；喂，你好（打电话时的招呼语）；喂，你好（引起别人注意的招呼语）；<非正式>喂，嘿 (认为别人说了蠢话或分心)；<英，旧>嘿（表示惊讶）"
          />
          <Explain
            partOfSpeech="n."
            explain="招呼，问候；（Hello）（法、印、美、俄）埃洛（人名）"
          />
          <Explain partOfSpeech="v." explain="说（或大声说）“喂”；打招呼" />
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
