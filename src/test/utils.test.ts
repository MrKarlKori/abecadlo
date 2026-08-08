import { describe, it, expect } from 'vitest';
import { getLanguageMeta, getQuestionDirectionHint } from '../utils/languageMap';

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
});
