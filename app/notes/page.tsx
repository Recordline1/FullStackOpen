import { getNotes } from "@/services/notes";
import Link from "next/link";
const Notes = async ({ searchParams }: { searchParams: Promise<{ important?: string }> }) => {
    const { important } = await searchParams;
    const showeImportant = important === "true";
    const allNotes = await getNotes(showeImportant);

    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h2 className="text-2xl font-semibold">Notes</h2>
            <Link
                className="text-white bg-amber-500 rounded-md p-2 hover:bg-amber-600 self-end border border-sky-300"
                href={showeImportant ? "/notes" : "/notes?important=true"}>
                {showeImportant ? "Show all" : "Show only important"}
            </Link>

            <ul className="mt-4 flex flex-col gap-2">
                {allNotes.map(note => (
                    <li key={note.id} className="border border-gray-300 p-4 rounded-md shadow-md">
                        <Link
                        className=" hover:text-sky-500 duration-300 ease-in-out"
                         href={`/notes/${note.id}`}>{note.content}</Link>
                        <p className={`mt-2 ${note.important ? "text-amber-500" : "text-gray-500"}`}>{note.important ? "Important" : "Not important"}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Notes