// 引擎相关配置信息

import { Store } from "tauri-plugin-store-api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const appStore = new Store("apps.dat");

const appSettings = (store) => ({
  getItem: async (name) => {
    // console.log("getItem", { name });
    return (await store.get(name)) || null;
  },
  setItem: async (name, value) => {
    // console.log("setItem", { name, value });
    await store.set(name, value);
    await store.save();
  },
  removeItem: async (name) => {
    // console.log("removeItem", { name });
    await store.delete(name);
    await store.save();
  },
});

const useAppStore = create(
  immer(
    persist(
      (set) => ({
        /** 各个插件引擎对应的基础信息,版本号,是否启用等 */
        engines: {},
        /** 各个平台相关的app id, secret key等信息 */
        generalConfigs: {},
        setGeneralConfig: (cfg) =>
          set((state) => {
            state.generalConfigs[cfg.platform] = { ...cfg };
          }),
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => appSettings(appStore)),
      }
    )
  )
);

export default useAppStore;
