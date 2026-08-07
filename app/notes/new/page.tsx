import { createNote } from "../../actions/notes";


const NewNote = () => {
    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h2 className="text-2xl">Create a new note</h2>
            <form
                action={createNote}
                className="max-w-sm flex flex-col gap-4 mt-4 border border-grey-100 p-4 rounded-md shadow-md"
            >
                <div>
                    <label className="flex flex-col gap-2">
                        Content
                        <input
                            className="border-b border-b-gray-400 p-2 "
                            placeholder="content..."
                             autoFocus
                            type="text" name="content" required />
                    </label>
                </div>
                <div>
                    <label className="flex items-center gap-2" >
                        <input
                            className="border border-grey-500 p-2 rounded-md"
                            type="checkbox" name="important" />
                        Important
                    </label>
                </div>
                <button type="submit" className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600">
                    Create
                </button>
            </form>
        </div>
    )
}

export default NewNote