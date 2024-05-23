import "@/i18n";
import useTranslateApp from "@/stores/translate";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import Language from "./components/language";
import SourceInput from "./components/source";
import TranslateItem from "./components/translate-item";

import { readText } from "@tauri-apps/api/clipboard";
import { appWindow } from "@tauri-apps/api/window";
import { useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useGlobalShortcut } from "./hooks/useGlobalShortcut";

const Translate = () => {
  const { t } = useTranslation();
  const [clipboardContent, setClipboardContent] = useState("");

  const { toggleGroupStatus, toggleStatus, setContentToStore } =
    useTranslateApp(
      useShallow((state) => ({
        toggleGroupStatus: state.toggleGroupStatus,
        toggleStatus: state.toggleStatus,
        setContentToStore: state.setContent,
      }))
    );

  useGlobalShortcut(
    "alt+z",
    useCallback(async () => {
      const visible = await appWindow.isVisible();
      if (visible) {
        appWindow.hide();
      } else {
        appWindow.show().then(() => appWindow.setFocus());

        const content = await readText();
        console.log("content", content);

        setContentToStore(content);
        setClipboardContent(content);
      }
    })
  );

  useHotkeys("alt+1", () => {
    toggleGroupStatus(0);
  });

  useHotkeys("alt+2", () => {
    toggleGroupStatus(1);
  });

  useHotkeys("alt+3", () => {
    toggleGroupStatus(2);
  });

  return (
    <div className="flex justify-center items-center m-2 flex-col">
      <SourceInput clipboardContent={clipboardContent} />
      <Language />
      <TranslateItem platform="hack_youdao" open={toggleStatus[0]} />
      <TranslateItem platform="hack_tencent" open={toggleStatus[1]} />
    </div>
  );
};

export default Translate;
