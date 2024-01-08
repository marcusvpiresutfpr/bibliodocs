import SidebarDropdown from "./dropdown";
import prisma from "@/lib/prisma";

import { Suspense } from "react";

export default async function SidebarAsideMenu() {
  const categories = await prisma.category.findMany({
    select: { name: true, articles: { select: { title: true, slug: true } } },
  });

  const asideMenu = categories.map((c) => {
    const menuItems = c.articles?.map((a) => ({
      name: a.title,
      href: `/articles/${a.slug}`,
    }));

    return {
      menuTitle: c.name,
      menuItems,
    };
  });

  return (
    <aside>
      <ul className="menu">
        {asideMenu.map((menu, index) => (
          <Suspense
            key={`sidebar-aside-menu-${index}`}
            fallback={<div className="skeleton w-full h-32"></div>}
          >
            <li>
              <SidebarDropdown menu={menu} />
            </li>
          </Suspense>
        ))}
      </ul>
    </aside>
  );
}
