const Home = () => {
  return (
    <div className="flex flex-col gap-4 container mx-auto p-4">
      <div className="flex flex-col gap-4 container mx-auto p-4">
        <h2 className="text-2xl">Notes app</h2>
        An example app for ➡️{""}
        <a className="text-amber-500 text-md" href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs">
          Full Stack Open Next.js
        </a>
      </div>
      <div className="">
        See{" "}
        <a className="text-amber-500 text-md" href="https://github.com/fullstack-hy2020/nextjs-notes">
          https://github.com/fullstack-hy2020/nextjs-notes
        </a>{" "}
        for the source code
      </div>
    </div>
  )
}
export default Home