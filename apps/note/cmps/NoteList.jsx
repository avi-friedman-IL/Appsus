import { NotePreview } from "../../../apps/note/cmps/NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id} className="note-card" style={note.style}>
          <NotePreview note={note} onRemoveNote={onRemoveNote} />
        </li>
      ))}
    </ul>
  );
}
