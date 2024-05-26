export function KeepSidebar() {
  return (
    <section className="keep-sidebar">
      <div className="keep-sidebar-item notes-btn active">
        <i className="fa-solid fa-lightbulb"></i>
        <span>Notes</span>
      </div>

      <div className="keep-sidebar-item reminders-btn">
        <i className="fa-solid fa-bell"></i>
        <span>Reminders</span>
      </div>

      <div className="keep-sidebar-item edit-btn">
        <i className="fa-solid fa-pen"></i>
        <span>Edit</span>
      </div>

      <div className="keep-sidebar-item archive-btn">
        <i className="fa-solid fa-boxes-packing"></i>
        <span>Archive</span>
      </div>
      <div className="keep-sidebar-item trash-btn">
        <i className="fa-solid fa-trash-can"></i>
        <span>Trash</span>
      </div>
    </section>
  );
}
