import { describe, it, expect } from 'vitest';
import { getLanguageMeta, getQuestionDirectionHint } from '../utils/languageMap';
import { LATIN_ALPHABET } from '../utils/alphabets';

describe('Language Utilities', () => {
  it('returns valid metadata for Russian (ru)', () => {
    const entry = getLanguageMeta('ru');
    expect(entry).toBeDefined();
    expect(entry.name).toBe('Russian');
    expect(entry.id).toBe('ru');
  });

  it('returns fallback for non-existent language id', () => {
    const entry = getLanguageMeta('xyz');
    expect(entry).toBeDefined();
    expect(entry.name).toBe('XYZ');
  });

  it('generates correct direction hints for Quiz modes', () => {
    const targetToEng = getQuestionDirectionHint('ru', 'target-to-english');
    expect(targetToEng).toBe('Russian Cyrillic → English Latin');

    const engToTarget = getQuestionDirectionHint('ru', 'english-to-target');
    expect(engToTarget).toBe('English Latin → Russian Cyrillic');
  });

  it('exports LATIN_ALPHABET containing 26 uppercase A-Z letters', () => {
    expect(LATIN_ALPHABET).toHaveLength(26);
    expect(LATIN_ALPHABET[0]).toBe('A');
    expect(LATIN_ALPHABET[25]).toBe('Z');
  });
});
