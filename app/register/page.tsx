import { registerUser } from "@/actions/users"

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form action={registerUser} className="flex flex-col gap-4">
        <div>
          <label className="flex flex-col gap-1">
            Username
            <input className="border border-gray-400 p-2 rounded-md" type="text" name="username" required />
          </label>
        </div>
        <div>
          <label className="flex flex-col gap-1">
            Name
            <input className="border border-gray-400 p-2 rounded-md" type="text" name="name" required />
          </label>
        </div>
        <div>
          <label className="flex flex-col gap-1">
            Password
            <input className="border border-gray-400 p-2 rounded-md" type="password" name="password" required />
          </label>
        </div>
        <button className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600" type="submit">Register</button>
      </form>
    </div>
  )
}