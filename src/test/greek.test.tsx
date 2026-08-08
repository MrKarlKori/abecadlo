import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { getAlphabetForLang, GREEK_ALPHABET } from '../utils/alphabets';
import { getLanguageMeta, getQuestionDirectionHint } from '../utils/languageMap';
import { BuildingTrainer } from '../components/exercises/BuildingTrainer';
import { LanguageId } from '../types';

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
