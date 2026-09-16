import Link from "next/link";

const navlist = [
    { name: "home", href: "/" },
    { name: "notes", href: "/notes" },
    { name: "newNote", href: "/notes/new" },
    { name: "blogs", href: "/blogs" },
    { name: "newBlog", href: "/blogs/new" },
    { name: "users", href: "/users" },
]


export const NavList = () => {
    return (
        <ul className="flex gap-4">
            <nav className="flex gap-4 text-cyan-500 capitalize">
                {navlist.map((item) => (
                    <Link
                     className="hover:text-cyan-600"    
                     key={item.href} href={item.href}>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </ul>
    )
}