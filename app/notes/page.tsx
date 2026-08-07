import { getNotes } from "../services/notes";
const Notes = () => {
    const notes = getNotes();

    return (
        <ul className=" flex flex-col gap-4 container mx-auto p-4">
            {notes.map((note, index) => <li key={note.id}>
                <span className="mr-2 font-bold text-amber-500">
                    {index + 1}
                    </span>
                {note.content} {note.important && <strong>important</strong>}
            </li>)}
        </ul>
    )
}

export default Notes