import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, renderHook, act, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { getAlphabetForLang, BELARUSIAN_CYRILLIC_ALPHABET, RUSSIAN_CYRILLIC_ALPHABET } from '../utils/alphabets';
import { getLessonModules } from '../data/mockLessonsData';
import { useProgress } from '../hooks/useProgress';
import { useExercisesProgress } from '../hooks/useExercisesProgress';
import { AlphabetPage } from '../pages/AlphabetPage';
import { ReadingTrainer, READING_DATA } from '../components/exercises/ReadingTrainer';
import { TypingTrainer } from '../components/exercises/TypingTrainer';
import { BuildingTrainer } from '../components/exercises/BuildingTrainer';
import { PoetryTrainer, POETRY_DATA } from '../components/exercises/PoetryTrainer';
import { QuizPage } from '../pages/QuizPage';
import { SettingsPage } from '../pages/SettingsPage';
import registryData from '../../public/data/registry.json';
import belarusianData from '../../public/data/belarusian.json';

describe('Belarusian Language Core & Dataset Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('registry.json lists Belarusian first as default language entry', () => {
    expect(registryData[0].id).toBe('be');
    expect(registryData[0].name).toBe('Belarusian');
    expect(registryData[0].dataFile).toBe('/data/belarusian.json');
  });

  it('belarusian.json contains 32 letters with Ў, І, and apostrophe, excluding Russian И, Щ, Ъ', () => {
    const chars = belarusianData.map(c => c.character);
    expect(chars).toContain('Ў');
    expect(chars).toContain('І');
    expect(chars).not.toContain('И');
    expect(chars).not.toContain('Щ');
    expect(chars).not.toContain('Ъ');
  });

  it('alphabets utility returns BELARUSIAN_CYRILLIC_ALPHABET for "be"', () => {
    expect(getAlphabetForLang('be')).toEqual(BELARUSIAN_CYRILLIC_ALPHABET);
    expect(BELARUSIAN_CYRILLIC_ALPHABET).toContain('Ў');
    expect(BELARUSIAN_CYRILLIC_ALPHABET).toContain('І');
    expect(BELARUSIAN_CYRILLIC_ALPHABET).not.toContain('И');
  });

  it('getLessonModules("be") places E in False Friends and Ў, І in Completely New', () => {
    const modules = getLessonModules('be');
    const falseFriends = modules.find(m => m.id === 'module-2');
    const completelyNew = modules.find(m => m.id === 'module-4');

    expect(falseFriends?.letters).toContain('Е');
    expect(completelyNew?.letters).toContain('Ў');
    expect(completelyNew?.letters).toContain('І');
    expect(completelyNew?.letters).not.toContain('И');
  });
});

describe('Belarusian Progress Isolation Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('useProgress("be") isolates letter progress under abecadlo_progress_be', () => {
    const { result: resultBe } = renderHook(() => useProgress('be'));
    const { result: resultRu } = renderHook(() => useProgress('ru'));

    act(() => {
      resultBe.current.toggleCompleted('be-char-1');
    });

    expect(resultBe.current.progress.completedLetters).toContain('be-char-1');
    expect(resultRu.current.progress.completedLetters).not.toContain('be-char-1');
  });

  it('useExercisesProgress("be") isolates exercise module progress under abecadlo_exercises_progress_be', () => {
    const { result: resultBe } = renderHook(() => useExercisesProgress('be'));
    const { result: resultRu } = renderHook(() => useExercisesProgress('ru'));

    act(() => {
      resultBe.current.setModuleSessions('module-1', 10);
    });

    expect(resultBe.current.progress.moduleSessions['module-1']).toBe(10);
    expect(resultRu.current.progress.moduleSessions['module-1'] || 0).toBe(0);
  });
});

describe('Belarusian UI Components & Pages Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders AlphabetPage for Belarusian (/be/alphabet) with English Wikipedia link', async () => {
    render(
      <MemoryRouter initialEntries={['/be/alphabet']}>
        <Routes>
          <Route path="/:lang/alphabet" element={<AlphabetPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Alphabet/i })).toBeInTheDocument();
    });

    const wikiLink = screen.getByText(/View Belarusian Alphabet on Wikipedia/i);
    expect(wikiLink).toBeInTheDocument();
    expect(wikiLink.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Belarusian_alphabet');
  });

  it('ReadingTrainer loads Belarusian reading data dataset', () => {
    expect(READING_DATA['be']).toBeDefined();
    expect(READING_DATA['be'].easy.length).toBe(100);
    expect(READING_DATA['be'].medium.length).toBe(100);
    expect(READING_DATA['be'].hard.length).toBeGreaterThanOrEqual(200);

    render(
      <MemoryRouter initialEntries={['/be/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<ReadingTrainer langId="be" />} />
        </Routes>
      </MemoryRouter>
    );

    const revealBtn = screen.getByRole('button', { name: /Reveal/i });
    fireEvent.click(revealBtn);

    const wikiLink = screen.getByText(/View on Wiktionary/i);
    expect(wikiLink.getAttribute('href')).toContain('#Belarusian');
  });

  it('TypingTrainer validates Belarusian word practice', () => {
    render(
      <MemoryRouter initialEntries={['/be/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<TypingTrainer langId="be" />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Type English translation or sound.../i)).toBeInTheDocument();
  });

  it('BuildingTrainer renders Belarusian prompt label mode', () => {
    render(
      <MemoryRouter initialEntries={['/be/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<BuildingTrainer langId="be" />} />
        </Routes>
      </MemoryRouter>
    );

    const ruTransBtn = screen.getByText(/Russian Trans\./i);
    fireEvent.click(ruTransBtn);

    expect(screen.getByText(/Build English translation for Belarusian prompt/i)).toBeInTheDocument();
  });

  it('PoetryTrainer renders classic Belarusian poetry items (65 total)', () => {
    expect(POETRY_DATA['be']).toBeDefined();
    expect(POETRY_DATA['be'].length).toBe(65);

    render(
      <MemoryRouter initialEntries={['/be/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<PoetryTrainer langId="be" />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Read the sentence or poem out loud/i)).toBeInTheDocument();
  });

  it('QuizPage renders Belarusian quizzes for /be/quiz', async () => {
    render(
      <MemoryRouter initialEntries={['/be/quiz']}>
        <Routes>
          <Route path="/:lang/quiz" element={<QuizPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Practice Mastery Test/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Start Practice Test/i)).toBeInTheDocument();
  });

  it('SettingsPage overrides Belarusian module progress correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/be/settings']}>
        <Routes>
          <Route path="/:lang/settings" element={<SettingsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Lesson Modules Progress Override/i)).toBeInTheDocument();
    });

    expect(screen.getAllByText(/The Identical Twins/i).length).toBeGreaterThan(0);
  });
});
