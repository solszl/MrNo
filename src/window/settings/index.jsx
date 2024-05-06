import { Toaster } from "@/components/ui/toaster";
import { useTranslation } from "react-i18next";
import { useRoutes } from "react-router-dom";
import SidebarNav from "./components/sidebar/sidebar-nav";
import routes from "./routes";

const Settings = () => {
  const pages = useRoutes(routes);
  const { t, i18n } = useTranslation();

  const sidebarNavItems = [
    {
      title: t("configure.general.label"),
      href: "/general",
    },
    {
      title: t("configure.translate.label"),
      href: "/translate",
    },
    {
      title: t("configure.shortcut.label"),
      href: "/shortcut",
    },
    {
      title: t("configure.about.label"),
      href: "/about",
    },
  ];

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="flex flex-col relative">
        <aside className="-mx-4 w-1/5 fixed">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="pl-[22%]">{pages}</div>
        <Toaster />
      </div>
    </div>
  );
};

export default Settings;
