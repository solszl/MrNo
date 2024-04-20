import InteractiveWrapper from "@/components/interactive/wrapper";
import SettingButton from "@/components/setting";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  DeleteTwo,
  Pin,
  Translate as TranslateIcon,
  VolumeNotice,
} from "@icon-park/react";
import { WebviewWindow } from "@tauri-apps/api/window";

const Translate = () => {
  let translateWindow;
  const createNewWindow = async () => {
    if (translateWindow) {
      await translateWindow.show();
      return;
    }
    console.log("prepare for create window");
    if (WebviewWindow) {
      const webview = new WebviewWindow(
        `translate-${Math.floor(Math.random() * 2 ** 30)}`,
        {
          url: "settings.html",
          width: 500,
          height: 500,
          visible: false,
          center: true,
          title: "settings",
          // decorations: false,
        }
      );

      await webview.once("tauri://initialized", () => {
        console.log("webview initialized");
      });

      await webview.once("tauri://error", (e) => {
        console.log("webview error", e);
      });

      webview.once("tauri://close-requested", (e) => {
        console.log("webview close-requested", e);
        translateWindow = null;
      });

      console.log(webview);
      await webview.show();
      translateWindow = webview;
    }
  };

  return (
    <div className="flex justify-center items-center m-2 flex-col">
      <div className="flex justify-end w-full mx-2 gap-x-2">
        <InteractiveWrapper tooltip="Pin Window (⌘+p)">
          <Pin theme="outline" size="24" fill="#333" strokeWidth={2} />
        </InteractiveWrapper>
        <SettingButton />
      </div>
      <Textarea
        placeholder="Type your message here."
        className="outline-none w-full focus-visible:ring-0 min-h-[40px]"
      />

      <div className="flex justify-between items-center w-full ml-2 mr-2 mt-2">
        <InteractiveWrapper tooltip="Speak (⌘+s)">
          <VolumeNotice theme="outline" size="24" fill="#333" strokeWidth={2} />
        </InteractiveWrapper>
        <InteractiveWrapper tooltip="Copy to Clipboard (⌘+c)">
          <Copy theme="outline" size="24" fill="#333" strokeWidth={2} />
        </InteractiveWrapper>
        <InteractiveWrapper tooltip="Delete All (⌘+d)">
          <DeleteTwo theme="outline" size="24" fill="#333" strokeWidth={2} />
        </InteractiveWrapper>
        <InteractiveWrapper tooltip="Translate (⌘+t)">
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
