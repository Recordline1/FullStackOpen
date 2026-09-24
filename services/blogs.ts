import { db } from "@/db"
import { blogs } from "@/db/schema"
import { readingList } from "@/db/schema"
import { ilike, desc, eq, sql } from "drizzle-orm";
import { getCurrentUser } from "./session";



export const getBlogs = async (searchQuery?: string) => {
    return db.query.blogs.findMany({
        where: searchQuery ? ilike(blogs.title, `%${searchQuery}%`) : undefined,
        orderBy: desc(blogs.likes),
    })
}

export const getUsers = async () => {
    return db.query.users.findMany()
}

export const addBlog = async (title: string, author: string, url: string) => {

    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Cannot add a blog without a logged-in user")
    }
    await db.insert(blogs).values({ title, author, url, userId: user.id })
}


export const getBlogById = async (id: number) => {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id)
    })
}


export const likeBlog = async (id: number) => {
    const blog = await getBlogById(id)
    if (!blog) {
        throw new Error(`Blog with id ${id} not found`)
    }
    await db.update(blogs).set({ likes: blog.likes + 1 }).where(eq(blogs.id, id))
}