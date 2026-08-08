import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AlphabetPage } from '../pages/AlphabetPage';
import { ExercisesPage } from '../pages/ExercisesPage';
import { LessonsPage } from '../pages/LessonsPage';
import { QuizPage } from '../pages/QuizPage';
import { SettingsPage } from '../pages/SettingsPage';

describe('Application Pages Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders AlphabetPage with character cards grid', async () => {
    render(
      <MemoryRouter initialEntries={['/ru/alphabet']}>
        <Routes>
          <Route path="/:lang/alphabet" element={<AlphabetPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Alphabet/i })).toBeInTheDocument();
    });
  });

  it('renders ExercisesPage with 6 exercise card buttons', async () => {
    render(
      <MemoryRouter initialEntries={['/ru/exercises']}>
        <Routes>
          <Route path="/:lang/exercises" element={<ExercisesPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Practice & Exercises/i)).toBeInTheDocument();
    });

    expect(screen.getAllByText(/Letter Tracing/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Draw Opposite/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Reading Practice/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Typing Word/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Building Word/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Rhymes & Sentences/i).length).toBeGreaterThan(0);
  });

  it('renders LessonsPage with module progress cards', async () => {
    render(
      <MemoryRouter initialEntries={['/ru/lessons']}>
        <Routes>
          <Route path="/:lang/lessons" element={<LessonsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Lesson Modules/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/The Identical Twins/i)).toBeInTheDocument();
    expect(screen.getByText(/The False Friends/i)).toBeInTheDocument();
  });

  it('renders QuizPage with 2 quizzes (Alphabet Test & Practice Mastery Test)', async () => {
    render(
      <MemoryRouter initialEntries={['/ru/quizzes']}>
        <Routes>
          <Route path="/:lang/quizzes" element={<QuizPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/Alphabet Test/i).length).toBeGreaterThan(0);
    });

    expect(screen.getByText(/Practice Mastery Test/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Alphabet Test/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Practice Test/i)).toBeInTheDocument();
  });

  it('renders SettingsPage with manual progress overrides', async () => {
    render(
      <MemoryRouter initialEntries={['/ru/settings']}>
        <Routes>
          <Route path="/:lang/settings" element={<SettingsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Settings & Progress/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Lesson Modules Progress Override/i)).toBeInTheDocument();
    expect(screen.getByText(/Alphabet Manual Override Grid/i)).toBeInTheDocument();
  });
});
