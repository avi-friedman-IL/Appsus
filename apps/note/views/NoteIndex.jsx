const { useState, useEffect } = React;
import { notesService } from "../services/note.service.js";
import { showSuccessMsg } from "../../../services/event-bus.service.js";
import { KeepSidebar } from "../cmps/KeepSidebar.jsx";
import { NoteList } from "../cmps/NoteList.jsx";
import { AddForm } from "../cmps/AddForm.jsx";
import { UserMsg } from "../../../cmps/UserMsg.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);

  const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter());
  const [isOnFilter, setIsOnFilter] = useState(false);
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isOnImgMode, setIsOnImgMode] = useState(false);
  const [isOnTxtMode, setIsOnTxtMode] = useState(true);
  const [isOnVideoMode, setIsOnVideoMode] = useState(false);
  const [isOnTodosMode, setIsOnTodosMode] = useState(false);
  const [isOnAudioMode, setIsOnAudioMode] = useState(false);

  const [infoTxt, setInfoTxt] = useState("");
  const [infoTitle, setInfoTitle] = useState("");
  const [noteType, setNoteType] = useState("");

  const [activeItem, setActiveItem] = useState("Notes");

  useEffect(() => {
    notesService.query(filterBy).then((notes) => setNotes(notes));
  }, [filterBy]);

  function onSetFilterBy(newFilter) {
    setFilterBy(newFilter);
  }

  function handleToggleOpenForm(ev, action) {
    ev.preventDefault();
    if (action === "open") setIsAddFormOpen(true);
    if (action === "close") setIsAddFormOpen(false);
  }

  function handleRemoveNote(noteId) {
    notesService.removeNote(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    });
    showSuccessMsg("Note Removed");
  }

  function handleAddNote(note) {
    notesService.saveNote(note).then(() => {
      setNotes((prevNotes) => [...prevNotes, note]);
    });
    showSuccessMsg("Note Added");
  }

  function handleNoteType(type) {
    setNoteType(type);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!infoTxt || isOnFilter) return;

    const newNote = {
      createdAt: Date.now(),
      type: isOnTxtMode ? "NoteTxt" : noteType,
      isPinned: false,
      style: {
        backgroundColor: "var(--keep-bgc-1)",
      },
      info: {
        title: infoTitle,
        txt: isOnTxtMode && infoTxt,
        url: {
          image: isOnImgMode && infoTxt,
          video: isOnVideoMode && infoTxt,
          audio: isOnAudioMode && infoTxt,
        },
        todos: isOnTodosMode
          ? infoTxt.split("/").map((string) => ({ txt: string }))
          : [],
      },
    };
    handleAddNote(newNote);
    setInfoTxt("");
    setInfoTitle("");
    setIsAddFormOpen(false);
  }

  function reset() {
    setInfoTxt("");
    setInfoTitle("");
    setIsOnFilter(false);
    setActiveItem("Notes");
    setFilterByToEdit({ ...notesService.getDefaultFilter() });
    showSuccessMsg("Keep has been reset");
  }

  function handleSectionClick(ev) {
    if (!isAddFormOpen || ev.target.closest(".add-form")) return;
    handleSubmit(ev);
  }

  return (
    <section className="keep-index" onClick={handleSectionClick}>
      <KeepSidebar
        onReset={reset}
        onSetFilterBy={setFilterBy}
        filterBy={filterBy}
        activeItem={activeItem}
        onSetActiveItem={setActiveItem}
      />

      <AddForm
        isAddFormOpen={isAddFormOpen}
        infoTxt={infoTxt}
        isOnFilter={isOnFilter}
        filterByToEdit={filterByToEdit}
        onSetFilterByToEdit={setFilterByToEdit}
        filterBy={filterBy}
        onSetIsOnFilter={setIsOnFilter}
        onFilterBy={onSetFilterBy}
        onToggleOpenForm={handleToggleOpenForm}
        onSetInfoTxt={setInfoTxt}
        onSetInfoTitle={setInfoTitle}
        onReset={reset}
        onSubmit={handleSubmit}
        noteType={noteType}
        onSetNoteType={handleNoteType}
        isOnImgMode={isOnImgMode}
        onSetIsOnImgMode={setIsOnImgMode}
        isOnTxtMode={isOnTxtMode}
        onSetIsOnTxtMode={setIsOnTxtMode}
        isOnVideoMode={isOnVideoMode}
        onSetIsOnVideoMode={setIsOnVideoMode}
        isOnTodosMode={isOnTodosMode}
        onSetIsOnTodosMode={setIsOnTodosMode}
        isOnAudioMode={isOnAudioMode}
        onSetIsOnAudioMode={setIsOnAudioMode}
      />
      {!notes ? (
        <h1>loading...</h1>
      ) : (
        <NoteList notes={notes} onRemoveNote={handleRemoveNote} />
      )}

      <UserMsg />
    </section>
  );
}
