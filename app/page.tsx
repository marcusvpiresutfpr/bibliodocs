import Remote from "@/components/mdx/remote";

const exapleSource = `
# Hello, world!

This is an example of a formula:

<Formula latex="\\frac{1}{2}" />
`;

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Remote source={exapleSource} />
    </div>
  );
}

export default Home;