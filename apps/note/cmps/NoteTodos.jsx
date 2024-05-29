export function NoteTodos({ note }) {
  return (
    <div className="note-todos">
      {note.info.url.image ? (
        <img src={note.info.url.image} alt="Note Image" />
      ) : null}

      <section className="video">
        {note.info.url.video ? (
          <iframe
            src={note.info.url.video}
            width="480"
            height="170"
            title="video"
            allowFullScreen
          ></iframe>
        ) : null}
      </section>

      {note.info.url.audio ? (
        <audio controls>
          <source src={note.info.url.audio} />
        </audio>
      ) : null}

      {note.info.title ? <p className="title"> {note.info.title} </p> : null}

      {note.info.txt ? <p className="txt"> {note.info.txt} </p> : null}

      {note.info.todos ? (
        <ul className="todo-list">
          {note.info.todos.map((todo, index) => (
            <li key={index}>{todo.txt}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
