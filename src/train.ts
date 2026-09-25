// MITASK-N
const palindrome = (str: string): any => {
  let reversed: string = str.split("").reverse().join("");
  if (str === reversed) {
    return true;
  } else return false;
};
console.log(palindrome("dad"));

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
