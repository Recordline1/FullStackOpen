"use client"
import { createNote } from "@/actions/notes";
import {useRouter} from "next/navigation";
import { useActionState, useEffect } from "react";
import { useNotification } from "@/components/NotificationContext";

const NewNote = () => {
    const [state, formAction] = useActionState(createNote, { error: "", success: false });
    const { showNotification } = useNotification();
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            showNotification("Note created successfully!");
            router.push("/notes");
        }
    }, [state.success, showNotification, router]);

    return (
        <div className="flex flex-col gap-4 container mx-auto p-4">
            <h2 className="text-3xl">Create a new note</h2>
            <form
                action={formAction}
                className="max-w-sm flex flex-col gap-4 mt-4 border border-mauve-200 p-4 rounded-md shadow-md"
            >
                <div>
                    <label className="flex flex-col gap-2 ">
                        <span className="font-bold">Content</span>
                        <input
                            className="border-b border-b-mauve-200 p-2 "
                            placeholder="content..."
                            autoFocus
                            type="text" name="content" required />
                    </label>
                </div>
                <div>
                    <label className="flex items-center gap-2" >
                        <input
                            className="border border-grey-500 p-2 rounded-md"
                            type="checkbox" name="important" />
                        Important
                    </label>
                </div>
                <button type="submit" className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600">
                    Create
                </button>
                {state.error && <p style={{ color: "red" }}>{state.error}</p>}
            </form>
        </div>
    )
}

export default NewNote