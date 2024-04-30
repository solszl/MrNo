import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const EngineConfigDialog = ({ open, onClose, configData }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log("configData", configData);
  }, [open]);

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
        <div className="grid gap-4 py-4">
          {configData?.cfg &&
            configData.cfg.map((cfg, index) => (
              <div
                index={index}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={cfg} className="text-right capitalize">
                  {cfg}
                </Label>
                <Input id={cfg} className="col-span-3" placeholder={cfg} />
              </div>
            ))}
        </div>
        <DialogFooter>
          <Button type="submit">
            {t("configure.translate.engine_config_save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
