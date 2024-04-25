const DetectLanguage = ({ content }) => {
  return (
    <div className="flex items-center gap-x-1 border rounded-sm px-1 py-0.5 mb-1">
      <span className="flex h-1.5 w-1.5 rounded-full bg-lime-500" />
      <span className="font-extralight text-[10px] select-none">检测为</span>
      <span className="font-normal text-[10px]">英语</span>
    </div>
  );
};

export default DetectLanguage;
