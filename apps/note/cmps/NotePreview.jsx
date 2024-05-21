export function NotePreview({ note }) {
  return (
    <div className="note-card" style={note.style}>
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
        <span>✖️</span>
        <span>
          <img src="../assets/img/delete_24dp_FILL0_wght400_GRAD0_opsz24.png" />
        </span>
      </div>
    </div>
  );
}
