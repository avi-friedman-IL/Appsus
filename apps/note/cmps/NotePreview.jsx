export function NotePreview({ note, onRemoveNote }) {
  return (
    <div className="note-card" style={note.style} key={note.id}>
      <p>{note.info.txt ? note.info.txt : ""}</p>
      <p>{note.info.title ? note.info.title : ""}</p>

      <ul>
        {note.info.todos
          ? note.info.todos.map((todo, index) => (
              <li key={index}>{todo.txt}</li>
            ))
          : ""}
      </ul>

      <div className="icons">
        <div className="btn remove-btn" onClick={() => onRemoveNote(note.id)}>
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div className="btn pin-btn">
          <i className="fa-solid fa-thumbtack"></i>
        </div>
        <div className="btn update-btn">
          <i className="fa-solid fa-pen"></i>
        </div>
      </div>
    </div>
  );
}
