import i18next from "i18next";

const { t } = i18next;
export const columns = [
  {
    id: "enable",
    header: ({ table }) => {
      return t("configure.shortcut.enable");
    },
    cell: ({ row }) => {},
  },
  {
    id: "command",
    header: ({ table }) => {
      return t("configure.shortcut.command");
    },
    cell: ({ row }) => {},
  },
  {
    id: "Keybinding",
    header: ({ table }) => {
      return t("configure.shortcut.keybinding");
    },
    cell: ({ row }) => {},
  },
  {
    id: "desc",
    header: ({ table }) => {
      return t("configure.shortcut.description");
    },
    cell: ({ row }) => {},
  },
  {
    id: "action",
    header: ({ table }) => {
      return t("configure.shortcut.action");
    },
    cell: ({ row }) => {},
  },
];
