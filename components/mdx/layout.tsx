import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

type Props = {
  source: string;
} & Partial<MDXRemoteProps>;

export default async function MDXLayout({ source, ...rest }: Props) {
  const mdxSource = await serialize(source);

  return (
    <article className="prose">
      <MDXRemote {...mdxSource} {...rest} />;
    </article>
  );
}
