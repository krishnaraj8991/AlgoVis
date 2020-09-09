import React from "react";

export default function Path({ x, y, z }) {
  if (z) {
    var x2 = x + 75;
    var y2 = y + 150;
  } else {
    x2 = x + 75;
    y2 = y;
  }
  return (
    <line
      x1={x}
      y1={y}
      x2={x2}
      y2={y2}
      style={{ stroke: "rgb(255,0,0)", strokeWidth: "2" }}
    />
  );
}
