import { useEffect, useState } from 'react';

type LevelData = Record<'words', string[]>;

export const useLevelData = (level: number) => {
  const [data, setData] = useState<LevelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        const response = await fetch(`data/levels/${level}.json`);
        if (!response.ok) {
          throw new Error(`Не удалось загрузить уровень ${level}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLevelData();
  }, [level]);

  return { data, error, loading };
};
