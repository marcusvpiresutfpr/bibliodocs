// Importing necessary modules
import prisma from "@/lib-server/prisma";
import Link from "next/link";
import { Book, Compass, FunctionSquare, Menu, PenLine } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

// Fetch categories and format the navigation links
const getNavLinks = async () => {
  const categories = await prisma.category.findMany({
    include: {
      articles: { select: { title: true, slug: true } },
      formulas: { select: { name: true, id: true } },
    },
  });

  return categories.map((category) => {
    const articles = (category.articles || []).map((article) => ({
      name: article.title,
      href: `/artigos/${article.slug}`,
    }));

    const formulas = (category.formulas || []).map((formula) => ({
      name: formula.name,
      href: `/formulas/${formula.id}`,
    }));

    return {
      name: category.name,
      articles,
      formulas,
    };
  });
};

// Main Sidebar component
const Sidebar: React.FC<Props> = ({ children }) => {
  // Fetch navigation links
  const navlinks = getNavLinks();

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

// MenuItem component
const MenuItem: React.FC<{ href: string; icon: React.ReactNode; text: string }> = ({ href, icon, text }) => (
  <li>
    <Link href={href}>
      {icon} {text}
    </Link>
  </li>
);

// CategoryDropdown component
const CategoryDropdown: React.FC<{ category: Category }> = ({ category }) => (
  <details>
    <summary>
      <span className="truncate">{category.name}</span>
    </summary>
    <ul>
      {(category.articles || []).map((a) => (
        <li key={a.href}>
          <Link href={a.href}>
            <span className="truncate">{a.name}</span>
          </Link>
        </li>
      ))}
      {(category.formulas || []).map((f) => (
        <li key={f.href}>
          <Link href={f.href}>
            <span className="truncate">{f.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  </details>
);

export default Sidebar;
