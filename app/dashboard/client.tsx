"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { Eye, PenLine, PlusSquare, Trash } from "lucide-react";
import { del } from "@/lib-client/api-request-toast";
import { get } from "@/lib-client/api-request-ghost";

type Props = {
  articles: Article[];
  formulas: Formula[];
};

// Componente principal
export default function Dashboard(props: Props) {
  const router = useRouter();

  // Estado local para controlar a seleção de linhas
  const [articles, setArticles] = React.useState<Article[]>(props.articles);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  // Manipulador de mudança de checkbox
  const handleCheckboxChange = (id: string) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  // Manipulador de seleção de todos os checkboxes
  const handleSelectAll = () => {
    const allIds = articles.map((article) => article.id);
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.length === allIds.length ? [] : allIds
    );
  };

  // Manipulador de exclusão
  const handleDelete = () => {
    if (selectedRows.length === 0) return;
    setIsDisabled(true);
    const _selectedRows = [...selectedRows];
    setSelectedRows([]);
    setArticles((prevArticles) =>
      prevArticles.filter((article) => !selectedRows.includes(article.id))
    );
    del("/api/articles/delete", { articleIds: _selectedRows }).then(() => {
      get("/api/articles").then((body) => {
        setArticles(body.articles);
      });
      setIsDisabled(false);
    });
  };

  return (
    <main className="min-h-screen w-full max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-2xl font-bold">Artigos</h1>
      <div className="divider">
        <div className="join join-horizontal">
          <button
            className="btn btn-sm join-item"
            onClick={() => router.push("/artigos/novo")}
          >
            <PlusSquare size={16} />
          </button>
          <button
            className="btn btn-sm join-item"
            onClick={() => router.push(`/artigos/editar/${selectedRows[0]}`)}
          >
            <PenLine size={16} />
          </button>
          <button className="btn btn-sm join-item"
            onClick={() => router.push(`/artigos/${articles.find(a => a.id === selectedRows[0])?.slug}`)}
          >
            <Eye size={16} />
          </button>
          <button className="btn btn-sm join-item" onClick={handleDelete}>
            <Trash size={16} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={selectedRows.length === articles.length}
                    onChange={handleSelectAll}
                  />
                </label>
              </th>
              <th>Título</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
            {articles.map((article) => (
              <tr
                key={article.id}
                className="hover cursor-default select-none"
                onClick={() => handleCheckboxChange(article.id)}
              >
                <th>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(article.id)}
                      onChange={() => handleCheckboxChange(article.id)}
                      className="checkbox checkbox-sm"
                    />
                  </label>
                </th>
                <td>{article.title}</td>
                <td>{article.categoryName}</td>
                <td>
                  <div className="badge badge-outline">
                    {article.createdAt.toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
