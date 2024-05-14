import ComboBox from "@/components/combobox";
import { Button } from "@/components/ui/button";
import useTranslateApp from "@/stores/translate";
import { Exchange } from "@icon-park/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";

const Language = () => {
  const {
    sourceLanguage,
    targetLanguage,
    setSourceLanguage,
    setTargetLanguage,
    swapLanguage,
  } = useTranslateApp(
    useShallow((state) => ({
      sourceLanguage: state.sourceLanguage,
      targetLanguage: state.targetLanguage,
      setSourceLanguage: state.setSourceLanguage,
      setTargetLanguage: state.setTargetLanguage,
      swapLanguage: state.swapLanguage,
    }))
  );

  const { t } = useTranslation();
  const sourceRef = useRef(null);
  const targetRef = useRef(null);

  const lngList = [
    { value: "en_us", label: t("language.en_us") },
    { value: "zh_cn", label: t("language.zh_cn") },
    { value: "jp", label: t("language.jp") },
    { value: "ko", label: t("language.ko") },
    { value: "ru", label: t("language.ru") },
  ];

  const swapLanguageHandle = () => {
    let newTargetTmp = sourceLanguage;
    let newSourceTmp = targetLanguage;
    if (newTargetTmp === "auto") {
      newTargetTmp = "en_us";
    }

    swapLanguage(newSourceTmp, newTargetTmp);
  };

  useEffect(() => {
    // 设置comboBox选中值
    sourceRef?.current.setCurrentValue(sourceLanguage);
    targetRef?.current.setCurrentValue(targetLanguage);
  }, [sourceLanguage, targetLanguage]);

  return (
    <div className="w-full flex justify-between items-center mt-2">
      <ComboBox
        ref={sourceRef}
        lngList={[{ value: "auto", label: t("language.auto") }, ...lngList]}
        onItemSelect={setSourceLanguage}
        defaultSelectValue={sourceLanguage}
      ></ComboBox>
      <Button variant="ghost" className="mx-2" onClick={swapLanguageHandle}>
        <Exchange theme="outline" size="16" fill="#333" strokeWidth={2} />
      </Button>
      <ComboBox
        ref={targetRef}
        lngList={[...lngList]}
        onItemSelect={setTargetLanguage}
        defaultSelectValue={targetLanguage}
      ></ComboBox>
    </div>
  );
};

export default Language;
