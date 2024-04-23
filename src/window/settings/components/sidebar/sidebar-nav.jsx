import { buttonVariants } from "@/components/ui/button";
import { cx } from "class-variance-authority";
import { Link, useLocation } from "react-router-dom";

const SidebarNav = ({ className, items, ...props }) => {
  const { pathname } = useLocation();

  return (
    <nav
      className={cx(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 flex-col",
        className
      )}
      {...props}
    >
      {items.map((item, index) => {
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cx(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
