import { getNotes } from "../services/notes";

export default function ServicesPage() {
  const notes = getNotes();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-semibold">Services</h1>
      <p className="mt-2">{notes.length} notes available</p>
    </main>
  );
}
