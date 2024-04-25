import ComboBox from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Exchange } from "@icon-park/react";

const Language = () => {
  return (
    <div className="w-full flex justify-between items-center mt-2">
      <ComboBox></ComboBox>
      <Button variant="outline">
        <Exchange theme="outline" size="16" fill="#333" strokeWidth={2} />
      </Button>
      <ComboBox></ComboBox>
    </div>
  );
};

export default Language;
