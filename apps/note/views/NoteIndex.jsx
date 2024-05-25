const { useState, useEffect } = React;
import { notesService } from "../services/note.service.js";
import { KeepSidebar } from "../cmps/KeepSidebar.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { AddForm } from "../cmps/AddForm.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);
  const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter());

  useEffect(() => {
    notesService.query(filterBy).then((notes) => setNotes(notes));
  }, [filterBy]);

  function onSetFilterBy(newFilter) {
    setFilterBy(newFilter);
  }

  useEffect(() => {
    notesService.getNotes().then((notes) => {
      setNotes(notes);
    });
  }, []);

  function handleRemoveNote(noteId) {
    notesService.removeNote(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    });
  }

  function handleAddNote(note) {
    notesService.saveNote(note).then(() => {
      setNotes((prevNotes) => [...prevNotes, note]);
    });
  }

  return (
    <section className="keep-index">
      <KeepSidebar />
      <AddForm
        onAddNote={handleAddNote}
        filterBy={filterBy}
        onFilterBy={onSetFilterBy}
      />
      <NoteList notes={notes} onRemoveNote={handleRemoveNote} />
    </section>
  );
}
