'use server'

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog } from "../services/blogs";
import { likeBlog } from "../services/blogs";
import { auth } from "@/auth";

export type BlogFormState = {
    errors: { title?: string; author?: string; url?: string}
    values?: { title: string; author: string; url: string }
    success?: boolean
}

export async function createBlog(prevState: BlogFormState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) {
        redirect("/login")
    }
    const errors: BlogFormState["errors"] = {};

    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;
    if (!title || title.length < 5) {
        errors.title = "Title must be at least 5 characters long";
    }
    const author = formData.get("author") as string;
    if (!author || author.length < 5) {
        errors.author = "Author name must be at least 5 characters long";
    }
    const url = formData.get("url") as string;
    if (!url || url.length < 5) {
        errors.url = "Blog URL must be at least 5 characters long";
    }
    if (Object.keys(errors).length > 0) {
        return { errors, values: { title, author, url }, success: false };
    }
    await addBlog(title, author, url);
    revalidatePath("/blogs")
    return { errors:{}, values: { title, author, url }, success: true }
}


export async function likeBlogAction(formData: FormData) {
    const id = Number(formData.get("id"));
    await likeBlog(id)
    revalidatePath(`/blogs/${id}`)
    // revalidatePath("/blogs")
}


export async function searchBlog(formData: FormData) {
    const filter = formData.get("filter") as string;
    const params = new URLSearchParams();

    if (filter && filter.trim() !== "") {
        params.set("filter", filter);
    }

    redirect(`/blogs?${params.toString()}` ? `/blogs?${params.toString()}` : "/blogs");
}

