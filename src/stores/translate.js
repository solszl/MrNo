import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useTranslateApp = create(
  immer((set) => {
    return {
      detectLanguage: "",
      content: "",
      contentType: "",
      sourceLanguage: "auto",
      targetLanguage: "zh_cn",
      setContent: (text) =>
        set({
          content: text,
        }),
      setDetectLanguage: (lng) =>
        set((state) => {
          state.detectLanguage = lng;
        }),
      setContentType: (type) =>
        set((state) => {
          state.contentType = type;
        }),
      setSourceLanguage: (lng) =>
        set((state) => {
          state.sourceLanguage = lng;
        }),
      setTargetLanguage: (lng) =>
        set((state) => {
          state.targetLanguage = lng;
        }),
      swapLanguage: (newSource, newTarget) =>
        set({
          sourceLanguage: newSource,
          targetLanguage: newTarget,
        }),
    };
  })
);

export default useTranslateApp;
