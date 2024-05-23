const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;

import { utilService } from "../../../services/util.service.js";
import { notesService } from "../services/note.service.js";

export function EditNote() {
  const [note, setNote] = useState({ info: { title: "" } });
  const [bgColor, setBgColor] = useState("#FFC0CB");

  const { noteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!noteId) return;
    notesService.getNoteById(noteId).then(setNote);
    // .then((note) => setBgColor(note.style.backgroundColor));
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
    console.log(noteToSave);
  }

  function onGoBack() {
    navigate("/note");
  }

  return (
    <section className="edit-section">
      <form onSubmit={saveNote}>
        <label>
          Info title:
          <input
            type="text"
            placeholder="edit"
            name="title"
            onChange={handleChange}
          />
        </label>
        <label>
          style background color:
          <input
            type="color"
            placeholder="edit"
            name="backgroundColor"
            value={bgColor}
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
