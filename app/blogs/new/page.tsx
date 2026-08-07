import { createBlog } from "../../actions/notes";
const NewBlog = () => {
    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h2 className="text-2xl">Create a new blog</h2>
            <form
                action={createBlog}
                className="max-w-sm flex flex-col gap-4 mt-4 border border-grey-100 p-4 rounded-md shadow-md"
            >
                <div>
                    <label className="flex flex-col gap-2">
                        Title
                        <input
                            className="border-b border-b-gray-400 p-2 "
                            placeholder="title..."
                             autoFocus
                            type="text" name="title" required />
                    </label>
                </div>
                <div>
                    <label className="flex flex-col gap-2">
                        Author
                        <input
                            className="border-b border-b-gray-400 p-2 "
                            placeholder="author..."
                             autoFocus
                            type="text" name="author" required />
                    </label>
                </div>
                <div>
                    <label className="flex flex-col gap-2">
                        Url
                        <input
                            className="border-b border-b-gray-400 p-2 "
                            placeholder="url..."
                             autoFocus
                            type="text" name="url" required />
                    </label>
                </div>                
                <button type="submit" className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600">
                    Create
                </button>
            </form>
        </div>
    )
}

export default NewBlog