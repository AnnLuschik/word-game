import { Cell } from '@/components/elements/Cell';
import styles from './Word.module.css';

interface HiddenWordProps {
  word: string;
  isGuessed: boolean;
}

export const Word = ({ word, isGuessed }: HiddenWordProps) => {
  return (
    <div className={styles.wrapper}>
      {[...word].map((letter, index) => (
        <Cell key={index} letter={letter} isGuessed={isGuessed} />
      ))}
    </div>
  );
};
