export function ColorInput({ onSetBgc }) {
  // console.log("backgroundColor:", backgroundColor);

  const colors = [
    "#faafa8",
    "#f39f76",
    "#e2f6d3",
    "#d4e4ed",
    "#d3bfdb",
    "#f6e2dd",
  ];

  // function onSetColor(color) {
  //   const newStyle = { backgroundColor: color };
  //   onSetFooterStyle(newStyle);
  // }

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
