import InteractiveWrapper from "@/components/interactive/wrapper";
import { SettingOne } from "@icon-park/react";
import { WebviewWindow } from "@tauri-apps/api/window";
import { useTranslation } from "react-i18next";

const SettingButton = () => {
  const { t } = useTranslation();
  let settingPanel;
  const openSettingPanel = async () => {
    if (settingPanel) {
      await settingPanel.show();
      return;
    }

    if (WebviewWindow) {
      const webview = new WebviewWindow(
        `setting-${Math.floor(Math.random() * 2 ** 30)}`,
        {
          url: "settings.html",
          width: 500,
          height: 500,
          visible: false,
          center: true,
          title: "settings",
        }
      );

      await webview.once("tauri://initialized", () => {
        console.log("webview initialized");
        settingPanel = webview;
      });

      webview.once("tauri://close-requested", (e) => {
        settingPanel = null;
      });

      await webview.show();
      settingPanel = webview;
    }
  };
  // "Settings (⌘+,)"
  return (
    <InteractiveWrapper
      tooltip={t("translate.settings") + ` (⌘+,)`}
      onClick={openSettingPanel}
    >
      <SettingOne theme="outline" size="24" fill="#333" strokeWidth={2} />
    </InteractiveWrapper>
  );
};

export default SettingButton;
