import { NextResponse } from "next/server";

export default function errorHandler(error: unknown, req: Request) {
  console.error(
    `Error processing request: ${(error as Error).message || "unknown error"}`
  );
  return new NextResponse(
    JSON.stringify({
      error: "Internal server error",
      details: {
        message: (error as Error).message || "unknown error",
        request: {
          url: req.url,
          method: req.method,
          headers: req.headers,
          body: req.json(),
        },
        error: error,
      },
    } as ApiError),
    { status: 500 }
  );
}
