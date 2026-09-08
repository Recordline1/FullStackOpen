"use client";

import Link from "next/link";
import { HeaderTimer } from "./HeaderTimer";
import { useSession, signOut } from "next-auth/react"

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex justify-between gap-4 p-4 bg-gray-100 border-b border-gray-300 shadow-sm sticky top-0 z-10 backdrop-blur-md bg-opacity-80 text-lg">
            <HeaderTimer />
            <nav >
                <Link href="/">home</Link>
                {" | "}
                <Link href="/notes">notes</Link>
                {" | "}
                <Link href="/notes/new">create new</Link>
                {" | "}
                <Link href="/blogs">blogs</Link>
                {" | "}
                <Link href="/blogs/new">new blog</Link>
                {" | "}
                <Link href="/users">users</Link>
            </nav>
            {session ? (
                <>
                    <Link href="/notes/new">create new</Link>
                    {" | "}
                    <em>{session.user?.name} logged in</em>{" "}
                    <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onClick={() => signOut()}>logout</button>
                </>
            ) : (
                <Link href="/login">login</Link>
            )}
        </header>
    )
}