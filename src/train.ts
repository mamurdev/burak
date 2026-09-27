import { number } from "@elevenlabs/elevenlabs-js/core/schemas";

// MITASK-O
function calculateSumOfNumbers(arr: any[]): number {
  let sum: number = 0;
  for(let i = 0; i < arr.length; i++) {
    if(typeof arr[i] === "number") {
      sum += arr[i];
    }
  }

  return sum;
}

console.log(calculateSumOfNumbers(["20", 20, {son: 20}, true, 42]));


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
