import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const Settings = () => {
  return (
    <div className="flex justify-center items-center">
      <Textarea
        placeholder="Type your message here."
        className="outline-none w-full ml-5 mr-5 focus-visible:ring-0 min-h-[40px]"
      />
      <HiMiniMagnifyingGlass className="block w-[32px] h-[32px] cursor-pointer mr-2" />
      <Button>Hello</Button>
    </div>
  );
};

export default Settings;
