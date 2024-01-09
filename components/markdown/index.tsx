import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'

export default function Home() {
  return (
    // Ideally this loading spinner would ensure there is no layout shift,
    // this is an example for how to provide such a loading spinner.
    // In Next.js you can also use `loading.js` for this.
    <Suspense fallback={<>Loading...</>}>
      <MDXRemote
        source={`# Hello World

        This is from Server Components!
        `}
      />
    </Suspense>
  )
}