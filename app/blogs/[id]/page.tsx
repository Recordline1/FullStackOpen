import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getBlogById } from "@/services/blogs";
import { likeBlogAction } from "@/actions/blogs";
import { addBlogToReadingListAction } from "@/actions/readingList";
import { isInReadingList } from "@/services/readingList";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const blog = await getBlogById(Number(id));

    if (!blog) {
        notFound();
    }

    const session = await auth();
    console.log("Session:", session);

    const userId = Number(session?.user?.id);
    console.log("User ID:", userId);

    const isOwnBlog = Number.isFinite(userId) && userId === blog.userId;

    const alreadyInReadingList =
        !isOwnBlog && Number.isFinite(userId)
            ? await isInReadingList(userId, blog.id)
            : false;

    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h1 className="text-2xl">Blog {blog.id}</h1>
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.author}</p>
            <p className="text-blue-500 underline"><a href={blog.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
            <div className="flex gap-2 items-center">
                <p className="text-sm font-bold text-gray-500">{blog.likes}  likes</p>
                <form action={likeBlogAction}>
                    <input type="hidden" name="id" value={blog.id} />
                    <button type="submit" className="text-white bg-amber-500 p-2 rounded-md hover:bg-amber-600 cursor-pointer ">
                       <span>💕</span> Like Blog
                    </button>
                </form>
            </div>

            {!isOwnBlog && Number.isFinite(userId) && (
                <div>
                    {alreadyInReadingList ? (
                        <p className="text-sm text-gray-500">Already in your reading list</p>
                    ) : (
                        <form action={addBlogToReadingListAction}>
                            <input type="hidden" name="blogId" value={blog.id} />
                            <button type="submit" className="text-white bg-cyan-600 p-2 rounded-md hover:bg-cyan-700 cursor-pointer">
                                Add to reading list
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    )
}

export default BlogPage