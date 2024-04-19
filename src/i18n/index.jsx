import { initReactI18next } from "react-i18next";
import en_US from "./locales/en_US.json";
import zh_CN from "./locales/zh_CN.json";

import i18n from "i18next";

i18n.use(initReactI18next).init({
  resources: {
    zh_cn: zh_CN,
    en: en_US,
  },
});

export default i18n;
