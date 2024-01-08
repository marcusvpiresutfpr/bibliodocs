import { Book, Menu } from "lucide-react";
import Link from "next/link";

type MenuItemProps = {
  href: string;
  icon: React.ReactNode;
  text: string;
};

// MenuItem component
const MenuItem = ({ href, icon, text }: MenuItemProps) => (
  <li>
    <Link href={href}>
      {icon} {text}
    </Link>
  </li>
);


type Props = {
  children: React.ReactNode;
  arti  
};

export default function SidebarLayout({ children }: Props) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* page content */}
        {children}
        <label
          htmlFor="sidebar"
          className="absolute top-4 left-4 btn btn-sm btn-square drawer-button lg:hidden"
        >
          <Menu size={18} />
        </label>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="bg-base-300 overflow-auto h-screen w-64 p-4 scrollbar-none">
          {/* Logo */}
          <Link href="/" className="btn btn-sm btn-ghost text-primary text-lg font-bold w-full justify-start">
            <Book size={18} />
            BIBLIODOCS
          </Link>

          <div className="divider my-2"></div>

          {/* Main Menu */}
          <ul className="menu scrollbar-none">
            <MenuItem href="/explorar" icon={<Compass size={15} />} text="Explorar" />
            <MenuItem href="/dashboard" icon={<PenLine size={15} />} text="Dashboard" />
            <MenuItem href="/formulas" icon={<FunctionSquare size={15} />} text="Fórmulas" />
            <MenuItem href="/artigos" icon={<Book size={15} />} text="Artigos" />
          </ul>

          <div className="divider my-2" />

          {/* Category Links */}
          <ul className="menu">
            {navlinks.map((category, index) => (
              <li key={`navbar-menu-${index}`}>
                <CategoryDropdown category={category} />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};
}
