import Link from "next/link";

type Props = {
  menu: {
    menuTitle: string;
    menuItems: { name: string; href: string }[];
  };
};

export default async function SidebarDropdown({ menu }: Props) {
  return (
    <details>
      <summary>
        <span className="truncate">{menu.menuTitle}</span>
      </summary>
      <ul>
        {menu.menuItems.map((item, index) => (
          <li key={`sidebar-menu-dropdown-item-${index}`}>
            <Link href={item.href}>
              <span className="truncate">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
