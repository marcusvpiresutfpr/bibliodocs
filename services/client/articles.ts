// services-client/articles.ts

import { AM } from "api-models";

const API_ENDPOINT = "/api/articles"; // Substitua pelo seu endpoint real

export async function fetchArticles(args?: AM.RequestData<Prisma.ArticleFindManyArgs>): Promise<AM.ResponseData<AM.Article[]>> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ args }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles. Status: ${response.status}`);
    }

    const responseData: AM.ResponseData<AM.Article[]> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Propagar o erro para que o código cliente possa tratá-lo, se necessário
  }
}
