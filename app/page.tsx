const Home = () => {
  console.log("Home page rendered")
  return (
    <div className="flex flex-col gap-4 container mx-auto p-4">
      <div>
        <h2 className="text-2xl">notes app</h2>
        An example app for{" "}
        <a href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs">
          Full Stack Open Next.js
        </a>
      </div>
      <div>
        See{" "}
        <a href="https://github.com/fullstack-hy2020/nextjs-notes">
          https://github.com/fullstack-hy2020/nextjs-notes
        </a>{" "}
        for the source code
      </div>
    </div>
  )
}
export default Home