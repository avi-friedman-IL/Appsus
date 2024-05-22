const { useState, useEffect } = React;

import { utilService } from "../../../services/util.service.js";

export function Form({ onAddNote }) {
  const [infoTxt, setInfoTxt] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();

    if (!infoTxt) return;

    const newNote = {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: "NoteTxt",
      isPinned: false,
      style: {
        backgroundColor: "rgb(173,173,215)",
      },
      info: {
        txt: infoTxt,
      },
    };

    onAddNote(newNote);
    setInfoTxt("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div>
        <input
          id="add-note"
          type="text"
          placeholder="Add a note"
          value={infoTxt}
          onChange={(ev) => setInfoTxt(ev.target.value)}
        />

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
    </form>
  );
}
