import React, { useState } from "react";
import "./Assets/SortingVisualizer.css";
import { bubbleSort } from "./SortingAlgorithms/BubbleSort";
import { insertionSort } from "./SortingAlgorithms/InsertionSort";
import { selectionSort } from "./SortingAlgorithms/SelectionSort";
import LinearSearch from "./LinearSearch";
import BinarySearch from "./BinarySearch";
import Canvas from "./Canvas";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [input, setInput] = useState("");
  const [sorting, setSorting] = useState(false);
  const [stepDescription, setStepDescription] = useState("");
  const [arrayState, setArrayState] = useState("");
  const [details, setDetails] = useState({});
  const [sorted, setSorted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [searchTarget, setSearchTarget] = useState(null);
  const [searchStarted, setSearchStarted] = useState(false);

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
      setOriginalArray(parsedArray);
      setArrayState(parsedArray.join(", "));
      setSorting(false);
      setSorted(false);
      setStepDescription("");
      setDetails({});
      setSearchTarget(null);
      setSearchStarted(false);
    } else {
      alert("Please enter a valid array");
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAlgorithmClick = (alg) => {
    setSelectedAlgorithm(alg);
    if (alg !== "Linear Search" && alg !== "Binary Search") {
      setSearchTarget(null);
      setSearchStarted(false);
    }
  };

  const handleStartClick = async () => {
    if (!selectedAlgorithm) {
      alert("Please select an algorithm");
      return;
    }

    console.log("Starting algorithm:", selectedAlgorithm);
    setStepDescription("");
    setArrayState(array.join(", "));
    setSorting(true);

    try {
      if (selectedAlgorithm === "Bubble Sort") {
        console.log("Initial Array:", array);
        await bubbleSort(
          [...array],
          (newArray) => setArray([...newArray]),
          setStepDescription,
          setArrayState,
          sleep
        );
      } else if (selectedAlgorithm === "Insertion Sort") {
        console.log("Initial Array:", array);
        await insertionSort(
          [...array],
          (newArray) => setArray([...newArray]),
          setStepDescription,
          setArrayState,
          sleep
        );
      } else if (selectedAlgorithm === "Selection Sort") {
        console.log("Initial Array:", array);
        await selectionSort(
          [...array],
          (newArray) => setArray([...newArray]),
          setStepDescription,
          setArrayState,
          sleep
        );
      }
    } catch (error) {
      console.error("Error during sorting:", error);
    }

    // setDetails({
    // });
    setSorting(false);
    setSorted(true);
  };

  const handleLinearSearchClick = () => {
    if (searchTarget === null) {
      alert("Please enter a target value to search for");
      return;
    }
    setSearchStarted(true);
  };

  const handleBinarySearchClick = () => {
    if (searchTarget === null) {
      alert("Please enter a target value to search for");
      return;
    }
    setSearchStarted(true);
  };

  const handleSearchTargetChange = (event) => {
    setSearchTarget(Number(event.target.value));
  };

  const handleSearchComplete = (index) => {
    setSorting(false);
    setSearchStarted(false);
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
          <button
            className="button"
            onClick={() => handleAlgorithmClick("Linear Search")}
            disabled={sorting || array.length === 0}
          >
            Linear Search
          </button>
          <button
            className="button"
            onClick={() => handleAlgorithmClick("Binary Search")}
            disabled={sorting || array.length === 0}
          >
            Binary Search
          </button>
        </div>
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
          {selectedAlgorithm === "Linear Search" && (
            <div style={{ marginTop: "2%" }}>
              <input
                type="number"
                onChange={handleSearchTargetChange}
                placeholder="Search target"
                disabled={sorting}
              />
              <button
                onClick={handleLinearSearchClick}
                disabled={sorting || searchTarget === null}
                id="start"
              >
                Start Search
              </button>
            </div>
          )}
          {selectedAlgorithm === "Binary Search" && (
            <div style={{ marginTop: "2%" }}>
              <input
                type="number"
                onChange={handleSearchTargetChange}
                placeholder="Search target"
                disabled={sorting}
              />
              <button
                onClick={handleBinarySearchClick}
                disabled={sorting || searchTarget === null}
                id="start"
              >
                Start Search
              </button>
            </div>
          )}
          {selectedAlgorithm !== "Linear Search" &&
            selectedAlgorithm !== "Binary Search" && (
              <button
                onClick={handleStartClick}
                disabled={
                  sorting || array.length === 0 || !selectedAlgorithm || sorted
                }
                id="start"
              >
                Start
              </button>
            )}
        </form>

        {array.length > 0 ? (
          selectedAlgorithm === "Linear Search" ? (
            <LinearSearch
              array={originalArray}
              target={searchTarget}
              onComplete={handleSearchComplete}
              searchStarted={searchStarted}
              selectedAlgorithm={selectedAlgorithm}
            />
          ) : selectedAlgorithm === "Binary Search" ? (
            <BinarySearch
              array={originalArray}
              target={searchTarget}
              onComplete={handleSearchComplete}
              searchStarted={searchStarted}
              selectedAlgorithm={selectedAlgorithm}
            />
          ) : selectedAlgorithm ? (
            <>
              <Canvas array={array} sorted={sorted} sorting={sorting} />
              <div className="array-state">
                {array.map((value, index) => (
                  <div key={index} className={"array-element"}>
                    {value}
                  </div>
                ))}
              </div>
              <div className="step-description">{stepDescription}</div>
              <h3>Selected Algorithm : {selectedAlgorithm}</h3>
            </>
          ) : (
            <div className="no-algorithm-message">
              Please select an algorithm to visualize the process.
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
