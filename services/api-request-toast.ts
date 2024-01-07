import toast from "react-hot-toast";
import request from "./api-request-base";

type Msgs = { loading: string; success: string; error: string };

const defaultMsgs: Msgs = {
  loading: "Carregando...",
  success: "Requisição feita com sucesso!",
  error: "Houve um erro inesperado",
};

export const get = async (path: string, messages: Msgs = defaultMsgs) => {
  return await toast.promise(request("GET", path, false), messages);
};

export const post = async (path: string, body: unknown, messages: Msgs = defaultMsgs) => {
  return await toast.promise(request("POST", path, body), messages);
};

export const put = async (path: string, body: unknown, messages: Msgs = defaultMsgs) => {
  return await toast.promise(request("PUT", path, body), messages);
};
