import SidebarContent from "./sidebar";

import { Menu } from "lucide-react";

type Props = { children: React.ReactNode };

export default async function Sidebar({ children }: Props) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
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
        
        <SidebarContent />
      </div>
    </div>
  );
}
