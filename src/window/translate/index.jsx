import "@/i18n";
import { useTranslation } from "react-i18next";
import Language from "./components/language";
import SourceInput from "./components/source";
import TranslateItem from "./components/translate-item";

const Translate = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center m-2 flex-col">
      <SourceInput />
      <Language />
      <TranslateItem platform="hack_360" />
      <TranslateItem />
      <TranslateItem />
      <TranslateItem />
      <TranslateItem />
    </div>
  );
};

export default Translate;
