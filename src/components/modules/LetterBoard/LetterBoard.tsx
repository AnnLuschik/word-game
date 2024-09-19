import React from 'react';
import useMedia from 'react-use/lib/useMedia';
import { LetterButton } from '@/components/elements/LetterButton';
import { calculatePosition } from '@/utils/circleUtils';
import styles from './LetterBoard.module.css';

interface LetterBoardProps {
  letters: string[];
}

export const LetterBoard = ({ letters }: LetterBoardProps) => {
  const numLetters = letters.length;

  const isMobile = useMedia('(max-width: 480px)');
  const isSmallVariant = isMobile || numLetters > 7;

  const circleRadius = numLetters > 9 || !isMobile ? 134 : 100;

  return (
    <div className={styles.wrapper}>
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
            style={
              {
                '--x': `${x}px`,
                '--y': `${y}px`,
              } as React.CSSProperties
            }
          >
            <LetterButton
              letter={letter}
              isActive={true}
              isSmall={isSmallVariant}
              onClick={() => ({})}
            />
          </div>
        );
      })}
    </div>
  );
};
