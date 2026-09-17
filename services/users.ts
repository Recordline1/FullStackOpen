import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

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