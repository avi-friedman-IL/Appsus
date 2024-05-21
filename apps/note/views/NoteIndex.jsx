const { useState } = React;
import { notesService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";

export function NoteIndex() {
  const [notes, setNotes] = useState(notesService.getNotes());
  function handleSubmit(ev) {
    ev.preventDefault();
  }

  function removeNote(noteId) {
    notesService.removeNote(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    });
  }

  return (
    <section>
      <form className="add-form" onSubmit={handleSubmit}>
        <div>
          <input id="add-note" type="text" placeholder="Add a Note" />

          <button>
            <img
              src="./assets/img/image_24dp_FILL0_wght400_GRAD0_opsz24.png"
              alt="img"
            />
          </button>
        </div>
      </form>

      <NoteList notes={notes} onRemove={removeNote} />
    </section>
  );
}
