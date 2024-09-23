import { shuffleArray } from './shuffleArray';

type LetterCount = { [key: string]: number };

export function getMinimalLetters(words: string[]): string[] {
  const maxLetterCount: LetterCount = {};

  const countLettersInWord = (word: string): LetterCount => {
    const letterCount: LetterCount = {};
    for (const letter of word) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }
    return letterCount;
  };

  words.forEach((word) => {
    const currentLetterCount = countLettersInWord(word);
    for (const letter in currentLetterCount) {
      maxLetterCount[letter] = Math.max(
        maxLetterCount[letter] || 0,
        currentLetterCount[letter]
      );
    }
  });

  const minimalLetters = Object.entries(maxLetterCount).flatMap(
    ([letter, count]) => Array(count).fill(letter)
  );

  return shuffleArray(minimalLetters);
}
