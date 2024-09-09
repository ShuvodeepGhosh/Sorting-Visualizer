export const bubbleSort = async (
  array,
  setArray,
  setStepDescription,
  setArrayState,
  sleep
) => {
  const arr = [...array];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setStepDescription(`Swapped ${arr[j]} and ${arr[j + 1]}`);
        setArrayState(arr.join(", "));
        setArray([...arr]);
        await sleep(500);
      }
    }
  }
  setStepDescription("Sorting completed.");
};
