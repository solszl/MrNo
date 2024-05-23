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
      toggleStatus: [true, false, false, false, false],
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
      toggleGroupStatus: (index) =>
        set((state) => {
          state.toggleStatus[index] = !state.toggleStatus[index];
        }),
    };
  })
);

export default useTranslateApp;
