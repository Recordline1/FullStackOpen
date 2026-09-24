"use server"
import { addToReadingList, isInReadingList } from "@/services/users";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { markReadingListEntryAsRead } from "@/services/readingList";

export const addBlogToReadingListAction = async (formData: FormData) => {
  const session = await auth()
  const userId = Number(session?.user?.id)

  if (!Number.isFinite(userId)) {
    throw new Error("Not authenticated")
  }

  const blogId = Number(formData.get("blogId"))
  if (!Number.isFinite(blogId)) {
    throw new Error("Invalid blog id")
  }

  const alreadyAdded = await isInReadingList(userId, blogId)

  if (!alreadyAdded) {
    await addToReadingList(userId, blogId)
  }

  revalidatePath("/me")
  revalidatePath(`/blogs/${blogId}`)
}


export const markAsReadAction = async (formData: FormData) => {
  const session = await auth()
  const userId = Number(session?.user?.id)

  if (!Number.isFinite(userId)) {
    throw new Error("Not authenticated")
  }

  const entryId = Number(formData.get("entryId"))
  if (!Number.isFinite(entryId)) {
    throw new Error("Invalid entry id")
  }

  await markReadingListEntryAsRead(entryId, userId)
  revalidatePath("/me")
}