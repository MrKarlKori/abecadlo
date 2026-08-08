import { useState, useEffect } from 'react';
import { LanguageId } from '../types';

export interface LessonModulesProgress {
  unlockedModules: string[];
  moduleSessions: Record<string, number>;
}

const EVENT_NAME = 'abecadlo_exercises_progress_updated';

const getInitialProgress = (langId: string): LessonModulesProgress => {
  const STORAGE_KEY = `abecadlo_exercises_progress_${langId}`;
  
  // Migration for legacy progress (which was saved globally without langId)
  if (langId === LanguageId.RUSSIAN) {
    const legacySaved = localStorage.getItem('abecadlo_exercises_progress');
    if (legacySaved && !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, legacySaved);
      localStorage.removeItem('abecadlo_exercises_progress');
    }
  }

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
        moduleSessions: parsed.moduleSessions || {}
      };
    } catch {
      return { unlockedModules: ['module-1'], moduleSessions: {} };
    }
  }
  return { unlockedModules: ['module-1'], moduleSessions: {} };
};

export function useExercisesProgress(langId: string = LanguageId.BELARUSIAN) {
  const STORAGE_KEY = `abecadlo_exercises_progress_${langId}`;
  const [progress, setProgress] = useState<LessonModulesProgress>(() => getInitialProgress(langId));

  useEffect(() => {
    setProgress(getInitialProgress(langId));
  }, [langId]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      if ((e as StorageEvent).key === STORAGE_KEY || e.type === EVENT_NAME) {
        setProgress(getInitialProgress(langId));
      }
    };

    window.addEventListener(EVENT_NAME, handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener(EVENT_NAME, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [langId, STORAGE_KEY]);

  const saveProgress = (newProgress: LessonModulesProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    setProgress(newProgress);
    window.dispatchEvent(new Event(EVENT_NAME));
  };

  const recordCompletedSession = (moduleId: string) => {
    const current = getInitialProgress(langId);
    const currentSessions = current.moduleSessions[moduleId] || 0;
    const newSessions = Math.min(10, currentSessions + 1);

    const updatedSessions = {
      ...current.moduleSessions,
      [moduleId]: newSessions
    };

    let updatedUnlocked = [...current.unlockedModules];

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
    const current = getInitialProgress(langId);
    const updatedSessions = {
      ...current.moduleSessions,
      [moduleId]: validSessions
    };

    let updatedUnlocked = [...current.unlockedModules];
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
    const current = getInitialProgress(langId);
    if (!current.unlockedModules.includes(moduleId)) {
      saveProgress({
        ...current,
        unlockedModules: [...current.unlockedModules, moduleId]
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
