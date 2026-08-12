dotenv.config({ path: ".env.local" });
import * as dotenv from "dotenv";



// const seeds = [
//     {
//         title: "React Server Components Explained",
//         author: "Dan Abramov",
//         url: "https://example.com/react-server-components",
//         likes: 42,
//     },
//     {
//         title: "Getting Started with Next.js App Router",
//         author: "Lee Robinson",
//         url: "https://example.com/nextjs-app-router",
//         likes: 28,
//     },
//     {
//         title: "Type-Safe Databases with Drizzle ORM",
//         author: "Alexey Goloborodko",
//         url: "https://example.com/drizzle-orm-guide",
//         likes: 19,
//     },
//     {
//         title: "Tailwind CSS Best Practices in 2026",
//         author: "Sarah Drasner",
//         url: "https://example.com/tailwind-best-practices",
//         likes: 31,
//     },
//     {
//         title: "Why TypeScript Makes Frontend Dev Joyful",
//         author: "Kent C. Dodds",
//         url: "https://example.com/typescript-joy",
//         likes: 55,
//     },
// ];

// export const seedBlogs = async () => {
// const {db} = await import( "@/db/index");  
// const {blogs} = await import( "@/db/schema");

//     await db.insert(blogs).values(seeds);
// }

// seedBlogs().catch((err) => {
//   console.error("Ошибка при сидировании:", err);
//   process.exit(1);
// });
