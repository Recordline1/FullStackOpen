import { getNotes } from "@/app/services/notes";
import Link from "next/link";
const Notes = async ({ searchParams }: { searchParams: Promise<{ important?: string }> }) => {
    const { important } = await searchParams;
    const showeImportant = important === "true";
    const allNotes = getNotes();
    const notesToShow = showeImportant ? allNotes.filter(note => note.important) : allNotes;

    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h2 className="text-2xl font-semibold">Notes</h2>
            <div className="border border-amber-500 p-4 rounded-md shadow-md self-start">
                <Link
                    className="text-white bg-amber-500 p-2 rounded-md hover:bg-amber-600"
                    href={showeImportant ? "/notes" : "/notes?important=true"}>
                    {showeImportant ? "Show all" : "Show only important"}
                </Link>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
                {notesToShow.map(note => (
                    <li key={note.id} className="border border-gray-300 p-4 rounded-md shadow-md">
                        <Link href={`/notes/${note.id}`}>{note.content}</Link>
                        <p className={`mt-2 ${note.important ? "text-amber-500" : "text-gray-500"}`}>{note.important ? "Important" : "Not important"}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Notes