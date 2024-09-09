export const insertionSort = async (
  array,
  setArray,
  setStepDescription,
  setArrayState,
  sleep
) => {
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      setStepDescription(`Moved ${arr[j]} to position ${j + 1}`);
      setArrayState(arr.join(", "));
      setArray([...arr]);
      j--;
      await sleep(1000);
    }
    arr[j + 1] = key;
    setStepDescription(`Inserted ${key} at position ${j + 1}`);
    setArrayState(arr.join(", "));
    setArray([...arr]);
    await sleep(500);
  }
  setStepDescription("Sorting completed.");
};
