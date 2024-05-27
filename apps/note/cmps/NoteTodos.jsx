export function NoteTodos({ note }) {
  <div className="note-todos">
    <ul>
      {note.info.todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  </div>;
}
