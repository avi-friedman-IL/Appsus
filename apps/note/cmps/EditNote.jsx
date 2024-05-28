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
          type: [...note.type, "NoteVideo"],
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

        {/* <label>
          Edit todos:
          <input
            type="text"
            placeholder="edit"
            name="todos"
            value={note.info.todos}
            onChange={handleChange}
          />
        </label> */}

        <label>
          Edit Image URL:
          <input
            type="text"
            placeholder="edit"
            name="image"
            value={note.info.url.image}
            onChange={handleChange}
          />
        </label>
        <label>
          Edit Video URL:
          <input
            type="text"
            placeholder="edit"
            name="video"
            value={note.info.url.video}
            onChange={handleChange}
          />
        </label>
        <label>
          Edit Audio URL:
          <input
            type="text"
            placeholder="edit"
            name="audio"
            value={note.info.url.audio}
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

//                 id: 'n103',
//                 createdAt: 1112224,
//                 type: ['NoteTodos','NoteVideo'],
//                 isPinned: false,
//                 style: {
//                     backgroundColor: '',
//                     font: '',
//                 },
//                 info: {
//                     title: 'Get my stuff together',
//                     txt: '',
//                     url: {
//                         image: '',
//                         video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//                         audio: '',
//                     },
//                     todos: [
//                         { txt: 'Driving license', doneAt: null },
//                         { txt: 'Coding power', doneAt: 187111111 },
//                     ],
//                 },
// ...note,
// type:[ ...note.type, 'NoteVideo']
//
//
