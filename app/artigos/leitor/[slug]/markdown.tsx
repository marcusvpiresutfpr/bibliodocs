import { MDXRemote } from "next-mdx-remote/rsc";

type Props = { article: Article };

export default async function Markdown({ article }: Props) {
  return (
    // Ideally this loading spinner would ensure there is no layout shift,
    // this is an example for how to provide such a loading spinner.
    // In Next.js you can also use `loading.js` for this.
    <article className="prose-slate prose-sm md:prose pt-[30vh] pb-10 px-4 min-w-none">
      {/* <div className="join mb-8 ml-auto">
        <div className="badge badge-primary join-item">
          {article.categoryName}
        </div>
        <div className="badge badge-primary badge-outline join-item">
          {article.views} visualizações
        </div>
      </div> */}
      <h1 className="font-black">{article.title}</h1>
      <div className="divider"></div>
      <MDXRemote source={article.content} />
    </article>
  );
}
