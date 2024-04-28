// 引擎相关配置信息

import { Store } from "tauri-plugin-store-api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const engineStore = new Store(".engines.dat");

// if (!(await store.length())) {
//   console.log("engine empty.");

//   const defaultEngines = {};
//   defaultEngines["baidu"] = {
//     name: "name",
//     version: "0.0.0",
//     configured: false,
//     using: true,
//   };
//   const generalConfigs = {
//     baidu: {
//       appid: "",
//       secretKey: "",
//     },
//     tencent: {},
//   };
//   await engineStore.set("engines", defaultEngines);
//   await engineStore.set("generalConfigs", generalConfigs);
//   await engineStore.save();
// }

const engineSettings = async (store) => {
  return {
    setItem: async (name, value) => {
      await store.set(name, value);
      await store.save();
    },
    getItem: async (name) => {
      return (await store.get(name)) || null;
    },
    removeItem: async (name) => {
      await store.delete(name);
      await store.save();
    },
  };
};

const useEngineStore = create(
  persist(
    immer((set) => ({
      /** 各个平台相关的app id, secret key等信息 */
      generalConfigs: {},
      /** 各个插件引擎对应的基础信息,版本号,是否启用等 */
      engines: {},
    })),
    {
      name: "engines",
      storage: createJSONStorage(() => engineSettings(engineStore)),
    }
  )
);

export default useEngineStore;
