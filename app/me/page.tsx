import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getUserWithNotes } from "@/services/users"
import { getReadingList } from "@/services/readingList"
import { generateApiToken } from "@/actions/user"
import { markAsReadAction } from "@/actions/readingList"

const Me = async () => {
    const session = await auth()
    if (!session?.user?.email) {
        redirect("/login")
    }

    const userId = Number(session.user!.id)
    if (!Number.isFinite(userId)) {
        redirect("/login")
    }

    const user = await getUserWithNotes(userId)
    if (!user) {
        redirect("/login")
    }

    const readingList = await getReadingList(userId)
    const unread = readingList.filter((entry) => !entry.read)
    const read = readingList.filter((entry) => entry.read)

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
                    <p className="text-gray-600 break-all">Current token: {user.apiToken}</p>
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

            <div className="border border-gray-300 rounded-md bg-white/90 p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">Reading list</h2>

                <h3 className="text-lg font-semibold mt-4 mb-2">Unread</h3>
                {unread.length === 0 ? (
                    <p className="text-gray-600">Nothing unread — nice work.</p>
                ) : (
                    <ul className="flex flex-col gap-2">
                        {unread.map((entry) => (
                            <li key={entry.id} className="flex items-center justify-between gap-4">
                                <span className="text-gray-600">
                                    {entry.blog.title} — <span className="italic">{entry.blog.author}</span>
                                </span>
                                <form action={markAsReadAction}>
                                    <input type="hidden" name="entryId" value={entry.id} />
                                    <button
                                        type="submit"
                                        className="text-sm text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-700 cursor-pointer whitespace-nowrap"
                                    >
                                        Mark as read
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                )}

                <h3 className="text-lg font-semibold mt-6 mb-2">Read</h3>
                {read.length === 0 ? (
                    <p className="text-gray-600">No blogs marked as read yet.</p>
                ) : (
                    <ul className="flex flex-col gap-2">
                        {read.map((entry) => (
                            <li key={entry.id} className="text-gray-600">
                                {entry.blog.title} — <span className="italic">{entry.blog.author}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Me