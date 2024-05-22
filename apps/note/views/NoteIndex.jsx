const { useState, useEffect } = React;
import { notesService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    notesService.getNotes().then((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  }, []);

  function handleRemoveNote(noteId) {
    notesService.removeNote(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    });
  }

  function handleAddNote(note) {
    notesService.addNote(note).then(() => {
      setNotes((prevNotes) => [...prevNotes, note]);
    });
  }

  return (
    <section>
      <Form onAddNote={handleAddNote} />
      <NoteList notes={notes} onRemoveNote={handleRemoveNote} />
    </section>
  );
}

function Form({ onAddNote }) {
  const [infoTxt, setInfoTxt] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();

    const newNote = {
      id: "",
      createdAt: Date.now(),
      type: "NoteTxt",
      isPinned: false,
      style: {
        backgroundColor: "rgb(173,173,215)",
      },
      info: {
        txt: infoTxt,
      },
    };

    onAddNote(newNote);
    setInfoTxt("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div>
        <input
          id="add-note"
          type="text"
          placeholder="Add a Note"
          value={infoTxt}
          onChange={(ev) => setInfoTxt(ev.target.value)}
        />

        <button className="btn img-btn">
          <i className="fa-solid fa-image"></i>
        </button>

        <button className="btn video-btn">
          <i className="fa-brands fa-youtube"></i>
        </button>

        <button className="btn audio-btn">
          <i className="fa-solid fa-volume-high"></i>
        </button>
        <button className="btn list-btn">
          <i className="fa-solid fa-list-ul"></i>
        </button>
      </div>
    </form>
  );
}
