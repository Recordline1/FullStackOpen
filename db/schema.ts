import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const notes = pgTable("notes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  content: text("content").notNull(),
  important: boolean("important").notNull().default(false),
  userId: integer("user_id").notNull().references(() => users.id),
})

export const blogs = pgTable("blogs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id").notNull().references(() => users.id),
})

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  apiToken: text("api_token")
})


export const readingList = pgTable("reading_list", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  blogId: integer("blog_id").notNull().references(() => blogs.id),
  read: boolean("read").notNull().default(false),
})

export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
  blogs: many(blogs),
  readingList: many(readingList),
}))

export const readingListRelations = relations(readingList, ({ one }) => ({
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
}))

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}))

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  readingList: many(readingList)
}))

