"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"

type RegisterFormState = {
  errors: { username?: string; name?: string; password?: string; confirmPassword?: string }
  values?: { username: string; name: string; }
}

export const registerUser = async (prevState: RegisterFormState, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  const errors: RegisterFormState["errors"] = {}  

  if (!username || username.length < 4) {
    errors.username = "Username is required and must be at least 4 characters long"
  }

  if (!name || name.length < 4) {
    errors.name = "Name is required and must be at least 4 characters long"
  }

  if (!password || password.length < 4) {
    errors.password = "Password is required and must be at least 4 characters long"
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }

  if (!errors.username) {
    const existingUser = await db.select().from(users).where(eq(users.username, username)).execute()
    if (existingUser.length > 0) {
      errors.username = "Username already exists"
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}