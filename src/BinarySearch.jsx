import React, { useState, useEffect } from "react";
import "./Assets/BinarySearch.css";

const BinarySearch = ({
  array,
  target,
  onComplete,
  searchStarted,
  selectedAlgorithm,
}) => {
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [foundIndex, setFoundIndex] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (searchStarted) {
      const isSorted = array.every(
        (value, index, arr) => index === 0 || arr[index - 1] <= value
      );

      if (!isSorted) {
        setErrorMessage("Error: The array must be sorted for binary search.");
        setResultMessage("");
        onComplete(-1);
        return;
      }

      setErrorMessage("");
      setHighlightedIndices([]);
      setFoundIndex(null);
      setResultMessage("");

      const search = async () => {
        let left = 0;
        let right = array.length - 1;
        let indexFound = -1;

        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          setHighlightedIndices([left, right, mid]);

          if (array[mid] === target) {
            indexFound = mid;
            setFoundIndex(mid);
            setResultMessage(`Found at index ${mid}`);
            onComplete(mid);
            return;
          } else if (array[mid] < target) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        setResultMessage("Not Found !");
        onComplete(-1);
      };
      search();
    }
  }, [searchStarted, array, target, onComplete]);

  return (
    <>
      <div className="binary-search-container">
        {array.map((value, index) => (
          <span
            key={index}
            className={`array-element ${
              highlightedIndices.includes(index) &&
              index === highlightedIndices[0]
                ? "left-highlighted"
                : highlightedIndices.includes(index) &&
                  index === highlightedIndices[1]
                ? "right-highlighted"
                : highlightedIndices.includes(index) &&
                  index === highlightedIndices[2]
                ? "mid-highlighted"
                : ""
            } ${foundIndex === index ? "found" : ""}`}
          >
            {value}
          </span>
        ))}
      </div>
      <div className="result-message">{resultMessage}</div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <h3>Selected Algorithm : {selectedAlgorithm}</h3>
    </>
  );
};

export default BinarySearch;
