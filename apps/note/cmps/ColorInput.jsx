export function ColorInput({ onSetBgc }) {
  const colors = [
    "var(--keep-note-bgs-1)",
    "var(--keep-note-bgs-2)",
    "var(--keep-note-bgs-3)",
    "var(--keep-note-bgs-4)",
    "var(--keep-note-bgs-5)",
    "var(--keep-note-bgs-6)",
  ];

  return (
    <div className="color-container">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-item`}
          style={{ backgroundColor: color }}
          onClick={() => onSetBgc(color)}
        ></div>
      ))}
    </div>
  );
}
