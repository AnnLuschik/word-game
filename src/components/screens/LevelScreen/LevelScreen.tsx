import { useState, useMemo } from 'react';
import { LetterBoard } from '@/components/modules/LetterBoard';
import { Word } from '@/components/modules/Word';
import { getMinimalLetters } from '@/utils/getMinimalLetters';
import styles from './LevelScreen.module.css';

interface LevelScreenProps {
  level: number;
  words: string[];
  onSuccess: (v: boolean) => void;
}

export const LevelScreen = ({ level, words, onSuccess }: LevelScreenProps) => {
  const [guessedWords, setGuessedWords] = useState<string[]>([]);

  const letters = useMemo(() => getMinimalLetters(words), [words]);

  const handleGuessWord = (word: string) => {
    if (words.includes(word)) {
      setGuessedWords((prev) => [...prev, word]);
    }
  };

  if (guessedWords.length === words.length) {
    setTimeout(() => {
      onSuccess(true);
    }, 1000);
  }

  const sortedWords = useMemo(
    () => words.sort((a, b) => a.length - b.length),
    [words]
  );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Уровень {level}</h1>
      <div className={styles.wordsContainer}>
        {sortedWords.map((word) => (
          <Word
            key={word}
            word={word}
            isGuessed={guessedWords.includes(word)}
          />
        ))}
      </div>
      <LetterBoard letters={letters} handleGuessWord={handleGuessWord} />
    </div>
  );
};
