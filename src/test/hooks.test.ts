import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgress } from '../hooks/useProgress';
import { useExercisesProgress } from '../hooks/useExercisesProgress';

describe('useProgress Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty completed letters and zero high score', () => {
    const { result } = renderHook(() => useProgress('ru'));
    expect(result.current.progress.completedLetters).toEqual([]);
    expect(result.current.progress.quizHighScore).toBe(0);
  });

  it('toggles letter completion correctly', () => {
    const { result } = renderHook(() => useProgress('ru'));
    
    act(() => {
      result.current.toggleCompleted('ru-char-1');
    });
    expect(result.current.progress.completedLetters).toContain('ru-char-1');

    act(() => {
      result.current.toggleCompleted('ru-char-1');
    });
    expect(result.current.progress.completedLetters).not.toContain('ru-char-1');
  });

  it('updates quiz high score when new score is higher', () => {
    const { result } = renderHook(() => useProgress('ru'));
    
    act(() => {
      result.current.updateQuizScore(8);
    });
    expect(result.current.progress.quizHighScore).toBe(8);

    act(() => {
      result.current.updateQuizScore(5);
    });
    expect(result.current.progress.quizHighScore).toBe(8);

    act(() => {
      result.current.updateQuizScore(10);
    });
    expect(result.current.progress.quizHighScore).toBe(10);
  });
});

describe('useExercisesProgress Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with module-1 unlocked and 0 sessions', () => {
    const { result } = renderHook(() => useExercisesProgress());
    expect(result.current.progress.unlockedModules).toContain('module-1');
    expect(result.current.progress.moduleSessions['module-1'] || 0).toBe(0);
  });

  it('increments session count and unlocks next module at 10 sessions', () => {
    const { result } = renderHook(() => useExercisesProgress());

    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.recordCompletedSession('module-1');
      }
    });

    expect(result.current.progress.moduleSessions['module-1']).toBe(10);
    expect(result.current.progress.unlockedModules).toContain('module-2');
  });

  it('allows manual session overrides in settings', () => {
    const { result } = renderHook(() => useExercisesProgress());

    act(() => {
      result.current.setModuleSessions('module-1', 10);
    });

    expect(result.current.progress.moduleSessions['module-1']).toBe(10);
    expect(result.current.progress.unlockedModules).toContain('module-2');
  });
});
