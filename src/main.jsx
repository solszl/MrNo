import "@icon-park/react/styles/index.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Translate from "./window/translate";

document.addEventListener("keydown", async (e) => {
  console.log("key down, key:", e.key);
  if (e.key === "Escape") {
    // await appWindow.close();
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <TooltipProvider>
      <Translate />
    </TooltipProvider>
  </React.StrictMode>
);
