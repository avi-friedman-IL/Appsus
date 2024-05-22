const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;

import { notesService } from "../services/note.service.js";

export function EditNote() {
  const [note, setNote] = useState(notesService.getEmptyNote());
  const { noteId } = useParams();

  useEffect(() => {
    notesService.getNoteById(noteId).then((note) => setNote(note));
  }, []);

  return (
    <section className="edit-section">
      <form>
        <label>Info title: </label>
        <input
          type="text"
          placeholder="edit"
          name="info.title"
          value={note.info.title ? note.info.title : ""}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </form>
    </section>
  );
}

// id: 'n103',
// type: 'NoteTodos',
// isPinned: false,
// style: {
//     backgroundColor: 'rgb(173,173,215)'
// },
// info: {
//     title: 'Get my stuff together',
//     todos: [
//         { txt: 'Driving license', doneAt: null },
//         { txt: 'Coding power', doneAt: 187111111 }
//     ]
// }
