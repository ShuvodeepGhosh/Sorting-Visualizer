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
