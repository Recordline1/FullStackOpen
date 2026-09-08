"use client";

import Link from "next/link";
import { HeaderTimer } from "./HeaderTimer";
import { useSession, signOut } from "next-auth/react"

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex flex-col gap-4 p-4 border-b border-gray-300">

            <div className="flex  justify-between gap-4 items-center">
                <HeaderTimer />

                {session ? (
                    <>
                        <Link className="text-amber-500 hover:text-amber-600" href="/notes/new">create new</Link>
                        {" | "}
                        <em>{session.user?.name} logged in</em>{" "}
                        <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onClick={() => signOut()}>logout</button>
                    </>
                ) : (
                    <Link href="/login">login</Link>
                )}
            </div>
            <nav className="flex gap-4 text-blue-500">
                <Link href="/">home</Link>
                {" | "}
                <Link href="/notes">notes</Link>
                {" | "}
                <Link href="/notes/new">new notes</Link>
                {" | "}
                <Link href="/blogs">blogs</Link>
                {" | "}
                <Link href="/blogs/new">new blog</Link>
                {" | "}
                <Link href="/users">users</Link>
            </nav>
        </header>
    )
}