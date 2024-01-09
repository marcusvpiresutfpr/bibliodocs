import { Send } from "lucide-react";
import { useFormStatus } from "react-dom";

type Props = {
  buttonMessage: string;
};

export default function ArticleSubmitButton({ buttonMessage }: Props) {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? (
        <span className="loading loading-spinner"></span>
      ) : (
        buttonMessage
      )}
    </button>
  );
}
