const { useState, useEffect, useRef } = React;

import { utilService } from "../../../services/util.service.js";
import { notesService } from "../services/note.service.js";

export function AddForm({ onAddNote }) {
  const [isOpen, setIsOpen] = useState(false);
  const [infoTxt, setInfoTxt] = useState("");

  function handleToggle(ev) {
    ev.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    if (!infoTxt) return;

    const newNote = {
      createdAt: Date.now(),
      type: "NoteTxt",
      isPinned: false,
      style: {
        backgroundColor: "var(--keep-bgc-1)",
      },
      info: {
        title: infoTxt,
        txt: "",
        todos: [],
        url: "",
      },
    };
    onAddNote(newNote);
    setInfoTxt("");
    setIsOpen(false);
  }

  return (
    <section className="notes-add-input">
      <form
        autoComplete="off"
        className={`add-form ${isOpen ? "open" : "closed"}`}
        onSubmit={handleSubmit}
      >
        <input
          id="add-note"
          type="text"
          placeholder="Add a note"
          value={infoTxt}
          onChange={(ev) => setInfoTxt(ev.target.value)}
          onClick={handleToggle}
        />

        {isOpen && (
          <div className="content-box">
            <button type="submit" className="btn submit-btn">
              <i className="fa-solid fa-plus"></i>
            </button>

            <button type="button" className="btn font-btn">
              <i className="fa-solid fa-font"></i>
            </button>

            <button type="button" className="btn img-btn">
              <i className="fa-solid fa-image"></i>
            </button>

            <button type="button" className="btn video-btn">
              <i className="fa-brands fa-youtube"></i>
            </button>

            <button type="button" className="btn audio-btn">
              <i className="fa-solid fa-volume-high"></i>
            </button>

            <button type="button" className="btn list-btn">
              <i className="fa-solid fa-list-ul"></i>
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
