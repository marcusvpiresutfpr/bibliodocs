import SidebarDropdown from "./dropdown";
import prisma from "@/lib/prisma";

export default async function SidebarAsideMenu() {
  const asideMenu = await (async () => {
    const categories = await prisma.category.findMany({
      select: { name: true, articles: { select: { title: true, slug: true } } },
    });

    // Simulate loading
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    return categories.map((c) => {
      const menuItems = c.articles?.map((a) => ({
        name: a.title,
        href: `/articles/${a.slug}`,
      }));

      return {
        menuTitle: c.name,
        menuItems,
      };
    });
  })();

  return (
    <aside>
        <ul className="menu">
          {asideMenu.map((menu, index) => (
            <li key={`sidebar-aside-menu-${index}`}>
              <SidebarDropdown menu={menu} />
            </li>
          ))}
        </ul>
    </aside>
  );
}
