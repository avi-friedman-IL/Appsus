const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;

import { utilService } from "../../../services/util.service.js";
import { notesService } from "../services/note.service.js";

export function EditNote() {
  const [note, setNote] = useState(notesService.getEmptyNote());
  // const [note, setNote] = useState({
  //   info: { title: "", txt: "", todos: [], url: "" },
  //   style: { backgroundColor: "" },
  // });

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

      case "txt":
        setNote((prevNote) => ({
          ...prevNote,
          info: {
            ...prevNote.info,
            [name]: value,
          },
        }));
        break;

      case "todos":
        setNote((prevNote) => ({
          ...prevNote,
          info: {
            ...prevNote.info,
            [name]: value,
          },
        }));
        break;

      case "url":
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
            value={note.info.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Edit text:
          <input
            type="text"
            placeholder="edit"
            name="txt"
            value={note.info.txt}
            onChange={handleChange}
          />
        </label>

        <label>
          Edit todos:
          <input
            type="text"
            placeholder="edit"
            name="todos"
            value={note.info.todos}
            onChange={handleChange}
          />
        </label>

        <label>
          Edit URL:
          <input
            type="text"
            placeholder="edit"
            name="url"
            value={note.info.url}
            onChange={handleChange}
          />
        </label>

        <label>
          Edit background color:
          <input
            type="color"
            placeholder="edit"
            name="backgroundColor"
            value={note.style.backgroundColor}
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

// id: "",
// createdAt: '',
// type: "",
// isPinned: false,
// style: { backgroundColor: "" },
// info: { txt: '', title: "", todos: [], url: '' },
