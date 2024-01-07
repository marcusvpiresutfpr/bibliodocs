"use client";

type Props = {
  message: string;
};

export default function HeroLoading({ message }: Props) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            <div className="loading loading-2xl mr-2" /> {message}
          </h1>
        </div>
      </div>
    </div>
  );
}
