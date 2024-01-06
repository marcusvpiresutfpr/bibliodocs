import prisma from '@/lib-server/prisma';

// Exampele Search
// GET /api/categories?includeArticles=true&includeFormulas=true

interface IncludeOptions {
  articles?: boolean;
  Formula?: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeArticles = searchParams.get('includeArticles') === 'true';
  const includeFormulas = searchParams.get('includeFormulas') === 'true';

  const include: IncludeOptions = {};
  if (includeArticles) include['articles'] = true;
  if (includeFormulas) include['Formula'] = true;

  const categories = await prisma.category.findMany({
    include,
  });

  return new Response(JSON.stringify(categories), { status: 200 });
}