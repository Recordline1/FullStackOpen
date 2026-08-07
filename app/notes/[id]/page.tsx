import { notFound } from "next/navigation"
import { getNoteById } from "../../services/notes"
import { toggleImportance } from "../../actions/notes"

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const note = getNoteById(Number(id))

  if (!note) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4 container mx-auto p-4">
      <h1 className="text-2xl">Note {note.id}</h1>
      <h2 className="text-xl font-semibold">{note.content}</h2>
      <p className={`mt-2 ${note.important ? "text-amber-500" : "text-gray-500"}`}>{note.important ? "Important" : "Not important"}</p>
      <form action={toggleImportance}>
        <input type="hidden" name="id" value={note.id} />
        <button type="submit" className="cursor-pointer bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600">
          {note.important ? "Mark as not important" : "Mark as important"}
        </button>
      </form>
    </div>
  )
}

export default NotePage