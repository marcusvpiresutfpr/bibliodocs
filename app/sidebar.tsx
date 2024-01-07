import prisma from "@/lib-server/prisma";
import Link from "next/link";

import { Book, Compass, FunctionSquare, Menu, PenLine } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default async function Sidebar({ children }: Props) {
  const categories = await prisma.category.findMany({
    include: {
      articles: {
        select: {
          title: true,
          slug: true,
        },
      },
      formulas: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  const navlinks = categories.map((category) => {
    const articles =
      category.articles?.map((article) => ({
        name: article.title,
        href: `/artigos/${article.slug}`,
      })) || [];
    const formulas =
      category.formulas?.map((formula) => ({
        name: formula.name,
        href: `/formulas/${formula.id}`,
      })) || [];
    return {
      name: category.name,
      articles,
      formulas,
    };
  });

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="sidebar"
          className="btn btn-primary btn-square drawer-button lg:hidden absolute top-4 left-4 z-10"
        >
          <Menu size={24} />
        </label>
        {children}
      </div>

      {/* Sidebar */}
      <div className="drawer-side p-4 bg-base-300 scrollbar-none">
        <label
          htmlFor="sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <Link
          href="/"
          className="btn btn-sm btn-ghost text-primary text-lg font-bold w-full justify-start w-64"
        >
          <Book size={18} />
          BIBLIODOCS
        </Link>

        <div className="divider my-2"></div>

        <ul className="menu w-64">
          <li>
            <Link href="/explorar">
              <Compass size={15} />
              Explorar
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <PenLine size={15} />
              Dashboard
            </Link>{" "}
          </li>
          <li>
            <Link href="/formulas">
              <FunctionSquare size={15} />
              Fórmulas
            </Link>{" "}
          </li>
          <li>
            <Link href="/artigos">
              <Book size={15} />
              Artigos
            </Link>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>

        <div className="divider my-2" />

        <ul className="menu w-64">
          {navlinks.map((category, index) => (
            <li key={`navbar-menu-${index}`}>
              <details>
                <summary>
                  <span className="truncate">{category.name}</span>
                </summary>
                <ul>
                  {category.articles?.map((a) => (
                    <li key={a.href}>
                      <Link href={a.href}>
                        <span className="truncate">{a.name}</span>
                      </Link>
                    </li>
                  ))}
                  {category.formulas?.map((f) => (
                    <li key={f.href}>
                      <Link href={f.href}>
                        <span className="truncate">{f.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
