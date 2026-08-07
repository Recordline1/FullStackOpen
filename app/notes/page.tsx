import { getNotes } from "../services/notes";
import { NoteList } from "./NoteList";
const Notes = () => {
    const notes = getNotes();

    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h2 className="text-2xl">Notes</h2>
            <NoteList notes={notes} />
        </div>
    )
}

export default Notes