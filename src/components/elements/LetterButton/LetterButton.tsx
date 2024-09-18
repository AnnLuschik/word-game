import styles from './LetterButton.module.css';

interface LetterButtonProps {
  letter: string;
  isActive: boolean;
  isSmall?: boolean;
  onClick: () => void;
}

export const LetterButton = ({
  letter,
  isActive,
  isSmall,
  onClick,
}: LetterButtonProps) => {
  return (
    <div className={styles.wrapper} data-small={isSmall}>
      <button
        onClick={onClick}
        className={styles.button}
        data-selected={isActive}
      >
        {letter}
      </button>
    </div>
  );
};
