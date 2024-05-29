const { useState, useEffect, useRef } = React;

import { utilService } from "../../../services/util.service.js";
import { notesService } from "../services/note.service.js";

export function AddForm({
  isAddFormOpen,
  infoTxt,
  isOnFilter,
  filterByToEdit,
  onSetFilterByToEdit,
  onSetIsOnFilter,
  onFilterBy,
  onToggleOpenForm,
  onSetInfoTxt,
  onReset,
  onSubmit,
  onSetNoteType,
  isOnImgMode,
  onSetIsOnImgMode,
  isOnTxtMode,
  onSetIsOnTxtMode,
  isOnVideoMode,
  onSetIsOnVideoMode,
  isOnTodosMode,
  onSetIsOnTodosMode,
  isOnAudioMode,
  onSetIsOnAudioMode,
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
    onSetIsOnImgMode(false);
    onSetIsOnTxtMode(false);
    onSetIsOnVideoMode(false);
    onSetIsOnAudioMode(false);
    onSetIsOnTodosMode(false);
  }

  function handleImgModeToggle() {
    onSetIsOnImgMode((prevIsOnImgMode) => !prevIsOnImgMode);
    onSetIsOnFilter(false);
    onSetIsOnTxtMode(false);
    onSetIsOnVideoMode(false);
    onSetIsOnTodosMode(false);
    onSetIsOnAudioMode(false);
    onSetNoteType("NoteImg");
  }

  function handleTxtModeToggle() {
    onSetIsOnTxtMode(true);
    onSetIsOnFilter(false);
    onSetIsOnImgMode(false);
    onSetIsOnVideoMode(false);
    onSetIsOnTodosMode(false);
    onSetIsOnAudioMode(false);
    onSetNoteType("NoteTxt");
  }

  function handleVideoModeToggle() {
    onSetIsOnVideoMode((prevIsOnVideoMode) => !prevIsOnVideoMode);
    onSetIsOnFilter(false);
    onSetIsOnImgMode(false);
    onSetIsOnTxtMode(false);
    onSetIsOnTodosMode(false);
    onSetIsOnAudioMode(false);
    onSetNoteType("NoteVideo");
  }
  function handleTodosModeToggle() {
    onSetIsOnTodosMode((prevIsOnVideoMode) => !prevIsOnVideoMode);
    onSetIsOnFilter(false);
    onSetIsOnImgMode(false);
    onSetIsOnTxtMode(false);
    onSetIsOnVideoMode(false);
    onSetIsOnAudioMode(false);
    onSetNoteType("NoteTodos");
  }
  function handleAudioModeToggle() {
    onSetIsOnAudioMode((prevIsOnVideoMode) => !prevIsOnVideoMode);
    onSetIsOnFilter(false);
    onSetIsOnImgMode(false);
    onSetIsOnTxtMode(false);
    onSetIsOnVideoMode(false);
    onSetIsOnTodosMode(false);
    onSetNoteType("NoteAudio");
  }

  function getPlaceholder() {
    if (isOnFilter) return "Filter notes";
    if (isOnTxtMode) return "Add a text note";
    if (isOnImgMode) return "Add image URL";
    if (isOnVideoMode) return "Add video URL";
    if (isOnTodosMode) return "Add todos note with ' / ' separation";
    if (isOnAudioMode) return "Add audio note";
    return onSetIsOnTxtMode(true);
  }

  function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
    }
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
          placeholder={getPlaceholder()}
          value={!isOnFilter ? infoTxt : filterByToEdit.title}
          onChange={
            !isOnFilter
              ? (ev) => onSetInfoTxt(ev.target.value)
              : (ev) => handleFilterTxtChange(ev.target.value)
          }
          onClick={onToggleOpenForm}
          onKeyDown={handleKeyDown}
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
              onClick={handleTxtModeToggle}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <button
              title="add image note"
              type="button"
              className="btn img-btn"
              onClick={handleImgModeToggle}
            >
              <i className="fa-solid fa-image"></i>
            </button>

            <button
              title="add video note"
              type="button"
              className="btn video-btn"
              onClick={handleVideoModeToggle}
            >
              <i className="fa-brands fa-youtube"></i>
            </button>

            <button
              title="add audio note"
              type="button"
              className="btn audio-btn"
              onClick={handleAudioModeToggle}
            >
              <i className="fa-solid fa-volume-high"></i>
            </button>

            <button
              title="add todos note"
              type="button"
              className="btn list-btn"
              onClick={handleTodosModeToggle}
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
