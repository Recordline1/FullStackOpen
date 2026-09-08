import Link from "next/link";
import {getUsers} from "../../services/blogs";

export default async function Users() {
    const users = await getUsers();
    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h1 className="text-2xl font-semibold">Users</h1>
            <ul className="mt-4 flex flex-col gap-2">
                {users.map(user => (
                    <li key={user.id} className="border border-gray-300 p-4 rounded-md shadow-md flex flex-col gap-2">
                        <Link href={`/users/${user.id}`}>{user.name}</Link> 
                    </li>
                ))}
            </ul>
        </div>
    )
}