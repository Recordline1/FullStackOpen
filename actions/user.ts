// actions/user.ts
"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function generateApiToken() {
    const session = await auth()
    if (!session?.user?.email) {
        throw new Error("Not authenticated")
    }

    const token = crypto.randomUUID()

    await db
        .update(users)
        .set({ apiToken: token })
        .where(eq(users.username, session.user.email))

    revalidatePath("/me")
}