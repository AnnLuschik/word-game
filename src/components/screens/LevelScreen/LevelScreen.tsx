import { LetterBoard } from '@/components/modules/LetterBoard';
import { Word } from '@/components/modules/Word';
import { useLevelData } from '@/hooks/useLevelData';
import { getMinimalLetters } from '@/utils/getMinimalLetters';
import styles from './LevelScreen.module.css';

interface LevelScreenProps {
  level: number;
}

export const LevelScreen = ({ level }: LevelScreenProps) => {
  const getLevelForFetch = (level: number) => ((level - 1) % 3) + 1;
  const { data, error, loading } = useLevelData(getLevelForFetch(level));

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!data || !data?.words?.length) {
    return <div className={styles.emptyState}>Нет данных для отображения.</div>;
  }
  const { words } = data;
  const letters = getMinimalLetters(words);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Уровень {level}</h1>
      <div className={styles.wordsContainer}>
        {words.map((word) => (
          <Word word={word} isGuessed={false} />
        ))}
      </div>
      <LetterBoard letters={letters} />
    </div>
  );
};
