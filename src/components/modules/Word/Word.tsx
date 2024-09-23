import { Cell } from '@/components/elements/Cell';
import styles from './Word.module.css';

interface WordProps {
  word: string;
  isGuessed?: boolean;
  variant?: 'hidden' | 'input';
}

export const Word = ({
  word,
  isGuessed = false,
  variant = 'hidden',
}: WordProps) => {
  return (
    <div className={styles.wrapper}>
      {[...word].map((letter, index) => (
        <Cell
          key={index}
          letter={letter}
          isGuessed={isGuessed}
          variant={variant}
        />
      ))}
    </div>
  );
};
