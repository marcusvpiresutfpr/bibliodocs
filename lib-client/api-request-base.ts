const headers = { "Content-Type": "application/json" };

export default async function request(
  method: string,
  path: string,
  body: unknown
) {
  console.log(`request ${method} (${path}):`, body);

  try {
    const json: RequestInit = { method, headers };
    if (body) json.body = JSON.stringify(body);

    console.log("json:", json);
    const response = await fetch(path, json);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Response is not ok ${JSON.stringify(data)}`);
    }

    return data;
  } catch (error) {
    const errorMessage = `ERROR (${method}) ${path}: ${
      error instanceof Error ? error?.message : "Unknown error"
    }`;

    console.log(errorMessage);
    console.error(error);
    throw errorMessage;
  }
}
