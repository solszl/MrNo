import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WebviewWindow } from "@tauri-apps/api/window";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const Settings = () => {
  let settingsWindow;
  const createNewWindow = async () => {
    if (settingsWindow) {
      await settingsWindow.show();
      return;
    }
    console.log("prepare for create window");
    if (WebviewWindow) {
      const webview = new WebviewWindow(
        `settings-${Math.floor(Math.random() * 2 ** 30)}`,
        {
          url: "settings.html",
          width: 500,
          height: 500,
          visible: false,
          center: true,
          maximizable: false,
          resizable: false,
          title: "settings",
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
        settingsWindow = null;
      });

      console.log(webview);
      await webview.show();
      settingsWindow = webview;
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Textarea
        placeholder="Type your message here."
        className="outline-none w-full ml-5 mr-5 focus-visible:ring-0 min-h-[40px]"
      />
      <HiMiniMagnifyingGlass className="block w-[32px] h-[32px] cursor-pointer mr-2" />
      <Button onClick={() => createNewWindow()}>Hello</Button>
    </div>
  );
};

export default Settings;
