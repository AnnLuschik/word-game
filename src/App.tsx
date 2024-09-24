import { useState } from 'react';
import { LevelScreen } from '@/components/screens/LevelScreen';
import { SuccessScreen } from './components/screens/SuccessScreen';
import { useLevelData } from '@/hooks/useLevelData';
import './App.css';

const getLevelForFetch = (level: number) => ((level - 1) % 3) + 1;

function App() {
  const [currentLevel, setCurrentLevel] = useState<number>(() => {
    const savedLevel = localStorage.getItem('currentLevel');
    return savedLevel ? parseInt(savedLevel, 10) : 1;
  });
  const [success, setSuccess] = useState<boolean>(false);

  const { data, error, loading } = useLevelData(getLevelForFetch(currentLevel));

  if (loading) {
    return <div className='loading'>Загрузка...</div>;
  }

  if (error) {
    return <div className='error'>Ошибка: {error}</div>;
  }

  if (!data || !data?.words?.length) {
    return <div className='noData'>Нет данных для отображения.</div>;
  }

  const openNewLevel = () => {
    const nextLevel = currentLevel + 1;
    setCurrentLevel(nextLevel);
    setSuccess(false);
    localStorage.setItem('currentLevel', String(nextLevel));
    localStorage.removeItem('savedWords');
  };

  return (
    <div className='App'>
      {success ? (
        <SuccessScreen level={currentLevel} onClick={openNewLevel} />
      ) : (
        <LevelScreen
          level={currentLevel}
          words={data.words}
          onSuccess={setSuccess}
        />
      )}
    </div>
  );
}

export default App;
