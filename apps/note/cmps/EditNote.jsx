const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;

import { utilService } from "../../../services/util.service.js";
import { notesService } from "../services/note.service.js";

export function EditNote() {
  const [note, setNote] = useState({ info: { title: "" } });
  const [color, setColor] = useState("");

  // const [note, setNote] = useState({
  //   id: "",
  //   type: "",
  //   isPinned: false,
  //   style: { backgroundColor: "" },
  //   info: { title: "", todos: [], url:'' },
  // });

  const { noteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!noteId) return;
    notesService.getNoteById(noteId).then(setNote);
  }, [noteId]);

  // useEffect(() => {
  //   notesService.getNoteById(noteId).then((note) => {
  //     const noteToEdit = {
  //       id: note.id,
  //       type: note.type,
  //       isPinned: note.isPinned,
  //       style: { backgroundColor: note.style.backgroundColor },
  //       info: {
  //         title: note.info.title,
  //         todos: note.info.todos,
  //         url: note.info.url,
  //       },
  //     };
  //     setNoteToEdit(noteToEdit);
  //   });
  // }, [noteId]);

  function handleChange(ev) {
    const { name, value } = ev.target;
    setNote((prevNote) => ({
      ...prevNote,
      info: {
        ...prevNote.info,
        [name]: value,
      },
    }));
    console.log(note);
  }

  function saveNote(ev) {
    ev.preventDefault();
    notesService
      .saveNote(note)
      .then(() => onGoBack())
      .catch((err) => {
        console.log("Error:", err);
      });
    console.log(note);
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
      </form>
    </section>
  );
}
