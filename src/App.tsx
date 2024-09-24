import { useCallback, useEffect, useState } from 'react';
import useLockBodyScroll from 'react-use/lib/useLockBodyScroll';
import { LevelScreen } from '@/components/screens/LevelScreen';
import { SuccessScreen } from './components/screens/SuccessScreen';
import { Button } from './components/elements/Button';
import { useLevelData } from '@/hooks/useLevelData';
import './App.css';

const getLevelForFetch = (level: number) => ((level - 1) % 3) + 1;

function App() {
  const [currentLevel, setCurrentLevel] = useState<number>(() => {
    const savedLevel = localStorage.getItem('currentLevel');
    return savedLevel ? parseInt(savedLevel, 10) : 1;
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [isActiveTab, setIsActiveTab] = useState<boolean>(true);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  useLockBodyScroll(isDialogVisible && !isActiveTab);

  const setTabActive = useCallback(() => {
    const now = Date.now();
    localStorage.setItem('lastActiveTab', String(now));
  }, []);

  const reloadPage = () => window.location.reload();

  useEffect(() => {
    const lastActiveTab = localStorage.getItem('lastActiveTab');
    const now = Date.now();

    if (lastActiveTab && parseInt(lastActiveTab, 10) > now) {
      setIsActiveTab(false);
      setIsDialogVisible(true);
    } else {
      setTabActive();
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'lastActiveTab') {
        const timestamp = parseInt(event.newValue || '', 10);
        if (timestamp > now) {
          setIsActiveTab(false);
          setIsDialogVisible(true);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [setTabActive]);

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
      {isDialogVisible && !isActiveTab && (
        <div className='overlay'>
          <div className='dialog'>
            <p>
              Похоже, игра открыта в нескольких вкладках браузера. Чтобы
              продолжить играть в этой вкладке, обновите страницу.
            </p>
            <Button onClick={reloadPage}>Обновить</Button>
          </div>
        </div>
      )}

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
