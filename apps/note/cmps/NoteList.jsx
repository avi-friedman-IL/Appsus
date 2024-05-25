import { NotePreview } from "../../../apps/note/cmps/NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NotePreview note={note} onRemoveNote={onRemoveNote} key={note.id} />
      ))}
    </ul>
  );
}
