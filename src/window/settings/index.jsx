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
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col space-y-8  relative">
        <aside className="-mx-4 w-1/5 fixed">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="pl-[22%]">{pages}</div>
      </div>
    </div>
  );
};

export default Settings;
