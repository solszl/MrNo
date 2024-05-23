import {
  isRegistered,
  register,
  unregister,
} from "@tauri-apps/api/globalShortcut";
import { useEffect, useRef } from "react";

export const useGlobalShortcut = (hotkey, handle) => {
  const keyRef = useRef(hotkey);
  const handleRef = useRef(handle);

  useEffect(() => {
    if (!hotkey || !handle) {
      console.log("hotkey", hotkey);
      console.log("handle", handle);
      return;
    }

    const registerHotkey = async () => {
      const isShortcutRegistered = await isRegistered(keyRef.current);

      if (!isShortcutRegistered) {
        register(keyRef.current, handleRef.current);
      }
    };

    registerHotkey().catch((err) =>
      console.error(`Failed to register global shortcut '${shortcut}'`, err)
    );

    return () => {
      unregister(keyRef.current);
    };
  }, []);
};
