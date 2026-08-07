'use client';

import { Note } from "../services/notes";
import { useState } from "react";
import Link from "next/link";


export const NoteList = ({ notes }: { notes: Note[] }) => {
  const [showAll, setShowAll] = useState(false);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <button
       className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600 mb-4"
       onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show only important" : "Show all"}
      </button>
      {notesToShow.map(note => (
        <div key={note.id} className="border border-gray-300 p-4 rounded-md mb-4 shadow-md">
          <p> <Link href={`/notes/${note.id}`}>{note.content}</Link></p>
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