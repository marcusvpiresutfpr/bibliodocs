import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Formula from "./formula";

const components = { Formula };

type Props = MDXRemoteProps;

const Remote = (props: Props) => {
  return <MDXRemote {...props} components={{ ...components }} />;
};

export default Remote;
