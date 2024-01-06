import prisma from '@/lib-server/prisma';

// Exampele Search
// GET /api/categories?includeArticles=true&includeFormulas=true

interface IncludeOptions {
  articles?: boolean;
  Formula?: boolean;
}

export async function GET(request: Request) {
  try {
/*     const { searchParams } = new URL(request.url);
    const includeArticles = searchParams.get('includeArticles') === 'true';
    const includeFormulas = searchParams.get('includeFormulas') === 'true';

    const include: IncludeOptions = {};
    if (includeArticles) include['articles'] = true;
    if (includeFormulas) include['Formula'] = true;
 */


    // return new Response(JSON.stringify({ categories }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
