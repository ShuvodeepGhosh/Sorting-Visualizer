export const linearSearch = async (array, target, setArrayState, sleep) => {
  for (let i = 0; i < array.length; i++) {
    setArrayState(`Comparing ${target} with ${array[i]}`);
    if (array[i] === target) {
      setArrayState(`Found ${target} at index ${i}`);
      return i;
    }
    await sleep(500);
  }
  setArrayState(`Target ${target} not found`);
  return -1;
};

export const linearSearchDetails = {
  name: "Linear Search",
  description:
    "Linear Search is a simple search algorithm that checks every element in the array sequentially until the target element is found or the end of the array is reached.",
  bestCase: "O(1) - Target found at the first position",
  worstCase: "O(n) - Target not found or found at the last position",
  averageCase: "O(n) - Target found on average in the middle",
};
