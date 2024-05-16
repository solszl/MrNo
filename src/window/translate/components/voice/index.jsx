import { VolumeNotice } from "@icon-park/react";
import { useTranslation } from "react-i18next";
import useSound from "use-sound";

const Voice = ({ label, phonetic, speech }) => {
  const { t } = useTranslation();
  const [play, { stop }] = useSound(speech, {
    html5: true,
    format: ["mp3"],
    // delegated: {
    //   xhr: {
    //     headers: {
    //       Referer: "https://fanyi.qq.com/",
    //     },
    //   },
    // },
  });

  return (
    <div className="flex items-center gap-x-2 px-1 py-0.5 mb-1 text-sm">
      <span className="text-[12px]">{t(`translate.pronounce.${label}`)}</span>
      {phonetic && <span>{phonetic}</span>}
      <VolumeNotice
        theme="outline"
        size="16"
        fill="#333"
        strokeWidth={2}
        className="cursor-pointer"
        onMouseEnter={() => play()}
        onMouseLeave={() => stop()}
      />
    </div>
  );
};

export default Voice;
