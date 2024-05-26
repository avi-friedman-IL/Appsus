const { useState, useEffect, useRef } = React;

import { utilService } from "../../../services/util.service.js";
import { notesService } from "../services/note.service.js";

export function AddForm({
  onAddNote,
  isAddFormOpen,
  infoTxt,
  isOnFilter,
  filterBy,
  onSetIsOnFilter,
  onFilterBy,
  onToggle,
  onSetInfoTxt,
  onReset,
  onSubmit,
}) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const onSetFilterDebounce = useRef(utilService.debounce(onFilterBy, 500));

  useEffect(() => {
    onSetFilterDebounce.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleFilterTxtChange(value) {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, ["title"]: value }));
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
              type="button"
              className="btn serach-btn"
              onClick={handleFilterToggle}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

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

            <button type="button" className="btn reset-btn" onClick={onReset}>
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
