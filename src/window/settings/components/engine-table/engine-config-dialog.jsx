import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useEngineStore from "@/storage/engines";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";

import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

export const EngineConfigDialog = ({ open, onClose, originalConfigData }) => {
  const { t } = useTranslation();
  const [configData, setConfigData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [formSchema, setFormSchema] = useState({});
  const { toast } = useToast();

  const engineStore = useEngineStore(
    useShallow((state) => ({
      generalConfigs: state.generalConfigs,
      setGeneralConfig: state.setGeneralConfig,
    }))
  );

  const form = useForm({
    // resolver: zodResolver(FormSchema1),
  });

  useEffect(() => {
    console.log("dialog open", originalConfigData);
    setOpenDialog(open);
    setConfigData(originalConfigData);
    const schema = z.object(
      (configData?.cfg ?? []).reduce((prev, curr) => {
        prev[curr] = z.string();
        return prev;
      }, {})
    );
    setFormSchema(schema);

    let savedData = {};
    if (originalConfigData) {
      console.log(
        "data from store",
        engineStore.generalConfigs[originalConfigData.id]
      );
      savedData = engineStore.generalConfigs[originalConfigData.id];
    }
    let defaultValues = {};
    (configData?.cfg ?? []).forEach((cfg) => {
      defaultValues[cfg] = savedData[cfg] ?? "";
    });

    form.reset({ ...defaultValues });
  }, [open]);

  const onSubmit = (data) => {
    // 存储信息
    engineStore.setGeneralConfig({ platform: configData.id, ...data });
    // 弹出保存提示toast
    toast({
      title: t("configure.translate.config_dialog.toast"),
      description: t("configure.translate.config_dialog.toast_desc", {
        platform: configData?.id ?? "",
      }),
    });

    // 关闭窗口
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="select-none">
          <DialogTitle>
            {t("configure.translate.config_dialog.title")}
          </DialogTitle>
          <DialogDescription>
            {t("configure.translate.config_dialog.desc")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            {configData?.cfg &&
              configData.cfg.map((cfg, index) => {
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={cfg}
                    render={({ field }) => {
                      return (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right capitalize">
                            {cfg}
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="col-span-3 focus:select-all"
                              placeholder={cfg}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                );
              })}
            <Button type="submit" className="w-1/2 mx-auto">
              {t("configure.translate.config_dialog.save")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
