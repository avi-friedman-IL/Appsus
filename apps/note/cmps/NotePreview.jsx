const { Link } = ReactRouterDOM;
const { useState } = React;
const { useNavigate } = ReactRouter;

import { utilService } from "../../../services/util.service.js";
import { mailService } from "../../mail/services/mail.service.js";

import { NoteTxt } from "../cmps/NoteTxt.jsx";
import { NoteImg } from "../cmps/NoteImg.jsx";
import { NoteVideo } from "../cmps/NoteVideo.jsx";
import { NoteAudio } from "./NoteAudio.jsx";
import { NoteTodos } from "../cmps/NoteTodos.jsx";
import { ColorInput } from "./ColorInput.jsx";

export function NotePreview({
  note,
  onRemoveNote,
  onTogglePinned,
  onSaveNote,
  onDuplicateNote,
}) {
  const [noteBgc, setNoteBgc] = useState(note.style.backgroundColor || "#fff");
  const navigate = useNavigate();

  function handleNoteBgcChange(color) {
    setNoteBgc(color);

    const updatedNote = {
      ...note,
      style: {
        ...note.style,
        backgroundColor: color,
      },
    };

    onSaveNote(updatedNote);
  }

  function handleSaveNoteAsEmail() {
    const newMail = {
      id: "",
      subject: note.info.title,
      body: note.info.txt,
      isRead: false,
      isStarred: Math.random() > 0.7,
      isDraft: false,
      sentAt: Date.now(),
      removedAt: null,
      from: "you",
      to: "you",
    };
    mailService.save(newMail);
    navigate("/mail");
  }

  return (
    <li className="note-card" style={{ backgroundColor: noteBgc }}>
      {note.type === "NoteTxt" && <NoteTxt note={note} />}
      {note.type === "NoteImg" && <NoteImg note={note} />}
      {note.type === "NoteVideo" && <NoteVideo note={note} />}
      {note.type === "NoteAudio" && <NoteAudio note={note} />}
      {note.type === "NoteTodos" && <NoteTodos note={note} />}

      <div className="icons">
        <div
          className={`btn pin-btn ${note.isPinned ? "pinned" : ""}`}
          title={note.isPinned ? "pinned" : "not pinned"}
          onClick={() => onTogglePinned(note)}
        >
          <i className="fa-solid fa-thumbtack"></i>
        </div>

        <Link to={`/note/edit/${note.id}`}>
          <div className="btn edit-btn" title="edit">
            <i className="fa-solid fa-pen"></i>
          </div>
        </Link>

        <div
          className="btn remove-btn"
          title="remove"
          onClick={() => onRemoveNote(note.id)}
        >
          <i className="fa-regular fa-trash-can"></i>
        </div>

        <div
          className="btn clone-btn"
          title="clone"
          onClick={() => onDuplicateNote(note)}
        >
          <i className="fa-solid fa-clone"></i>
        </div>

        <div
          className="btn send-btn"
          title="send as mail"
          onClick={handleSaveNoteAsEmail}
        >
          <i className="fa-regular fa-paper-plane"></i>
        </div>
      </div>
      <ColorInput onSetBgc={handleNoteBgcChange} />
    </li>
  );
}
