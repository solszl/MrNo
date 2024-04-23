"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@icon-park/react/styles/index.css";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import Settings from "./window/settings";
import Translate from "./window/translate";

const windowsMap = {
  translate: <Translate />,
  setting: <Settings />,
};

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("zh_cn");
  }, []);

  return (
    <BrowserRouter>
      <TooltipProvider>
        {windowsMap[appWindow.label.split("-")[0]]}
      </TooltipProvider>
    </BrowserRouter>
  );
}
