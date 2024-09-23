import React, { useState, useEffect } from 'react';
import useMedia from 'react-use/lib/useMedia';
import { LetterButton } from '@/components/elements/LetterButton';
import { calculatePosition } from '@/utils/circleUtils';
import styles from './LetterBoard.module.css';

interface LetterBoardProps {
  letters: string[];
  handleGuessWord: (v: string) => void;
  handleWordInput: (v: string) => void;
}

export const LetterBoard = ({
  letters,
  handleGuessWord,
  handleWordInput,
}: LetterBoardProps) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);

  const numLetters = letters.length;

  const isMobile = useMedia('(max-width: 480px)');
  const isSmallVariant = isMobile || numLetters > 7;

  const circleRadius = numLetters > 9 || !isMobile ? 134 : 100;

  const activeWord = selectedLetters.map((i) => letters[i]).join('');

  const handleStartSelection = (index: number) => {
    if (!selectedLetters.length) {
      setIsSelecting(true);
      setSelectedLetters([index]);
    }
  };

  const handleContinueSelection = (index: number) => {
    if (isSelecting) {
      setSelectedLetters((prevSelectedLetters) => {
        // Check if the current index is the one previously selected
        const prevSelectedIndex =
          prevSelectedLetters[prevSelectedLetters.length - 2];

        if (prevSelectedLetters.length > 1 && prevSelectedIndex === index) {
          // Remove the last selected letter
          return prevSelectedLetters.slice(0, -1);
        }

        // Check if the letter is already selected
        const isAlreadySelected = prevSelectedLetters.includes(index);

        if (!isAlreadySelected) {
          // Add the new letter to the selection
          return [...prevSelectedLetters, index];
        }

        return prevSelectedLetters;
      });
    }
  };

  const handleEndSelection = () => {
    setIsSelecting(false);
    handleGuessWord(activeWord);
    setSelectedLetters([]);
  };

  useEffect(() => {
    handleWordInput(activeWord);
  }, [activeWord, handleWordInput]);

  return (
    <div className={styles.wrapper} onMouseUp={handleEndSelection}>
      <div
        style={
          {
            '--radius': `${circleRadius}px`,
            '--size': isSmallVariant ? '12px' : '24px',
          } as React.CSSProperties
        }
        className={styles.circle}
      />
      {letters.map((letter, index) => {
        const { x, y } = calculatePosition(index, numLetters, circleRadius);

        return (
          <div
            key={index}
            className={styles.letterWrapper}
            onMouseDown={() => handleStartSelection(index)}
            onMouseEnter={() => handleContinueSelection(index)}
            style={
              {
                '--x': `${x}px`,
                '--y': `${y}px`,
              } as React.CSSProperties
            }
          >
            <LetterButton
              letter={letter}
              isActive={selectedLetters.includes(index)}
              isSmall={isSmallVariant}
              onClick={() => ({})}
            />
          </div>
        );
      })}
    </div>
  );
};
