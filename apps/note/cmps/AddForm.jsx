const { useState, useEffect, useRef } = React;

import { utilService } from "../../../services/util.service.js";
import { notesService } from "../services/note.service.js";

export function AddForm({
  // onAddNote,
  isAddFormOpen,
  infoTxt,
  isOnFilter,
  filterByToEdit,
  onSetFilterByToEdit,
  // filterBy,
  onSetIsOnFilter,
  onFilterBy,
  onToggle,
  onSetInfoTxt,
  onReset,
  onSubmit,
}) {
  const setFilterDebounce = useRef(utilService.debounce(onFilterBy, 500));

  useEffect(() => {
    setFilterDebounce.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleFilterTxtChange(value) {
    onSetFilterByToEdit((prevFilter) => ({ ...prevFilter, ["title"]: value }));
  }

  function handleFilterToggle() {
    onSetIsOnFilter((prevIsOnFilter) => !prevIsOnFilter);
  }

  return (
    <section className="notes-add-input">
      <form
        autoComplete="off"
        className={`add-form ${isAddFormOpen ? "open" : "closed"}`}
        onSubmit={onSubmit}
      >
        <input
          id="add-note"
          type="text"
          placeholder={isOnFilter ? "Filter notes" : "Add a note"}
          value={!isOnFilter ? infoTxt : filterByToEdit.title}
          onChange={
            !isOnFilter
              ? (ev) => onSetInfoTxt(ev.target.value)
              : (ev) => handleFilterTxtChange(ev.target.value)
          }
          onClick={onToggle}
        />

        {isAddFormOpen && (
          <div className="content-box">
            <button
              title="filter"
              type="button"
              className="btn serach-btn"
              onClick={handleFilterToggle}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <button title="add note" type="submit" className="btn submit-btn">
              <i className="fa-solid fa-plus"></i>
            </button>

            <button
              title="add text note"
              type="button"
              className="btn text-btn"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <button
              title="add image note"
              type="button"
              className="btn img-btn"
            >
              <i className="fa-solid fa-image"></i>
            </button>

            <button
              title="add video note"
              type="button"
              className="btn video-btn"
            >
              <i className="fa-brands fa-youtube"></i>
            </button>

            <button
              title="add audio note"
              type="button"
              className="btn audio-btn"
            >
              <i className="fa-solid fa-volume-high"></i>
            </button>

            <button
              title="add todo note"
              type="button"
              className="btn list-btn"
            >
              <i className="fa-solid fa-list-ul"></i>
            </button>

            <button
              title="reset"
              type="button"
              className="btn reset-btn"
              onClick={onReset}
            >
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
