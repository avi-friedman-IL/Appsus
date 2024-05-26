import { lightBulb } from "../../../assets/img/bulb.png";
export function KeepSidebar() {
  return (
    <section className="keep-sidebar">
      <div className="keep-sidebar-item notes-btn active">
        <img src="../../../assets/img/bulb.png" alt="lightbulb" />
        <span>Notes</span>
      </div>

      <div className="keep-sidebar-item reminders-btn">
        <img src="../../../assets/img/bell.png" alt="lightbulb" />
        <span>Reminders</span>
      </div>

      <div className="keep-sidebar-item edit-btn">
        <img src="../../../assets/img/pen.png" alt="lightbulb" />
        <span>Edit</span>
      </div>

      <div className="keep-sidebar-item archive-btn">
        <img src="../../../assets/img/archive.png" alt="lightbulb" />
        <span>Archive</span>
      </div>

      <div className="keep-sidebar-item trash-btn">
        <img src="../../../assets/img/delete.png" alt="lightbulb" />
        <span>Trash</span>
      </div>
    </section>
  );
}
