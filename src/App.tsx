import { useState } from 'react';
import { LevelScreen } from '@/components/screens/LevelScreen';
import { useLevelData } from '@/hooks/useLevelData';
import './App.css';

const getLevelForFetch = (level: number) => ((level - 1) % 3) + 1;

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
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

  return (
    <div className='App'>
      {success ? (
        <div>Success</div>
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
