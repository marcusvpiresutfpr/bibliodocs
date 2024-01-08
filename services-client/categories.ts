import { Prisma } from "@prisma/client";
import { AM } from "api-models";

const API_ENDPOINT = "/api/categories"; // Substitua pelo seu endpoint real

export async function fetchCategories(args?: AM.RequestData<Prisma.CategoryFindManyArgs>): Promise<AM.ResponseData<AM.Category[]>> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ args }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories. Status: ${response.status}`);
    }

    const responseData: AM.ResponseData<AM.Category[]> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function updateCategories(args: AM.RequestData<Prisma.CategoryUpdateManyArgs>): Promise<AM.ResponseData<AM.BatchPayload>> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ args, data: args?.data }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update categories. Status: ${response.status}`);
    }

    const responseData: AM.ResponseData<AM.BatchPayload> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating categories:", error);
    throw error;
  }
}

export async function deleteCategories(args?: AM.RequestData<Prisma.CategoryDeleteManyArgs>): Promise<AM.ResponseData<AM.BatchPayload>> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ args }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete categories. Status: ${response.status}`);
    }

    const responseData: AM.ResponseData<AM.BatchPayload> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting categories:", error);
    throw error;
  }
}