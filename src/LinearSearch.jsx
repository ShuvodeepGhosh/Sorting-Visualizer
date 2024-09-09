import React, { useState, useEffect } from "react";
import "./Assets/LinearSearch.css";

const LinearSearch = ({
  array,
  target,
  onComplete,
  searchStarted,
  selectedAlgorithm,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    if (searchStarted) {
      setHighlightedIndex(null);
      setFoundIndex(null);
      setResultMessage("");

      const search = async () => {
        let indexFound = -1;
        for (let i = 0; i < array.length; i++) {
          setHighlightedIndex(i);
          if (array[i] === target) {
            indexFound = i;
            setFoundIndex(i);
            setResultMessage(`Found at index ${i}`);
            onComplete(i);
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        setHighlightedIndex(null);
        setResultMessage("Not Found !");
        onComplete(-1);
      };
      search();
    }
  }, [searchStarted, array, target, onComplete]);

  return (
    <>
      <div className="linear-search-container">
        {array.map((value, index) => (
          <span
            key={index}
            className={`array-element ${
              highlightedIndex === index ? "highlighted" : ""
            } ${foundIndex === index ? "found" : ""}`}
          >
            {value}
          </span>
        ))}
      </div>
      <div className="result-message">{resultMessage}</div>
      <h3>Selected Algorithm : {selectedAlgorithm}</h3>
    </>
  );
};

export default LinearSearch;
