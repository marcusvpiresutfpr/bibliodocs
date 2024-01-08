import toast, {
  DefaultToastOptions,
  Renderable,
  ValueOrFunction,
} from "react-hot-toast";

const headers = { "Content-Type": "application/json" };

type Msgs = {
  loading: Renderable;
  success: ValueOrFunction<Renderable, any>; // TODO: Fix this type (should be ValueOrFunction<Renderable, T>)
  error: ValueOrFunction<Renderable, any>;
};

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  body?: object;
  ghost?: boolean;
  msgs?: Msgs;
  opts?: DefaultToastOptions;
}

const defaultMsgs: Msgs = {
  loading: "Carregando...",
  success: "Requisição feita com sucesso!",
  error: "Houve um erro inesperado",
};

const logRequestDetails = (
  method: string,
  path: string,
  options: RequestInit
) => {
  console.log(`Request ${method} (${path}):`, options);
};

const handleErrorResponse = async (response: Response) => {
  const errorData = await response.json();
  console.error("Response is not ok", errorData);
  throw new Error(`Response is not ok ${JSON.stringify(errorData)}`);
};

export default async function request({
  method,
  path,
  body,
  ghost,
  msgs = defaultMsgs,
  opts,
}: RequestOptions) {
  try {
    const options: RequestInit = { method, headers };
    if (body) options.body = JSON.stringify(body);

    logRequestDetails(method, path, options);

    const response = ghost
      ? await fetch(path, options)
      : await toast.promise(fetch(path, options), msgs, opts);

    if (!response.ok) {
      await handleErrorResponse(response);
    }

    return response.json();
  } catch (error) {
    const errorMessage = `ERROR (${method}) ${path}: ${
      error instanceof Error ? error?.message : "Unknown error"
    }`;

    console.error(errorMessage);
    console.error(error);

    // Re-throw the error to maintain consistent error handling
    throw error;
  }
}
