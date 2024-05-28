export function NoteImg({ note }) {
  return (
    <div className="note-img">
      {/* <img src={note.info.url.image} alt="note" />
      <p className="title">{note.title}</p>
    </div> */}
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
