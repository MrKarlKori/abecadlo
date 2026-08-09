import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, renderHook, act, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { getAlphabetForLang, GREEK_ALPHABET } from '../utils/alphabets';
import { getLanguageMeta, getQuestionDirectionHint } from '../utils/languageMap';
import { BuildingTrainer } from '../components/exercises/BuildingTrainer';
import { LanguageId } from '../types';
import { getLessonModules } from '../data/mockLessonsData';
import { useProgress } from '../hooks/useProgress';
import { useExercisesProgress } from '../hooks/useExercisesProgress';
import { AlphabetPage } from '../pages/AlphabetPage';
import { ReadingTrainer, READING_DATA } from '../components/exercises/ReadingTrainer';
import { TypingTrainer } from '../components/exercises/TypingTrainer';
import { PoetryTrainer, POETRY_DATA } from '../components/exercises/PoetryTrainer';
import { QuizPage } from '../pages/QuizPage';
import { SettingsPage } from '../pages/SettingsPage';
import registryData from '../../public/data/registry.json';
import greekData from '../../public/data/greek.json';
import { GREEK_COMBINATIONS } from '../data/greekCombinations';
import { CombinationReadingTrainer } from '../components/exercises/CombinationReadingTrainer';
import { CombinationQuizTrainer } from '../components/exercises/CombinationQuizTrainer';

describe('Greek Support', () => {
  it('returns Greek alphabet for el', () => {
    const alphabet = getAlphabetForLang(LanguageId.GREEK);
    expect(alphabet).toEqual(GREEK_ALPHABET);
    expect(alphabet).toContain('Α');
    expect(alphabet).toContain('Ω');
  });

  it('returns correct language metadata for Greek (el)', () => {
    const meta = getLanguageMeta(LanguageId.GREEK);
    expect(meta.name).toBe('Greek');
    expect(meta.script).toBe('Greek');
  });

  it('returns direction hint for Greek', () => {
    const hint = getQuestionDirectionHint(LanguageId.GREEK, 'target-to-english');
    expect(hint).toBe('Greek → English Latin');
  });

  it('BuildingTrainer renders Greek prompt label and mode button in Greek mode', () => {
    render(
      <MemoryRouter initialEntries={['/el/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<BuildingTrainer langId={LanguageId.GREEK} />} />
        </Routes>
      </MemoryRouter>
    );

    const greekTransBtn = screen.getByText(/Greek Trans\./i);
    expect(greekTransBtn).toBeInTheDocument();
    fireEvent.click(greekTransBtn);

    expect(screen.getByText(/Build English translation for Greek prompt/i)).toBeInTheDocument();
  });
});

describe('Greek Language Core & Dataset Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('registry.json lists Greek entry', () => {
    const greekEntry = registryData.find(lang => lang.id === 'el');
    expect(greekEntry).toBeDefined();
    expect(greekEntry?.name).toBe('Greek');
    expect(greekEntry?.dataFile).toBe('/data/greek.json');
  });

  it('greek.json contains Greek letters and not Cyrillic', () => {
    const chars = greekData.map(c => c.character);
    expect(chars).toContain('Α');
    expect(chars).toContain('Β');
    expect(chars).toContain('Γ');
    expect(chars).not.toContain('Б');
    expect(chars).not.toContain('Д');
  });

  it('getLessonModules("el") places Γ, Δ, Θ in Unique Sounds', () => {
    const modules = getLessonModules('el');
    const uniqueSounds = modules.find(m => m.id === 'module-3');

    expect(uniqueSounds?.letters).toContain('Γ');
    expect(uniqueSounds?.letters).toContain('Δ');
    expect(uniqueSounds?.letters).toContain('Θ');
    expect(uniqueSounds?.letters).not.toContain('Б');
  });
});

describe('Greek Progress Isolation Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('useProgress("el") isolates letter progress under abecadlo_progress_el', () => {
    const { result: resultEl } = renderHook(() => useProgress('el'));
    const { result: resultRu } = renderHook(() => useProgress('ru'));

    act(() => {
      resultEl.current.toggleCompleted('el-char-1');
    });

    expect(resultEl.current.progress.completedLetters).toContain('el-char-1');
    expect(resultRu.current.progress.completedLetters).not.toContain('el-char-1');
  });

  it('useExercisesProgress("el") isolates exercise module progress under abecadlo_exercises_progress_el', () => {
    const { result: resultEl } = renderHook(() => useExercisesProgress('el'));
    const { result: resultRu } = renderHook(() => useExercisesProgress('ru'));

    act(() => {
      resultEl.current.setModuleSessions('module-1', 10);
    });

    expect(resultEl.current.progress.moduleSessions['module-1']).toBe(10);
    expect(resultRu.current.progress.moduleSessions['module-1'] || 0).toBe(0);
  });
});

describe('Greek UI Components & Pages Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders AlphabetPage for Greek (/el/alphabet) with English Wikipedia link', async () => {
    render(
      <MemoryRouter initialEntries={['/el/alphabet']}>
        <Routes>
          <Route path="/:lang/alphabet" element={<AlphabetPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Alphabet/i })).toBeInTheDocument();
    });

    const wikiLink = screen.getByText(/View Greek Alphabet on Wikipedia/i);
    expect(wikiLink).toBeInTheDocument();
    expect(wikiLink.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Greek_alphabet');
  });

  it('ReadingTrainer loads Greek reading data dataset', () => {
    expect(READING_DATA['el']).toBeDefined();
    expect(READING_DATA['el'].easy.length).toBeGreaterThanOrEqual(90);
    expect(READING_DATA['el'].medium.length).toBeGreaterThanOrEqual(90);
    expect(READING_DATA['el'].hard.length).toBeGreaterThanOrEqual(90);

    render(
      <MemoryRouter initialEntries={['/el/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<ReadingTrainer langId="el" />} />
        </Routes>
      </MemoryRouter>
    );

    const revealBtn = screen.getByRole('button', { name: /Reveal/i });
    fireEvent.click(revealBtn);

    const wikiLink = screen.getByText(/View on Wiktionary/i);
    expect(wikiLink.getAttribute('href')).toContain('#Greek');
  });

  it('TypingTrainer loads Greek layout properly', () => {
    render(
      <MemoryRouter initialEntries={['/el/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<TypingTrainer langId="el" />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Type English translation or sound.../i)).toBeInTheDocument();
  });

  it('PoetryTrainer loads Greek poetry dataset', () => {
    expect(POETRY_DATA['el']).toBeDefined();
    expect(POETRY_DATA['el'].length).toBeGreaterThanOrEqual(50);

    render(
      <MemoryRouter initialEntries={['/el/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<PoetryTrainer langId="el" />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Read the sentence or poem out loud/i)).toBeInTheDocument();
  });

  it('QuizPage renders Greek quizzes for /el/quiz', async () => {
    // Unlock module-3 so we have enough characters (Γ, Δ) in the pool
    const { result } = renderHook(() => useExercisesProgress('el'));
    act(() => {
      result.current.setModuleSessions('module-3', 10);
    });

    render(
      <MemoryRouter initialEntries={['/el/quiz']}>
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

  it('SettingsPage overrides Greek module progress correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/el/settings']}>
        <Routes>
          <Route path="/:lang/settings" element={<SettingsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Lesson Modules Progress Override/i)).toBeInTheDocument();
    });

    expect(screen.getAllByText(/The Familiar Faces/i).length).toBeGreaterThan(0);
  });

  it('contains 12 Greek combinations and 240 combination reading items in READING_DATA', () => {
    expect(GREEK_COMBINATIONS.length).toBe(12);
    expect(READING_DATA['el']?.['combinations']?.length).toBe(240);
  });

  it('includes module-4 Letter Combinations in Greek lesson modules', () => {
    const elModules = getLessonModules('el');
    expect(elModules.length).toBe(4);
    expect(elModules[3].title).toBe('Letter Combinations');
  });

  it('renders CombinationReadingTrainer correctly for Greek', () => {
    render(
      <MemoryRouter initialEntries={['/el/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<CombinationReadingTrainer langId="el" />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('μπ')).toBeInTheDocument();
  });

  it('renders CombinationQuizTrainer correctly for Greek', () => {
    render(
      <MemoryRouter initialEntries={['/el/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<CombinationQuizTrainer />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Combination Sound Quiz/i)).toBeInTheDocument();
  });
});
