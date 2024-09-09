import React, { useState } from "react";
import styled from "styled-components";
import { bubbleSort, bubbleSortDetails } from "./Algorithms/BubbleSort";
import {
  insertionSort,
  insertionSortDetails,
} from "./Algorithms/InsertionSort";
import {
  selectionSort,
  selectionSortDetails,
} from "./Algorithms/SelectionSort";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  height: 350px;
  width: 100%;
  border: 1px solid #ccc;
  background: #36454f;
  position: relative;
  margin-top: 1%;
  border: none;
`;

const Bar = styled.div`
  width: 15px;
  background: ${(props) =>
    props.isSorted ? "#2ecc71" : props.sorting ? "#e74c3c" : "#3498db"};
  margin: 0 5px;
  position: relative;
`;

const ValueLabel = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: #fff;
  font-weight: 600;
`;

const Controls = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
`;

const StepDescription = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ArrayState = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #333;
`;

const NoArrayMessage = styled.div`
  font-size: 18px;
  color: #999;
  text-align: center;
  margin-top: 20px;
`;

const NoAlgorithmMessage = styled.div`
  font-size: 18px;
  color: #999;
  text-align: center;
  margin-top: 20px;
`;

const AlgorithmDetails = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #555;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #2c3e50;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  color: #fff;
  text-align: center;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

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
    <Layout>
      <Sidebar>
        <h3>Sorting Visualizer</h3>

        <Controls>
          <Button
            onClick={() => handleAlgorithmClick("Bubble Sort")}
            disabled={sorting || array.length === 0}
          >
            Bubble Sort
          </Button>
          <Button
            onClick={() => handleAlgorithmClick("Insertion Sort")}
            disabled={sorting || array.length === 0}
          >
            Insertion Sort
          </Button>
          <Button
            onClick={() => handleAlgorithmClick("Selection Sort")}
            disabled={sorting || array.length === 0}
          >
            Selection Sort
          </Button>
          <Button disabled>Merge Sort</Button>
          <Button disabled>Quick Sort</Button>
          <Button disabled>Heap Sort</Button>
        </Controls>

        <h3>Searching Visualizer</h3>

        <Controls>
          <Button disabled>Linear Search</Button>
          <Button disabled>Binary Search</Button>
        </Controls>

        {/* Algorithm Details Section (uncomment to use) */}
        {/* <AlgorithmDetails>
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
        </AlgorithmDetails> */}
      </Sidebar>
      <MainContent>
        <form onSubmit={handleSubmit}>
          <Input
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
              <Container>
                {array.map((value, index) => (
                  <Bar
                    key={index}
                    style={{
                      height: `${value}px`,
                    }}
                    isSorted={sorted}
                    sorting={sorting}
                  >
                    <ValueLabel>{value}</ValueLabel>
                  </Bar>
                ))}
              </Container>
              <ArrayState style={{ color: "white" }}>
                [ {arrayState} ]
              </ArrayState>
              <StepDescription style={{ color: "#646cff" }}>
                {stepDescription}
              </StepDescription>
              <h3>Selected Algorithm : {selectedAlgorithm}</h3>
            </>
          ) : (
            <NoAlgorithmMessage>
              Please select an algorithm to visualize the sorting process.
            </NoAlgorithmMessage>
          )
        ) : (
          <NoArrayMessage>Please enter an array to get started.</NoArrayMessage>
        )}
      </MainContent>
    </Layout>
  );
};

export default SortingVisualizer;
