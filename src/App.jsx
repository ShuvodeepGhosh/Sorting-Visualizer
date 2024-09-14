import React from "react";
import Visualiser from "./Visualiser";
import ArrayDestructureMain from "./SortingAlgorithms/ArrayDestructure";
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const App = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <Visualiser /> */}
      <ArrayDestructureMain val={arr} />
    </div>
  );
};

export default App;
