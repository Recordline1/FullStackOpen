import { getBlogs } from "../services/blogs"
import Link from "next/link";
import { BlogFilter } from "./BlogFilter";

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter?: string }> }) => {
    const { filter } = await searchParams;
    const searchQuery = filter?.toLowerCase() || "";
    const blogs = await getBlogs(searchQuery)



    if(!blogs || blogs.length === 0) {
        return (
            <div className="flex flex-col gap-4 container mx-auto p-4">
                <h1 className="text-2xl font-semibold">Blogs</h1>
                <BlogFilter />
                <p className="mt-4">No blogs found</p>
                <   Link href="/blogs" className="text-white bg-amber-500 p-2 rounded-md hover:bg-amber-600 flex justify-center w-fit">🔙  to blogs</Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h1 className="text-2xl font-semibold">Blogs</h1>
            <BlogFilter />
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {blogs.map((blog) =>
                    <li
                        className="border border-gray-300 p-4 rounded-md shadow-md flex flex-col gap-2"
                        key={blog.id}>
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                        <p className="text-gray-600">{blog.author}</p>
                        <p className="text-blue-500 underline"><a href={blog.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
                        <p className="text-sm text-gray-500">{blog.likes} 💕 likes</p>
                        <Link href={`/blogs/${blog.id}`} className="text-white bg-amber-500 p-2 rounded-md hover:bg-amber-600 flex justify-center">View Blog</Link>
                    </li>)}
            </ul>
        </div>
    )
}

export default Blogs