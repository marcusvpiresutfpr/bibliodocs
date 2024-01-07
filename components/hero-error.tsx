import Link from "next/link";
import { AlertOctagon } from "lucide-react";

type Props = {
  message: string;
  description?: string;
};

export default function ErrorHero({ message, description }: Props) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="flex flex-col  items-center">
            <AlertOctagon className="mr-2 text-error" size={96} strokeWidth={3} />{" "}
            <h1 className="text-lg font-black text-error mt-4 mb-2">{message}</h1>
            <Link href={"/"} >
              Voltar para o inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
