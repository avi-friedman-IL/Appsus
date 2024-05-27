const { useState, useEffect } = React;

import { utilService } from "../../../services/util.service.js";
import { notesService } from "../services/note.service.js";
import { NotePreview } from "../../../apps/note/cmps/NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {
  const [updatedNotes, setUpdatedNotes] = useState(notes);

  useEffect(() => {
    setUpdatedNotes(notes);
  }, [notes]);

  function handleTogglePinnedNote(note) {
    const updatedNote = {
      ...note,
      isPinned: !note.isPinned,
    };
    saveNote(updatedNote);
    setUpdatedNotes((prevNotes) =>
      prevNotes.map((getNote) =>
        getNote.id === note.id ? updatedNote : getNote
      )
    );
  }

  function handleDuplicateNote(note) {
    const duplicatedNote = { ...note, id: "" };

    saveNote(duplicatedNote);
    setUpdatedNotes((prevNotes) => [...prevNotes, duplicatedNote]);
  }

  function saveNote(updatedNote) {
    notesService.saveNote(updatedNote);
  }

  const pinnedNotes = updatedNotes.filter((note) => note.isPinned);
  const unpinnedNotes = updatedNotes.filter((note) => !note.isPinned);

  return (
    <section className="all-lists">
      {pinnedNotes.length > 0 ? <h2>Pinned</h2> : ""}

      {pinnedNotes.length > 0 ? (
        <ul className="pinned-notes">
          {pinnedNotes.map((note) => (
            <NotePreview
              note={note}
              onRemoveNote={onRemoveNote}
              onTogglePinned={handleTogglePinnedNote}
              onSaveNote={saveNote}
              onDuplicateNote={handleDuplicateNote}
              key={note.id}
            />
          ))}
        </ul>
      ) : (
        ""
      )}

      {pinnedNotes.length > 0 ? <h2>Other</h2> : ""}

      <ul className="note-list">
        {unpinnedNotes.map((note) => (
          <NotePreview
            note={note}
            onRemoveNote={onRemoveNote}
            onTogglePinned={handleTogglePinnedNote}
            onSaveNote={saveNote}
            onDuplicateNote={handleDuplicateNote}
            key={note.id}
          />
        ))}
      </ul>
    </section>
  );
}
