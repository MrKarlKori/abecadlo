import { useState, useEffect } from 'react';

export interface ExerciseProgress {
  unlockedModules: string[];
  moduleProgress: Record<string, number>; // moduleId -> progress percentage (0-100)
}

const STORAGE_KEY = 'abecadlo_exercises_progress';

export function useExercisesProgress() {
  const [progress, setProgress] = useState<ExerciseProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse exercises progress', e);
      }
    }
    return {
      unlockedModules: ['module-1'], // Initially only the first module is unlocked
      moduleProgress: {},
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateModuleProgress = (moduleId: string, percentage: number) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      newProgress.moduleProgress = {
        ...newProgress.moduleProgress,
        [moduleId]: percentage
      };

      // If completed, unlock the next module
      if (percentage >= 100) {
        // Find next module logic could be here, or we pass a separate unlock action
        const moduleIds = ['module-1', 'module-2', 'module-3', 'module-4'];
        const currentIndex = moduleIds.indexOf(moduleId);
        if (currentIndex !== -1 && currentIndex < moduleIds.length - 1) {
          const nextModule = moduleIds[currentIndex + 1];
          if (!newProgress.unlockedModules.includes(nextModule)) {
            newProgress.unlockedModules = [...newProgress.unlockedModules, nextModule];
          }
        }
      }

      return newProgress;
    });
  };

  const unlockModule = (moduleId: string) => {
    setProgress(prev => {
      if (!prev.unlockedModules.includes(moduleId)) {
        return {
          ...prev,
          unlockedModules: [...prev.unlockedModules, moduleId]
        };
      }
      return prev;
    });
  };
  
  const resetProgress = () => {
    setProgress({
      unlockedModules: ['module-1'],
      moduleProgress: {}
    });
  };

  return {
    progress,
    updateModuleProgress,
    unlockModule,
    resetProgress
  };
}
