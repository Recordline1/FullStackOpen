import {getBlogs } from "./blogs"

const Blogs = () => {
    const blogs = getBlogs()
    return (
        <div>
            <h1>Blogs</h1>
            <ul>
                {blogs.map((blog) => <li key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.author}</p>
                    <p>{blog.url}</p>
                    <p>{blog.likes}</p>
                </li>)}
            </ul>
        </div>
    )
}

export default Blogs