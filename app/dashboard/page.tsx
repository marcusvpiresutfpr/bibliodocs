import prisma from "@/lib-server/prisma";
import Dashboard from "./client";

export default async function DashboardPage() {
  let articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
  });

  let formulas = await prisma.formula.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return <Dashboard articles={articles} formulas={formulas} />;
}
