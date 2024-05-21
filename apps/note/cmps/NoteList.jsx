import { NotePreview } from "../../../apps/note/cmps/NotePreview.jsx";

export function NoteList({ notes }) {
  console.log(notes);
  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <NotePreview note={note} />
          </li>
        ))}
      </ul>
    </div>
  );
}
