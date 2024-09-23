import styles from './Cell.module.css';

interface CellProps {
  letter?: string;
  isGuessed?: boolean;
}

export const Cell = ({ letter, isGuessed = false }: CellProps) => {
  return (
    <div className={styles.cell} data-guessed={isGuessed}>
      {isGuessed ? letter : ''}
    </div>
  );
};
