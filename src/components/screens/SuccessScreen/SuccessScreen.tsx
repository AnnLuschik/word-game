import { Button } from '@/components/elements/Button';
import styles from './SuccessScreen.module.css';

interface SuccessScreenProps {
  level: number;
  onClick: () => void;
}

export const SuccessScreen = ({ level, onClick }: SuccessScreenProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textBlock}>
        <p>Уровень {level} пройден</p>
        <p>
          <span>Изумительно!</span>
        </p>
      </div>

      <Button onClick={onClick}>{`Уровень ${level + 1}`}</Button>
    </div>
  );
};
