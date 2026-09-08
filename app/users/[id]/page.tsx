import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithNotes } from "../../../services/users"

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserWithNotes(Number(id))

  if (!user) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 container mx-auto p-4">
      <div className="border border-gray-300 rounded-md bg-white/90 p-6 shadow-sm">
        <h2 className="text-3xl font-semibold mb-2">{user.name}</h2>
        <p className="text-gray-600">Username: {user.username}</p>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="border border-gray-300 rounded-md bg-white/90 p-6 shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Notes</h3>
          <ul className="space-y-3">
            {user.notes.map((note) => (
              <li key={note.id} className="rounded-md border border-gray-200 p-4 bg-gray-50">
                <Link href={`/notes/${note.id}`} className="text-lg font-medium text-sky-700 hover:underline">
                  {note.content}
                </Link>
                <p className="mt-2 text-sm text-gray-500">{note.important ? "Important" : "Normal"}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-gray-300 rounded-md bg-white/90 p-6 shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Blogs</h3>
          <ul className="space-y-3">
            {user.blogs.map((blog) => (
              <li key={blog.id} className="rounded-md border border-gray-200 p-4 bg-gray-50">
                <Link href={`/blogs/${blog.id}`} className="text-lg font-medium text-sky-700 hover:underline">
                  {blog.title}
                </Link>
                <p className="text-sm text-gray-600">Author: {blog.author}</p>
                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  Read more
                </a>
                <p className="mt-2 text-sm text-gray-500">Likes: {blog.likes}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default UserPage