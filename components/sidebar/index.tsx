import prisma from "@/lib-server/prisma";

type Props = {
  children: React.ReactNode;
};

export default async function Sidebar({ children }: Props) {
  const categories = await prisma.category.findMany({
    include: {
      articles: {
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  return (
    <div>
      <h1>Client Component</h1>
    </div>
  );
}
