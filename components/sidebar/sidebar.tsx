import SidebarAsideMenu from "./aside-menu";
import Link from "next/link";
import { Suspense } from "react";

import { Book, Compass, Newspaper, PenSquare } from "lucide-react";

export default async function SidebarContent() {
  return (
    <nav className="bg-primary-content overflow-auto h-screen w-64 px-4 py-6 scrollbar-none">
      <Link
        href="/"
        className="btn btn-sm btn-ghost text-primary text-lg font-bold w-full justify-start"
      >
        <Book size={18} />
        BIBLIODOCS
      </Link>

      <div className="divider my-2"></div>

      {/* Main Menu */}
      <ul className="menu">
        <li>
          <Link href={`/explorar`}>
            <Compass size={15} />
            Explorar
          </Link>
        </li>
        <li>
          <Link href={`/artigos/novo`}>
            <PenSquare size={15} />
            Novo artigo
          </Link>
        </li>
        <li>
          <Link href={`/artigos`}>
            <Newspaper size={15} />
            Artigos
          </Link>
        </li>
      </ul>

      <div className="divider my-2" />

      <Suspense
        fallback={
          <aside>
            <ul className="menu">
              {Array.from(Array(5).keys()).map((_, index) => (
                <li key={`sidebar-aside-skeleton-menu-${index}`}>
                  <details>
                    <summary>
                      <span className={`skeleton w-36 h-4`} />
                    </summary>
                    <ul></ul>
                  </details>
                </li>
              ))}
            </ul>
          </aside>
        }
      >
        <SidebarAsideMenu />
      </Suspense>
    </nav>
  );
}
