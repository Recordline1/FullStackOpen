'use server'

import { redirect } from "next/navigation";
import { addNote} from "../services/notes";
import { revalidatePath } from "next/cache";
import { addBlog } from "../blogs/blogs";
import { toggleNoteImportance } from "../services/notes";



export async function createNote(formData: FormData) {
    const content = formData.get("content") as string
    const important = formData.get("important") === "on"

    addNote(content, important)
    revalidatePath("/notes")
    redirect("/notes")
}

export async function createBlog(formData: FormData) {
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const url = formData.get("url") as string;

    addBlog(title, author, url);
    revalidatePath("/blogs")
    redirect("/blogs")
}

export async function toggleImportance(formData: FormData) {
    const id = Number(formData.get("id"))
    toggleNoteImportance(id)
    revalidatePath(`/notes/${id}`)
    revalidatePath("/notes")
    redirect("/notes")
}
