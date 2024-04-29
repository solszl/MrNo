import { Checkbox } from "@/components/ui/checkbox";
import i18next from "i18next";
import { EngineConfigDialog } from "./engine-config-dialog";
import EngineRowAction from "./engine-row-action";

const { t } = i18next;
export const EngineColumns = [
  {
    id: "enable",
    header: ({ table }) => {
      return t("configure.translate.engine_enable");
    },
    cell: ({ row }) => (
      // <div className="capitalize">{row.getValue("enable").toString()}</div>
      <Checkbox
        checked={row.getValue("enable")}
        // onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ table }) => {
      return t("configure.translate.engine_name");
    },
    cell: ({ row }) => {
      console.log("123", row.getValue("name"));
      return <div>{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "version",
    header: ({ table }) => {
      return t("configure.translate.engine_version");
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("version")}</div>
    ),
  },
  {
    accessorKey: "configured",
    header: ({ table }) => {
      return t("configure.translate.engine_configured");
    },
    cell: ({ row }) => (
      // <div className="capitalize">{row.getValue("configured")}</div>

      <EngineConfigDialog>
        <div className="capitalize">open</div>
      </EngineConfigDialog>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <EngineRowAction row={row} />,
  },
];
