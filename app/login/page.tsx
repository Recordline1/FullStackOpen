"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="flex flex-col gap-1">
            Username
            <input className="border border-gray-400 p-2 rounded-md" placeholder="username..." type="text" name="username" required />
          </label>
        </div>
        <div>
          <label className="flex flex-col gap-1">
            Password
            <input className="border border-gray-400 p-2 rounded-md" placeholder="password..." type="password" name="password" required />
          </label>
        </div>
        <button className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600" type="submit">Login</button>
      </form>
      <Link className="mt-4" href="/register">
        Don't have an account? <span className="text-blue-500 hover:underline">Register</span>
      </Link>
    </div>
  )
}