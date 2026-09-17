"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const navlist = [
    { name: "home", href: "/" },
    {
        name: "notes", href: "/notes",
        children: [{ name: "newNote", href: "/notes/new" },
        ]
    },
    {
        name: "blogs", href: "/blogs",
        children: [{ name: "newBlog", href: "/blogs/new" },]
    },

    { name: "users", href: "/users" },
]


type NavItemType = {
    name: string
    href: string
    children?: { name: string; href: string }[]
}

const NavDropdown = ({ item }: { item: NavItemType }) => {
    return (
        <div className="relative group py-2">
            <Link
                href={item.href}
                className="hover:text-cyan-300 flex items-center gap-1 focus:outline-none"
            >
                {item.name}
                <span className="text-xs">▼</span>
            </Link>

            <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
                <div className="flex flex-col bg-white border border-gray-200 shadow-lg rounded-md py-2 min-w-[150px]">
                    {item.children!.map((subItem) => (
                        <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-cyan-600 transition-colors"
                        >
                            {subItem.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const NavList = () => {
    return (
        <nav className="flex items-center gap-6 text-cyan-500 capitalize">
            {navlist.map((item) =>
                item.children ? (
                    <NavDropdown key={item.name} item={item} />
                ) : (
                    <Link key={item.href} href={item.href} className="hover:text-cyan-300">
                        {item.name}
                    </Link>
                )
            )}
        </nav>
    )
}