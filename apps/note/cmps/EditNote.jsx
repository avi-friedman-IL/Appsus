const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;

import { notesService } from "../services/note.service.js";
import { showSuccessMsg } from "../../../services/event-bus.service.js";
import { UserMsg } from "../../../cmps/UserMsg.jsx";

export function EditNote() {
  const [note, setNote] = useState(notesService.getEmptyNote());

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
            [name]: value.split("/").map((string) => ({ txt: string })),
          },
        }));
        break;

      case "image":
        setNote((prevNote) => ({
          ...prevNote,
          info: {
            ...prevNote.info,
            url: {
              ...prevNote.info.url,
              [name]: value,
            },
          },
        }));
        break;
      case "video":
        setNote((prevNote) => ({
          ...prevNote,
          info: {
            ...prevNote.info,
            url: {
              ...prevNote.info.url,
              [name]: value,
            },
          },
        }));
        break;
      case "audio":
        setNote((prevNote) => ({
          ...prevNote,
          info: {
            ...prevNote.info,
            url: {
              ...prevNote.info.url,
              [name]: value,
            },
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
    showSuccessMsg("Note Edit Saved");
  }

  function onGoBack() {
    setTimeout(() => {
      navigate("/note");
    }, 2000);
  }

  return (
    <section className="edit-section">
      <form onSubmit={saveNote} autoComplete="off">
        <label>Edit title:</label>
        <input
          type="text"
          placeholder="edit"
          name="title"
          value={note.info.title}
          onChange={handleChange}
        />

        <label>Edit text:</label>
        <input
          type="text"
          placeholder="edit"
          name="txt"
          value={note.info.txt}
          onChange={handleChange}
        />

        <label>Edit todos with ' / ' separation:</label>
        <input
          type="text"
          placeholder="edit"
          name="todos"
          value={note.info.todos.map((todo) => todo.txt).join("/")}
          onChange={handleChange}
        />

        <label>Edit Image URL:</label>
        <input
          type="text"
          placeholder="edit"
          name="image"
          value={note.info.url.image}
          onChange={handleChange}
        />

        <label>Edit Video URL:</label>
        <input
          type="text"
          placeholder="edit"
          name="video"
          value={note.info.url.video}
          onChange={handleChange}
        />

        <label>Edit Audio URL:</label>
        <input
          type="text"
          placeholder="edit"
          name="audio"
          value={note.info.url.audio}
          onChange={handleChange}
        />

        <label>Edit background color:</label>
        <input
          type="color"
          placeholder="edit"
          name="backgroundColor"
          value={note.style.backgroundColor}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={onGoBack}>
          Go Back
        </button>
      </form>

      <UserMsg />
    </section>
  );
}
