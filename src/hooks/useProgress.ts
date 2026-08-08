import { useState, useEffect } from 'react';
import type { AppState, ProgressState } from '../types';
import { LanguageId } from '../types';

const STORAGE_KEY = 'alphabet-explorer-state';

const DEFAULT_STATE: AppState = {
  version: 2,
  activeLanguage: LanguageId.BELARUSIAN,
  progress: {}
};

const DEFAULT_PROGRESS: ProgressState = {
  completedLetters: [],
  quizHighScore: 0
};

export function useProgress(langId: string) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse state from localStorage', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const progress = state.progress[langId] || DEFAULT_PROGRESS;

  const markCompleted = (letterId: string) => {
    setState(prev => {
      const langProgress = prev.progress[langId] || { ...DEFAULT_PROGRESS };
      if (langProgress.completedLetters.includes(letterId)) {
        return prev;
      }
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [langId]: {
            ...langProgress,
            completedLetters: [...langProgress.completedLetters, letterId]
          }
        }
      };
    });
  };

  const toggleCompleted = (letterId: string) => {
    setState(prev => {
      const langProgress = prev.progress[langId] || { ...DEFAULT_PROGRESS };
      const isCompleted = langProgress.completedLetters.includes(letterId);
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [langId]: {
            ...langProgress,
            completedLetters: isCompleted 
              ? langProgress.completedLetters.filter(id => id !== letterId)
              : [...langProgress.completedLetters, letterId]
          }
        }
      };
    });
  };

  const updateQuizScore = (score: number) => {
    setState(prev => {
      const langProgress = prev.progress[langId] || { ...DEFAULT_PROGRESS };
      if (score <= langProgress.quizHighScore) {
        return prev;
      }
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [langId]: {
            ...langProgress,
            quizHighScore: score
          }
        }
      };
    });
  };

  const clearAllData = () => {
    setState(DEFAULT_STATE);
  };
  
  const completeAll = (letterIds: string[]) => {
    setState(prev => {
      const langProgress = prev.progress[langId] || { ...DEFAULT_PROGRESS };
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [langId]: {
            ...langProgress,
            completedLetters: [...letterIds]
          }
        }
      };
    });
  };

  return {
    progress,
    markCompleted,
    toggleCompleted,
    updateQuizScore,
    clearAllData,
    completeAll
  };
}
