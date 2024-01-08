import stt from "@/services-server/status-code";

import { AM } from "api-models";

export default function errorHandler(error: unknown, req: Request) {
  const response: AM.ResponseData<unknown> = {
    message: "Unknown server error",
    details: {},
    error,
  };

  if (error instanceof Error) response.message = error.message;
  console.error(`Error processing request: ${response.message}`);

  response.details = {
    request: {
      url: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
    },
  };

  return new Response(JSON.stringify(response), {
    status: stt.internalServerError,
  });
}
