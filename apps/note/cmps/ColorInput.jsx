export function ColorInput({ name, onSetFooterStyle, backgroundColor }) {
  console.log("backgroundColor:", backgroundColor);

  const colors = [
    "#F44236",
    "#9C27B0",
    "#3F51B5",
    "#2196F3",
    "#4caf50",
    "#101010",
  ];

  function onSetColor(color) {
    const newStyle = { backgroundColor: color };
    onSetFooterStyle(newStyle);
  }

  return (
    <section className="color-input">
      <div className="items-container">
        {colors.map((color) => (
          <div
            key={color}
            className={`item ${backgroundColor === color ? "chosen" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => onSetColor(color)}
          ></div>
        ))}
      </div>
    </section>
  );
}
