
import { NextRequest, NextResponse } from "next/server"
import { getUserByApiToken } from "@/services/users"

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization")

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.slice("Bearer ".length).trim()
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await getUserByApiToken(token)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
  })
}