import { Prisma } from "@prisma/client";
import { AM } from "api-models";

const API_ENDPOINT = "/api/articles";

export async function fetchArticles(
  args?: AM.RequestData<Prisma.ArticleFindManyArgs>
): Promise<AM.ResponseData<AM.Article[]>> {
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

export async function updateArticles(args?: AM.RequestData<Prisma.ArticleUpdateManyArgs>): Promise<AM.ResponseData<AM.BatchPayload>> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ args, data: args?.data }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update articles. Status: ${response.status}`);
    }

    const responseData: AM.ResponseData<AM.BatchPayload> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating articles:", error);
    throw error;
  }
}

export async function deleteArticles(args: AM.RequestData<Prisma.ArticleDeleteManyArgs>): Promise<AM.ResponseData<AM.BatchPayload>> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ args }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete articles. Status: ${response.status}`);
    }

    const responseData: AM.ResponseData<AM.BatchPayload> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting articles:", error);
    throw error;
  }
}