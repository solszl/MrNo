import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Unsupported = () => {
  const { t } = useTranslation();
  return (
    <>
      <span className="flex h-1.5 w-1.5 rounded-full bg-red-500" />
      <span className="font-extralight text-[10px] select-none">
        {t("language.unsupported")}
      </span>
    </>
  );
};

const Supported = ({ src }) => {
  const { t } = useTranslation();
  return (
    <>
      <span className="flex h-1.5 w-1.5 rounded-full bg-lime-500" />
      <span className="font-normal text-[10px]">{t(`language.${src}`)}</span>
    </>
  );
};
const DetectLanguage = ({ src }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log("DetectLanguage", src);
    console.log(`language.${src ?? "-"}`);
    console.log(t(`language.${src ?? "-"}`));
  }, [src]);

  return (
    <div className="flex items-center gap-x-1 border rounded-sm px-1 py-0.5 mb-1">
      {src === "-" ? <Unsupported /> : <Supported src={src} />}
    </div>
  );
};

export default DetectLanguage;
