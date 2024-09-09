import React from "react";
import "./Assets/SortingVisualizer.css";

const Canvas = ({ array, sorted, sorting }) => {
  return (
    <div className="canvas">
      {array.map((value, index) => (
        <div
          key={index}
          className={`bar ${
            sorted ? "sorted" : sorting ? "sorting" : "default"
          }`}
          style={{ height: `${value * 10}px` }}
        >
          <div className="value-label">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default Canvas;
