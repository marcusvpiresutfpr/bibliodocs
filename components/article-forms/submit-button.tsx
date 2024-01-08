import { Send } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function ArticleSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? (
        <span className="loading loading-spinner"></span>
      ) : (
        "Novo Artigo"
      )}
    </button>
  );
}
