import request from "./api-request-base";

export const get = async (path: string) => {
  return await request("GET", path, null);
};

export const post = async (
  path: string,
  body: unknown,
) => {
  return await request("POST", path, body);
};

export const patch = async (
  path: string,
  body: unknown,
) => {
  return await request("PATCH", path, body);
};
