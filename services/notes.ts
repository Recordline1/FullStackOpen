import { eq, sql } from "drizzle-orm"
import { db } from "@/db"
import { notes } from "@/db/schema"
import { getCurrentUser } from "./session"



export const getNotes = async ( important?:boolean) => {
    if(important){
        return db.query.notes.findMany({
            where: eq(notes.important, true),
        })
    }
    return db.query.notes.findMany()
}

export const getNoteById = async (id: number) => {
    return db.query.notes.findFirst({
        where: eq(notes.id, id),
    })
}

export const addNote = async (content: string, important: boolean) => {
   
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Cannot add a note without a logged-in user")
  }
  

  await db.insert(notes).values({ content, important, userId: user.id })
}
export const toggleNoteImportance = async (id: number) => {
    const note = await getNoteById(id)
    if (note) {
        await db
            .update(notes)
            .set({ important: !note.important })
            .where(eq(notes.id, id))
    }
}



// export const notes: Note[] = [
//     {
//         id: 1,
//         content: "HTML is easy",
//         date: "2019-05-30T17:30:31.098Z",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only JavaScript",
//         date: "2019-05-30T18:39:34.091Z",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         date: "2019-05-30T19:20:14.298Z",
//         important: true
//     }
// ]

// let nextId = 4



// export const addNote = (content: string, important: boolean) => {
//     notes.push({
//         id: nextId++,
//         content,
//         date: new Date().toISOString(),
//         important
//     })
// }

// export const getNoteById = (id: number) => {
//     return notes.find(note => note.id === id)
// }

// export const toggleNoteImportance = (id: number) => {
//     const note = notes.find(note => note.id === id);
//     if (note) {
//         note.important = !note.important
//     }
// }


