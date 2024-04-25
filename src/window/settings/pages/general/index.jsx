import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

const General = () => {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      security_emails: true,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{t("configure.general.label")}</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="flex justify-between items-center space-x-8 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-none">读取剪贴板内容</p>
          <p className="text-sm font-extralight text-muted-foreground">
            Email digest, mentions & all activity.
          </p>
        </div>
        <Switch />
      </div>
      <div className="flex justify-between items-center space-x-8 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-none">开机启动</p>
          <p className="text-sm font-extralight text-muted-foreground">
            Email digest, mentions & all activity.
          </p>
        </div>
        <Switch />
      </div>
      <div className="flex justify-between items-center space-x-8 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-none">启动时检查更新</p>
          <p className="text-sm font-extralight text-muted-foreground">
            Email digest, mentions & all activity.
          </p>
        </div>
        <Switch />
      </div>
      <div className="flex justify-between items-center space-x-8 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-none">保持在最上层</p>
          <p className="text-sm font-extralight text-muted-foreground">
            Email digest, mentions & all activity.
          </p>
        </div>
        <Switch />
      </div>
      <div className="flex justify-between items-center space-x-8 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-none">应用语言</p>
          <p className="text-sm font-extralight text-muted-foreground">
            Email digest, mentions & all activity.
          </p>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="System" />
          </SelectTrigger>
          <SelectContent>
            {[
              "System",
              "Chinese Simplified",
              "Chinese Traditional",
              "English",
            ].map((lng) => {
              return (
                <SelectItem key={lng} value={lng}>
                  {lng}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default General;
