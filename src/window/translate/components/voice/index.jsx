import { VolumeNotice } from "@icon-park/react";

const Voice = ({ label, soundmark, tts }) => {
  return (
    <div className="flex items-center gap-x-2 px-1 py-0.5 mb-1 text-sm">
      <span className="text-[12px]">{label}</span>
      <span>{soundmark}</span>
      <VolumeNotice
        theme="outline"
        size="16"
        fill="#333"
        strokeWidth={2}
        className="cursor-pointer"
      />
    </div>
  );
};

export default Voice;
