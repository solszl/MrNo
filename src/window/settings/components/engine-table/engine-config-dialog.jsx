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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { z } from "zod";

export const EngineConfigDialog = ({ open, onClose, originalConfigData }) => {
  const { t } = useTranslation();
  const [configData, setConfigData] = useState(null);

  const [formSchema, setFormSchema] = useState({});

  const form = useForm({
    // resolver: zodResolver(FormSchema1),
  });

  form.setFocus;

  useEffect(() => {
    setConfigData(originalConfigData);
    const schema = z.object(
      (configData?.cfg ?? []).reduce((prev, curr) => {
        prev[curr] = z.string();
        return prev;
      }, {})
    );
    setFormSchema(schema);

    let defaultValues = {};
    (configData?.cfg ?? []).forEach((cfg) => {
      defaultValues[cfg] = "";
    });

    form.reset({ ...defaultValues });
  }, [open]);

  const onSubmit = (data) => {
    console.log("form submit", data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {t("configure.translate.engine_config_title")}
          </DialogTitle>
          <DialogDescription>
            {t("configure.translate.engine_config_desc")}
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
                              className="col-span-3"
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
              {t("configure.translate.engine_config_save")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
