import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyTwo, More, Stretching } from "@icon-park/react";
import { open } from "@tauri-apps/api/shell";
import { useState } from "react";
import { EngineConfigDialog } from "./engine-config-dialog";

const EngineRowAction = ({ row }) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <More theme="outline" size="16" fill="#333" strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[160px] mt-2">
          <DropdownMenuItem
            className="cursor-pointer flex items-center justify-between gap-x-1 px-4 py-2"
            onClick={async () => {
              await open(row.original["regURL"]);
            }}
          >
            官网申请Key
            <Stretching theme="outline" size="16" fill="#333" strokeWidth={2} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center justify-between gap-x-1 px-4"
            onClick={() => setOpenDialog(true)}
          >
            配置Key
            <KeyTwo theme="outline" size="16" fill="#333" strokeWidth={2} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EngineConfigDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        configData={row.original}
      />
    </div>
  );
};

export default EngineRowAction;
