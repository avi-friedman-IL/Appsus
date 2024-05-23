export function KeepSidebar() {
  return (
    <section className="keep-sidebar">
      <div className="keep-sidebar-item notes active">
        <i className="fa-solid fa-lightbulb"></i>
        <span>Notes</span>
      </div>

      <div className="keep-sidebar-item reminders">
        <i className="fa-solid fa-bell"></i>
        <span>Reminders</span>
      </div>

      <div className="keep-sidebar-item edit-notes">
        <i className="fa-solid fa-pen"></i>
        <span>Edit Notes</span>
      </div>

      <div className="keep-sidebar-item notes-archive">
        <i className="fa-solid fa-boxes-packing"></i>
        <span>Archive</span>
      </div>
      <div className="keep-sidebar-item trash">
        <i className="fa-solid fa-trash-can"></i>
        <span>Trash</span>
      </div>
    </section>
  );
}
