export const selectionSortDetails = {
  name: "Selection Sort",
  description:
    "Selection Sort repeatedly finds the minimum element from the unsorted part and puts it at the beginning.",
  bestCase: "O(n^2)",
  worstCase: "O(n^2)",
  averageCase: "O(n^2)",
};

export const selectionSort = async (
  array,
  setArray,
  setStepDescription,
  setArrayState,
  sleep
) => {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setStepDescription(`Swapped ${arr[i]} and ${arr[minIndex]}`);
      setArrayState(arr.join(", "));
      setArray([...arr]);
      await sleep(2000);
    }
  }
  setStepDescription("Sorting completed.");
};
