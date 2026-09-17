// app/me/page.tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getUserbyUsername } from "@/services/users"
import { generateApiToken } from "@/actions/user"

const Me = async () => {
    const session = await auth()
    if (!session?.user?.email) {
        redirect("/login")
    }

    const user = await getUserbyUsername(session.user.email as string)
    if (!user) {
        redirect("/login")
    }

    return (
        <div className="flex flex-col gap-6 container mx-auto p-4">
            <div className="border border-gray-300 rounded-md bg-white/90 p-6 shadow-sm">
                <h2 className="text-3xl font-semibold mb-2">My profile</h2>
                <p className="text-gray-600">Name: {user.name}</p>
                <p className="text-gray-600">Username: {user.username}</p>
            </div>

            <div className="border border-gray-300 rounded-md bg-white/90 p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">API token</h2>
                {user.apiToken ? (
                    <p className="text-gray-600 font-medium break-all">Current token:<span className="font-mono"> {user.apiToken}</span></p>
                ) : (
                    <p className="text-gray-600">Token has not been generated yet.</p>
                )}
                <form action={generateApiToken} className="mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
                    >
                        {user.apiToken ? "Regenerate token" : "Generate token"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Me