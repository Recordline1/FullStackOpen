import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getUserbyUsername } from "@/services/users"
import { generateApiToken } from "@/actions/user"
import { getReadingList } from "@/services/users"

const Me = async () => {
    const session = await auth()
    if (!session?.user?.email) {
        redirect("/login")
    }

    const user = await getUserbyUsername(session.user.email as string)
    const readingList = await getReadingList(user?.id as number)
    if (!user) {
        redirect("/login")
    }

    return (
        <div className="flex flex-col gap-6 container mx-auto p-4">
            <div>
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
            <div className="border border-gray-300 rounded-md bg-white/90 p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">Reading list</h2>
                {readingList.length === 0 ? (
                    <p className="text-gray-600">No blogs in your reading list yet.</p>
                ) : (
                    <ul className="flex flex-col gap-2">
                        {readingList.map((entry) => (
                            <li key={entry.id} className="text-gray-600">
                                {entry.blog.title} — <span className="italic">{entry.blog.author}</span>
                                {entry.read && <span className="text-green-600 ml-2">(read)</span>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Me