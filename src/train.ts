// MITASK-Q
interface hasPropertyInt {
  [key: string]: any;
}
function hasProperty(obj: hasPropertyInt, propName: string): boolean {
  if(propName in obj) {
    return true;
  } else return false;
}
console.log(hasProperty({age: 25}, "age"));

// MITASK-P
interface NumberObject {
  [key: string]: number;
}

function objectToArray(obj: NumberObject): [string, number][] {
  let keys: string[]  = Object.keys(obj)
  let key: [string, number][] = keys.map((key: string) => {
    return [key, obj[key]];
  }) 
  return key;
}
// console.log(objectToArray({a: 10, b: 20}));



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
