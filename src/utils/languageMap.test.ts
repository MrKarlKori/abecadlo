import { describe, it, expect } from 'vitest';
import { getLanguageMeta, getQuestionDirectionHint } from './languageMap';

describe('languageMap utilities', () => {
  it('returns valid metadata for a language', () => {
    const meta = getLanguageMeta('ru');
    expect(meta.name).toBe('Russian');
    expect(meta.script).toBe('Russian Cyrillic');
  });

  it('formats direction hints correctly', () => {
    const hint = getQuestionDirectionHint('ru', 'target-to-english');
    expect(hint).toBe('Russian Cyrillic \u2192 English Latin');
  });
});
