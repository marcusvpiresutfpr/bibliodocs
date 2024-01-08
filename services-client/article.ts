import { Prisma } from "@prisma/client";
import { AM } from "api-models";

const API_ENDPOINT = "/api/articles";

export async function fetchArticle(
  id: string
): Promise<AM.ResponseData<AM.Article>> {
  try {
    const response = await fetch(`${API_ENDPOINT}/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch article. Status: ${response.status}`);
    }

    const responseData: AM.ResponseData<AM.Article> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

export async function updateArticle(
  id: string,
  data: AM.RequestData<Prisma.ArticleUpdateArgs>
): Promise<AM.ResponseData<AM.Article>> {
  try {
    const response = await fetch(`${API_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update article. Status: ${response.status}`);
    }

    const responseData: AM.ResponseData<AM.Article> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
}

export async function deleteArticle(
  id: string
): Promise<AM.ResponseData<AM.BatchPayload>> {
  try {
    const response = await fetch(`${API_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete article. Status: ${response.status}`);
    }

    const responseData: AM.ResponseData<AM.BatchPayload> =
      await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
}
