const blogs = [{
    id: 1,
    title: "first blog",
    author: "John Doe",
    url: "https://example.com/first-blog",
    likes: 10,
},
{
    id: 2,
    title: "second blog",
    author: "Jane Doe",
    url: "https://example.com/second-blog",
    likes: 5,
},
{
    id: 3,
    title: "third blog",
    author: "John Doe",
    url: "https://example.com/third-blog",
    likes: 15,
},
]

let nextId = 4

export const getBlogs = () => {
    return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
    blogs.push({ 
        id: nextId++,
        title,
        author,
        url,
        likes: 0
    })
}

export const getBlogById = (id: number) => {
    return blogs.find(blog => blog.id === id)
}

export const likeBlog = (id: number) => {
    const blog = blogs.find(blog => blog.id === id)
    if (blog) {
        blog.likes++
    }
}

