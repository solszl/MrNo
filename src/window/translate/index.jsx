import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WebviewWindow } from "@tauri-apps/api/window";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

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
          url: "translate.html",
          width: 500,
          height: 500,
          visible: false,
          center: true,
          maximizable: false,
          resizable: false,
          title: "translate",
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

export default Translate;
