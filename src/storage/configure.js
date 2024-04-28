import { Store } from "tauri-plugin-store-api";

import { path } from "@tauri-apps/api";

(async () => {
  const appDataPath = await path.appDataDir();
  console.log(appDataPath);
})();

console.log("store load.");
const store = new Store(".settings.dat");

if (!(await store.length())) {
  store.set("isFirstLaunch", true);
  store.save();
  console.log("save success.");
}

const isFirstLaunch = await store.get("isFirstLaunch");
console.log("isFirstLaunch", isFirstLaunch);
