'use server'

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog } from "../blogs/blogs";
import { likeBlog } from "../blogs/blogs";

export async function createBlog(formData: FormData) {
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const url = formData.get("url") as string;

    addBlog(title, author, url);
    revalidatePath("/blogs")
    redirect("/blogs")
}


export async function likeBlogAction(formData: FormData) {
    const id = Number(formData.get("id"));
    likeBlog(id)
    revalidatePath(`/blogs/${id}`)   
    // revalidatePath("/blogs")
}


export async function searchBlog(formData: FormData) {
    const filter = formData.get("filter") as string;
    const params = new URLSearchParams();

    if(filter && filter.trim() !== "") {
        params.set("filter", filter);
    }
   
    redirect(`/blogs?${params.toString()}` ? `/blogs?${params.toString()}` : "/blogs");
}

