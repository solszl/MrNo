import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useTranslateApp = create(
  immer((set) => {
    return {
      detectLanguage: "",
      contentType: "",
      sourceLanguage: "",
      targetLanguage: "",
      setDetectLanguage: (lng) =>
        set((state) => {
          state.detectLanguage = lng;
        }),
      setContentType: (type) =>
        set((state) => {
          state.contentType = type;
        }),
    };
  })
);

export default useTranslateApp;
