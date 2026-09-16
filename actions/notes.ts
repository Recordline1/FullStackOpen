'use server'

import { addNote } from "../services/notes";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { toggleNoteImportance } from "../services/notes";
import { auth } from "@/auth";



export async function createNote(prevState: { error?: string, success?: boolean }, formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) {
        redirect("/login")
    }
    const content = formData.get("content") as string
    if (!content || content.length < 10) {
        return {
            error: "Note content must be at least 10 characters long",
            success: false,
        }
    }
    const important = formData.get("important") === "on"

    await addNote(content, important)
    revalidatePath("/notes")
    return { error: "", success: true }
}

export async function toggleImportance(formData: FormData) {
    const id = Number(formData.get("id"))
    await toggleNoteImportance(id)
    revalidatePath(`/notes/${id}`)
    revalidatePath("/notes")
    redirect("/notes")
}
