// MITASK-Y
function findIntersection(a: number[], b: number[]): number[] {
  return a.filter((num) => b.includes(num));
}

console.log(findIntersection([1, 2, 3], [3, 2, 0]));

// MITASK-X
function countOccurrences(obj: { [key: string]: any }, name: string): number {
  let count = 0;
  console.log("object keys", Object.keys(obj)); 
  for (const key of Object.keys(obj)) {
    if (key === name) {
      count += 1;
    }
    const value = obj[key];
    console.log("value:", value);
    console.log("key:", key);
    if (typeof value === "object" && value !== null) {
      count += countOccurrences(value, name);
    }
  }
  return count;
}
// console.log(countOccurrences({ model: "A", s: { model: "B" } }, "model"));

// MITASK-W
function chunkArray(arr: number[], size: number): number[][] {
  if (size <= 0) return [];
  let result: number[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    const slice = arr.slice(i, i + size);
    result.push(slice);
  }
  return result;
}
// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));

// MITASK-V
function countChars(str: string): { [key: string]: number } {
  const counts: { [key: string]: number } = {};

  for (let i = 0; i < str.length; i++) {
    const char: string = str[i];
    counts[char] = (counts[char] || 0) + 1;
  }

  return counts;
}

// console.log(countChars("hello"));

// MITASK-T
function mergeSortedArrays(a: number[], b: number[]): number[] {
  return [...a, ...b].sort((x, y) => x - y);
}
// console.log(mergeSortedArrays([4, 2, 10], [9, 7, 5]));

// MITASK-S
function missingNumber(arr: number[]): number {
  const n: number = arr.length;
  const expectedSum: number = (n * (n + 1)) / 2;

  let actualSum: number = 0;
  for (let i = 0; i < arr.length; i++) {
    actualSum += arr[i];
  }

  return expectedSum - actualSum;
}

// console.log(missingNumber([3, 0, 1]));

// MITASK-R
function calculate(str: string): number {
  let parts: string[] = str.split(" "),
    num1 = Number(parts[0]),
    operator = parts[1],
    num2 = Number(parts[2]);
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    default:
      return num1 / num2;
  }
}
// console.log(calculate("3 / 3"));

// MITASK-Q
interface hasPropertyInt {
  [key: string]: any;
}
function hasProperty(obj: hasPropertyInt, propName: string): boolean {
  if (propName in obj) {
    return true;
  } else return false;
}
// console.log(hasProperty({age: 25}, "age"));

// MITASK-P
interface NumberObject {
  [key: string]: number;
}

function objectToArray(obj: NumberObject): [string, number][] {
  let keys: string[] = Object.keys(obj);
  let key: [string, number][] = keys.map((key: string) => {
    return [key, obj[key]];
  });
  return key;
}
// console.log(objectToArray({a: 10, b: 20}));

// MITASK-O
function calculateSumOfNumbers(arr: any[]): number {
  let sum: number = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") {
      sum += arr[i];
    }
  }

  return sum;
}

// console.log(calculateSumOfNumbers(["20", 20, {son: 20}, true, 42]));

// MITASK-N
const palindrome = (str: string): any => {
  let reversed: string = str.split("").reverse().join("");
  if (str === reversed) {
    return true;
  } else return false;
};
// console.log(palindrome("dad"));

// MITASK-M
interface SquareResult {
  number: number;
  square: number;
}

function getSquareNumbers(arr: number[]): SquareResult[] {
  let arrNums: SquareResult[] = arr.map((num: number) => {
    return { number: num, square: num * num };
  });
  return arrNums;
}

// console.log(getSquareNumbers([4, 5]));

// MITASK-L
function reverseSentence(sentence: string): string {
  let words: string[] = sentence.split(" ");
  let reversedWords: string[] = words.map((item: string) => {
    return item.split("").reverse().join("");
  });
  let stringify: string = reversedWords.join(" ");
  return stringify;
}

// console.log(reverseSentence("hi there"));
