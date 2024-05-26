const { useState, useEffect } = React;
import { notesService } from "../services/note.service.js";
import { KeepSidebar } from "../cmps/KeepSidebar.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { AddForm } from "../cmps/AddForm.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);

  const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter());
  const [isOnFilter, setIsOnFilter] = useState(false);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [infoTxt, setInfoTxt] = useState("");

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

  function handleToggle(ev) {
    ev.preventDefault();
    setIsAddFormOpen((isAddFormOpen) => !isAddFormOpen);
  }

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

  function handleSubmit(ev) {
    ev.preventDefault();

    if (!infoTxt || isOnFilter) return;

    const newNote = {
      createdAt: Date.now(),
      type: "NoteTxt",
      isPinned: false,
      style: {
        backgroundColor: "var(--keep-bgc-1)",
      },
      info: {
        title: infoTxt,
        txt: "",
        todos: [],
        url: "",
      },
    };
    handleAddNote(newNote);
    setInfoTxt("");
    setIsOpen(false);
  }

  function reset() {
    setInfoTxt("");
    setFilterBy("");
  }

  return (
    <section className="keep-index" onClick={handleSubmit}>
      <KeepSidebar />
      <AddForm
        isAddFormOpen={isAddFormOpen}
        infoTxt={infoTxt}
        isOnFilter={isOnFilter}
        filterBy={filterBy}
        onSetIsOnFilter={setIsOnFilter}
        onFilterBy={onSetFilterBy}
        onToggle={handleToggle}
        onSetInfoTxt={setInfoTxt}
        onReset={reset}
        onSubmit={handleSubmit}
      />
      {!notes ? (
        <h1>loading...</h1>
      ) : (
        <NoteList notes={notes} onRemoveNote={handleRemoveNote} />
      )}
    </section>
  );
}
