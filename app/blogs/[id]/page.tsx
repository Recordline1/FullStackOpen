import {notFound} from "next/navigation";
import { getBlogById } from "@app/blogs/blogs";




const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const blog = getBlogById(Number(id));

    if (!blog) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h1 className="text-2xl">Blog {blog.id}</h1>
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.author}</p>
            <p className="text-blue-500 underline"><a href={blog.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
            <p className="text-sm text-gray-500">{blog.likes} 💕 likes</p>
        </div>
    )
}

export default BlogPage