'use client';

import { useState } from "react";
import Link from "next/link";


export const NoteList = ({ notes }: { notes: { id: number; content: string; important: boolean }[] }) => {
  const [showAll, setShowAll] = useState(false);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <button
       className="bg-amber-500 text-white rounded-md hover:bg-amber-600 mb-4"
       onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show only important" : "Show all"}
      </button>
      {notesToShow.map(note => (
        <div key={note.id} className="border border-mauve-200 p-4 rounded-md shadow-md">
          <Link className="  text-amber-500 hover:text-amber-600" href={`/notes/${note.id}`}>{note.content}</Link>
          <p
            className={`${
              note.important ? "text-amber-500" : "text-gray-500"
            } mt-2`}
          >{note.important ? "Important" : "Not important"}</p>
        </div>
      ))}
    </div>
  );
}