"use client"
import { createBlog } from "@/actions/blogs";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogFormState } from "@/actions/blogs";
import { useNotification } from "@/components/NotificationContext";

const initialState: BlogFormState = {
    errors: {},
    values: { title: "", author: "", url: "", },
    success: false
}

const NewBlog = () => {
    const [state, formAction] = useActionState(createBlog, initialState);

    const { showNotification } = useNotification();
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            showNotification("Blog created successfully!");
            router.push("/blogs");
        }
    }, [state.success, showNotification, router]);

    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h2 className="text-2xl">Create a new blog</h2>
            <form
                action={formAction}
                className="max-w-sm flex flex-col gap-4 mt-4 border border-grey-100 p-4 rounded-md shadow-md"
            >
                <input type="hidden" name="userId" value="1" />
                <div>
                    <label className="flex flex-col gap-2">
                        Title
                        <input
                            className="border-b border-b-gray-400 p-2 "
                            placeholder="title..."
                            autoFocus
                            defaultValue={state.values?.title}
                            type="text" name="title" required />
                        {state.errors?.title && <p className="text-red-500">{state.errors?.title}</p>}
                    </label>
                </div>
                <div>
                    <label className="flex flex-col gap-2">
                        Author
                        <input
                            className="border-b border-b-gray-400 p-2 "
                            placeholder="author..."
                            defaultValue={state.values?.author}
                            type="text" name="author" required />
                        {state.errors?.author && <p className="text-red-500">{state.errors?.author}</p>}
                    </label>
                </div>
                <div>
                    <label className="flex flex-col gap-2">
                        Url
                        <input
                            className="border-b border-b-gray-400 p-2 "
                            placeholder="url..."
                            defaultValue={state.values?.url}
                            type="text" name="url" required />
                        {state.errors?.url && <p className="text-red-500">{state.errors?.url}</p>}
                    </label>
                </div>
                <button type="submit" className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600">
                    Create
                </button>
            </form>
        </div>
    )
}

export default NewBlog