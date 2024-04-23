import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import SidebarNav from "../sidebar/sidebar-nav";

const Layout = () => {
  const { t } = useTranslation();
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
      title: t("configure.about.label"),
      href: "/about",
    },
  ];

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
