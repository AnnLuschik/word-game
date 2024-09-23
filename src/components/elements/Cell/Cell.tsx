import clsx from 'clsx';
import styles from './Cell.module.css';

interface CellProps {
  letter?: string;
  isGuessed?: boolean;
  variant?: 'hidden' | 'input';
}

export const Cell = ({
  letter,
  isGuessed = false,
  variant = 'hidden',
}: CellProps) => {
  const isInput = variant === 'input';
  const showLetter = isGuessed || isInput;

  return (
    <div
      className={clsx(styles.cell, {
        [styles.inputCell]: isInput,
        [styles.hiddenCell]: isGuessed && !isInput,
      })}
    >
      {showLetter ? letter : ''}
    </div>
  );
};
