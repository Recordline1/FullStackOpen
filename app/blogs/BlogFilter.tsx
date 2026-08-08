import {searchBlog} from "../actions/blogs";
import { Search } from "lucide-react";

export const BlogFilter = () => {
    
    return (
        <form action={searchBlog} className="flex items-center gap-2">
            <input
                type="text"
                name="filter"                
                placeholder="Filter by title..."
                className="border border-gray-300 p-2 rounded-md"
            />
            <button
                type="submit"                
                className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600"
            >
                <Search />
            </button>
        </form>
    )
}
