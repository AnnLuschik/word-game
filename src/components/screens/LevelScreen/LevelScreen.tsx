import { LetterBoard } from '@/components/modules/LetterBoard';
import { useLevelData } from '@/hooks/useLevelData';
import styles from './LevelScreen.module.css';
import { getMinimalLetters } from '@/utils/getMinimalLetters';

interface LevelScreenProps {
  level: number;
}

export const LevelScreen = ({ level }: LevelScreenProps) => {
  const { data, error, loading } = useLevelData(level);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!data || !data?.words?.length) {
    return <div className={styles.emptyState}>Нет данных для отображения.</div>;
  }

  const letters = getMinimalLetters(data.words);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Уровень {level}</h1>
      <LetterBoard letters={letters} />
    </div>
  );
};
