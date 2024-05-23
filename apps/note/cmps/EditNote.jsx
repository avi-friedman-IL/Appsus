const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;

import { utilService } from "../../../services/util.service.js";
import { notesService } from "../services/note.service.js";

export function EditNote() {
  const [note, setNote] = useState({
    info: { title: "", txt: "" },
    style: { backgroundColor: "" },
  });

  const { noteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!noteId) return;
    notesService.getNoteById(noteId).then((getNote) => setNote(getNote));
  }, [noteId]);

  function handleChange(ev) {
    const { name, value } = ev.target;
    switch (name) {
      case "title":
        setNote((prevNote) => ({
          ...prevNote,
          info: {
            ...prevNote.info,
            [name]: value,
          },
        }));
        break;

      case "backgroundColor":
        setNote((prevNote) => ({
          ...prevNote,
          style: {
            ...prevNote.style,
            backgroundColor: value,
          },
        }));
        break;
    }
  }

  function saveNote(ev) {
    ev.preventDefault();
    const noteToSave = {
      ...note,
      info: { ...note.info, title: note.info.title },
      style: { ...note.style },
    };
    notesService
      .saveNote(noteToSave)
      .then(() => onGoBack())
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  function onGoBack() {
    navigate("/note");
  }

  return (
    <section className="edit-section">
      <form onSubmit={saveNote}>
        <label>
          Edit title:
          <input
            type="text"
            placeholder="edit"
            name="title"
            onChange={handleChange}
          />
        </label>
        <label>
          Edit background color:
          <input
            type="color"
            placeholder="edit"
            name="backgroundColor"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onGoBack}>
          Go Back
        </button>
      </form>
    </section>
  );
}
