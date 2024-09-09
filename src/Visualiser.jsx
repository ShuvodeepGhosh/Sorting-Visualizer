import React, { useState } from "react";
import "./SortingVisualizer.css";
import { bubbleSort, bubbleSortDetails } from "./Algorithms/BubbleSort";
import {
  insertionSort,
  insertionSortDetails,
} from "./Algorithms/InsertionSort";
import {
  selectionSort,
  selectionSortDetails,
} from "./Algorithms/SelectionSort";
import Canvas from "./Canvas"; // Import the new Canvas component

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [input, setInput] = useState("");
  const [sorting, setSorting] = useState(false);
  const [stepDescription, setStepDescription] = useState("");
  const [arrayState, setArrayState] = useState("");
  const [details, setDetails] = useState({});
  const [sorted, setSorted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsedArray = input
      .split(",")
      .map(Number)
      .filter((num) => !isNaN(num) && num > 0);
    if (parsedArray.length > 0) {
      setArray(parsedArray);
      setArrayState(parsedArray.join(", "));
      setSorting(false);
      setSorted(false);
      setStepDescription("");
      setDetails({});
    } else {
      alert("Please enter a valid array");
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAlgorithmClick = (alg) => {
    setSelectedAlgorithm(alg);
  };

  const handleStartClick = async () => {
    if (!selectedAlgorithm) {
      alert("Please select an algorithm");
      return;
    }

    let algorithmDetails;
    setStepDescription("");
    setArrayState(array.join(", "));
    setSorting(true);

    if (selectedAlgorithm === "Bubble Sort") {
      algorithmDetails = bubbleSortDetails;
      await bubbleSort(
        array,
        setArray,
        setStepDescription,
        setArrayState,
        sleep
      );
    } else if (selectedAlgorithm === "Insertion Sort") {
      algorithmDetails = insertionSortDetails;
      await insertionSort(
        array,
        setArray,
        setStepDescription,
        setArrayState,
        sleep
      );
    } else if (selectedAlgorithm === "Selection Sort") {
      algorithmDetails = selectionSortDetails;
      await selectionSort(
        array,
        setArray,
        setStepDescription,
        setArrayState,
        sleep
      );
    }

    setDetails(algorithmDetails);
    setSorting(false);
    setSorted(true);
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <h3>Sorting Visualizer</h3>

        <div className="controls">
          <button
            className="button"
            onClick={() => handleAlgorithmClick("Bubble Sort")}
            disabled={sorting || array.length === 0}
          >
            Bubble Sort
          </button>
          <button
            className="button"
            onClick={() => handleAlgorithmClick("Insertion Sort")}
            disabled={sorting || array.length === 0}
          >
            Insertion Sort
          </button>
          <button
            className="button"
            onClick={() => handleAlgorithmClick("Selection Sort")}
            disabled={sorting || array.length === 0}
          >
            Selection Sort
          </button>
          <button className="button" disabled>
            Merge Sort
          </button>
          <button className="button" disabled>
            Quick Sort
          </button>
          <button className="button" disabled>
            Heap Sort
          </button>
        </div>

        <h3>Searching Visualizer</h3>

        <div className="controls">
          <button className="button" disabled>
            Linear Search
          </button>
          <button className="button" disabled>
            Binary Search
          </button>
        </div>

        {/* Algorithm Details Section (uncomment to use) */}
        {/* <div className="algorithm-details">
          {details.name && (
            <>
              <h3>{details.name}</h3>
              <p>{details.description}</p>
              <p>
                <strong>Best Case Time Complexity:</strong> {details.bestCase}
              </p>
              <p>
                <strong>Worst Case Time Complexity:</strong> {details.worstCase}
              </p>
              <p>
                <strong>Average Case Time Complexity:</strong>{" "}
                {details.averageCase}
              </p>
            </>
          )}
        </div> */}
      </div>
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter array"
            disabled={sorting}
          />
          <button type="submit" disabled={sorting} id="setArray">
            Set Array
          </button>
          <button
            onClick={handleStartClick}
            disabled={
              sorting || array.length === 0 || !selectedAlgorithm || sorted
            }
            id="start"
          >
            Start
          </button>
        </form>

        {array.length > 0 ? (
          selectedAlgorithm ? (
            <>
              <Canvas array={array} sorted={sorted} sorting={sorting} />
              <div className="array-state">[ {arrayState} ]</div>
              <div className="step-description">{stepDescription}</div>
              <h3>Selected Algorithm : {selectedAlgorithm}</h3>
            </>
          ) : (
            <div className="no-algorithm-message">
              Please select an algorithm to visualize the sorting process.
            </div>
          )
        ) : (
          <div className="no-array-message">
            Please enter an array to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingVisualizer;
