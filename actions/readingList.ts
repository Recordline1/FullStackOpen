"use server"
import { addToReadingList, isInReadingList } from "@/services/users";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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
