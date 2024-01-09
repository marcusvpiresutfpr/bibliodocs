export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <article className="prose-slate prose-sm md:prose py-[30vh] px-4 min-w-none w-full">
      <div className="skeleton">
        <h1 className="opacity-0">carregando...</h1>
      </div>
      {
        new Array(3).fill(0).map((_, index) => (
          <div className="skeleton my-2 h-5" key={`skeleton-${index}`} />
        ))
      }
      <div className="skeleton my-2 h-5 w-1/3 mb-5" />
      {
        new Array(1).fill(0).map((_, index) => (
          <div className="skeleton my-2 h-5" key={`skeleton-${index}`} />
        ))
      }
      <div className="skeleton my-2 h-5 w-2/3 mb-5" />
    </article>
  );
}
