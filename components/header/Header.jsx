"use client";

import Link from "next/link";
import { HeaderTimer } from "./HeaderTimer";
import { useSession, signOut } from "next-auth/react"
import { NavList } from "./NavList";

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex flex-col gap-4 p-4 border-b border-gray-300">

            <div className="flex  justify-between gap-4 items-center">
                <HeaderTimer />

                {session ? (
                    <div className="flex gap-4 items-center">
                        <Link className="text-amber-500 hover:text-amber-600" href="/notes/new">create new</Link>                        
                        <em>{session.user?.name}</em>
                        <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onClick={() => signOut()}>logout</button>
                    </div>
                ) : (
                    <Link href="/login">login</Link>
                )}
            </div>
            <NavList />
        </header>
    )
}