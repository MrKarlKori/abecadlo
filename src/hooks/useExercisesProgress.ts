import { useState, useEffect } from 'react';

export interface LessonModulesProgress {
  unlockedModules: string[];
  moduleSessions: Record<string, number>;
}

const STORAGE_KEY = 'abecadlo_exercises_progress';
const EVENT_NAME = 'abecadlo_exercises_progress_updated';

const getInitialProgress = (): LessonModulesProgress => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.moduleProgress && !parsed.moduleSessions) {
        const moduleSessions: Record<string, number> = {};
        Object.keys(parsed.moduleProgress).forEach(id => {
          const pct = parsed.moduleProgress[id];
          moduleSessions[id] = pct >= 100 ? 10 : Math.floor((pct / 100) * 10);
        });
        return {
          unlockedModules: parsed.unlockedModules || ['module-1'],
          moduleSessions,
        };
      }
      return {
        unlockedModules: parsed.unlockedModules || ['module-1'],
        moduleSessions: parsed.moduleSessions || { 'module-1': 0 },
      };
    } catch (e) {
      console.error('Failed to parse exercises progress', e);
    }
  }
  return {
    unlockedModules: ['module-1'],
    moduleSessions: { 'module-1': 0 },
  };
};

export function useExercisesProgress() {
  const [progress, setProgress] = useState<LessonModulesProgress>(getInitialProgress);

  useEffect(() => {
    const handleSync = () => {
      setProgress(getInitialProgress());
    };

    window.addEventListener(EVENT_NAME, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(EVENT_NAME, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const saveProgress = (newProgress: LessonModulesProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    setProgress(newProgress);
    window.dispatchEvent(new Event(EVENT_NAME));
  };

  const recordCompletedSession = (moduleId: string) => {
    const currentSessions = progress.moduleSessions[moduleId] || 0;
    const newSessions = Math.min(10, currentSessions + 1);

    const updatedSessions = {
      ...progress.moduleSessions,
      [moduleId]: newSessions
    };

    let updatedUnlocked = [...progress.unlockedModules];

    if (newSessions >= 10) {
      const allModuleIds = ['module-1', 'module-2', 'module-3', 'module-4'];
      const currentIndex = allModuleIds.indexOf(moduleId);
      if (currentIndex !== -1 && currentIndex < allModuleIds.length - 1) {
        const nextModuleId = allModuleIds[currentIndex + 1];
        if (!updatedUnlocked.includes(nextModuleId)) {
          updatedUnlocked.push(nextModuleId);
        }
      }
    }

    saveProgress({
      unlockedModules: updatedUnlocked,
      moduleSessions: updatedSessions
    });
  };

  const setModuleSessions = (moduleId: string, sessions: number) => {
    const validSessions = Math.max(0, Math.min(10, sessions));
    const updatedSessions = {
      ...progress.moduleSessions,
      [moduleId]: validSessions
    };

    let updatedUnlocked = [...progress.unlockedModules];
    const allModuleIds = ['module-1', 'module-2', 'module-3', 'module-4'];

    allModuleIds.forEach((mId, idx) => {
      if (idx > 0) {
        const prevModuleId = allModuleIds[idx - 1];
        const prevSessions = updatedSessions[prevModuleId] || 0;
        if (prevSessions >= 10 && !updatedUnlocked.includes(mId)) {
          updatedUnlocked.push(mId);
        }
      }
    });

    saveProgress({
      unlockedModules: updatedUnlocked,
      moduleSessions: updatedSessions
    });
  };

  const unlockModule = (moduleId: string) => {
    if (!progress.unlockedModules.includes(moduleId)) {
      saveProgress({
        ...progress,
        unlockedModules: [...progress.unlockedModules, moduleId]
      });
    }
  };

  const resetProgress = () => {
    saveProgress({
      unlockedModules: ['module-1'],
      moduleSessions: { 'module-1': 0 }
    });
  };

  return {
    progress,
    recordCompletedSession,
    setModuleSessions,
    unlockModule,
    resetProgress
  };
}
