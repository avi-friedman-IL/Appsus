export function NoteVideo({ note }) {
  <div className="note-video">
    <iframe
      src={note.info.url.video}
      width="480"
      height="270"
      title="Video Note"
      allowFullScreen
    ></iframe>
  </div>;
}
