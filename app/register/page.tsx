"use client"
import { registerUser } from "@/actions/users"
import { useActionState } from "react";

const initialState = {
  errors: {},
  values: { username: "", name: "", password: "", confirmPassword: "" }
}
export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label className="flex flex-col gap-1">
            Username (must be unique)
            <input
              className="border border-gray-400 p-2 rounded-md"
              type="text" name="username" required
              defaultValue={state.values?.username}
            />
          </label>
          {state.errors?.username && <p className="text-red-500">{state.errors?.username}</p>}
        </div>
        <div>
          <label className="flex flex-col gap-1">
            Name
            <input
              className="border border-gray-400 p-2 rounded-md"
              type="text" name="name" required
              defaultValue={state.values?.name}
            />
          </label>
          {state.errors?.name && <p className="text-red-500">{state.errors?.name}</p>}
        </div>
        <div>
          <label className="flex flex-col gap-1">
            Password
            <input
              className="border border-gray-400 p-2 rounded-md"
              type="password" name="password" required
            />
          </label>
          {state.errors?.password && <p className="text-red-500">{state.errors?.password}</p>}
        </div>
        <div>
          <label className="flex flex-col gap-1">
            Confirm Password
            <input
              className="border border-gray-400 p-2 rounded-md"
              type="password" name="confirmPassword" required
            />
          </label>
          {state.errors?.confirmPassword && <p className="text-red-500">{state.errors?.confirmPassword}</p>}
        </div>
        <button className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600" type="submit">Register</button>
      </form>
    </div>
  )
}