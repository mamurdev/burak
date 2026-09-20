// MITASK-L
function reverseSentence(sentence: string): string {
    let words: string[] = sentence.split(' ');
    let reversedWords: string[] = words.map((item: string) => {
        return item.split('').reverse().join('')
    })
    let stringify: string = reversedWords.join(' ')
    return stringify;
}

// console.log(reverseSentence("hi there"));