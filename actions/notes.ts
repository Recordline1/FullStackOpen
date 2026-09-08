'use server'

import { addNote} from "../services/notes";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { toggleNoteImportance } from "../services/notes";
import { auth } from "@/auth";



export async function createNote(formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) {
        redirect("/login")
    }
    const content = formData.get("content") as string
    const important = formData.get("important") === "on"

   await addNote(content, important)
    revalidatePath("/notes")
    redirect("/notes")
}

export async function toggleImportance(formData: FormData) {
    const id = Number(formData.get("id"))
    await toggleNoteImportance(id)
    revalidatePath(`/notes/${id}`)
    revalidatePath("/notes")
    redirect("/notes")
}
