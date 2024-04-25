import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const General = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Translate</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="flex justify-between items-center space-x-8 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-none">源语言</p>
          <p className="text-sm font-extralight text-muted-foreground">
            Email digest, mentions & all activity.
          </p>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="自动检测" />
          </SelectTrigger>
          <SelectContent>
            {["自动检测", "英文", "中文", "日语"].map((lng) => {
              return (
                <SelectItem key={lng} value={lng}>
                  {lng}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center space-x-8 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-none">目标语言</p>
          <p className="text-sm font-extralight text-muted-foreground">
            Email digest, mentions & all activity.
          </p>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="自动检测" />
          </SelectTrigger>
          <SelectContent>
            {["自动检测", "英文", "中文", "日语"].map((lng) => {
              return (
                <SelectItem key={lng} value={lng}>
                  {lng}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <h3 className="text-lg font-medium">引擎设置</h3>
      <Tabs defaultValue="translate" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="translate">翻译引擎</TabsTrigger>
          <TabsTrigger value="detect">检测引擎</TabsTrigger>
          <TabsTrigger value="voice">声音引擎</TabsTrigger>
          <TabsTrigger value="website">网页引擎</TabsTrigger>
        </TabsList>
        <TabsContent value="translate">翻译</TabsContent>
        <TabsContent value="detect">检测</TabsContent>
        <TabsContent value="voice">发音</TabsContent>
        <TabsContent value="website">网页</TabsContent>
      </Tabs>
    </div>
  );
};

export default General;
