import { eq, and } from "drizzle-orm"
import { db } from "@/db"
import { readingList, users } from "@/db/schema"

export const getUserWithNotes = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { notes: true, blogs: true },
  })
}

export const getUserbyUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  })
}

export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blog: true },
  })
}

export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({ userId, blogId })
}

export const isInReadingList = async (userId: number, blogId: number) => {
  const entry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  })
  return Boolean(entry)
}


export const getUserByApiToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.apiToken, token),
    with: { notes: true, blogs: true }
  })
}