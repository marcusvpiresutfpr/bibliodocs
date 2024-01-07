import Link from "next/link";
import { AlertOctagon } from 'lucide-react'

type Props = {
  message: string;
  description?: string;
};

export default function ErrorHero({ message, description }: Props) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-error"><AlertOctagon className="mr-2" size={24} /> {message}</h1>
          {description && <p className="py-6">{description}</p>}
          <Link href={"/"} className="btn btn-primary">Voltar para o inicio</Link>
        </div>
      </div>
    </div>
  );
}
