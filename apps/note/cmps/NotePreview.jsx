const { Link } = ReactRouterDOM;

export function NotePreview({ note, onRemoveNote }) {
  return (
    <React.Fragment>
      <p>{note.info.txt ? note.info.txt : ""}</p>
      <p>{note.info.title ? note.info.title : ""}</p>

      <ul className="todo-list">
        {note.info.todos
          ? note.info.todos.map((todo, index) => (
              <li key={index}>{todo.txt}</li>
            ))
          : ""}
      </ul>

      <div className="icons">
        <div className="btn pin-btn">
          <i className="fa-solid fa-thumbtack"></i>
        </div>

        <Link to={`/note/edit/${note.id}`}>
          <div className="btn edit-btn">
            <i className="fa-solid fa-pen"></i>
          </div>
        </Link>

        <div className="btn remove-btn" onClick={() => onRemoveNote(note.id)}>
          <i className="fa-regular fa-trash-can"></i>
        </div>
      </div>
    </React.Fragment>
  );
}
