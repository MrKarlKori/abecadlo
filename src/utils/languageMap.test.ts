import { describe, it, expect } from 'vitest';
import { getLanguageMeta, getQuestionDirectionHint, getLanguageName, getScriptName } from './languageMap';
import { LanguageId } from '../types';

describe('languageMap utilities', () => {
  it('returns valid metadata for a language', () => {
    const meta = getLanguageMeta(LanguageId.RUSSIAN);
    expect(meta.name).toBe('Russian');
    expect(meta.script).toBe('Russian Cyrillic');
  });

  it('formats direction hints correctly', () => {
    const hint = getQuestionDirectionHint(LanguageId.RUSSIAN, 'target-to-english');
    expect(hint).toBe('Russian Cyrillic \u2192 English Latin');
  });

  it('getLanguageName returns correct language name using switch statement', () => {
    expect(getLanguageName(LanguageId.BELARUSIAN)).toBe('Belarusian');
    expect(getLanguageName(LanguageId.GREEK)).toBe('Greek');
    expect(getLanguageName(LanguageId.RUSSIAN)).toBe('Russian');
    expect(getLanguageName('unknown')).toBe('Belarusian');
  });

  it('getScriptName returns correct script name using switch statement', () => {
    expect(getScriptName(LanguageId.GREEK)).toBe('Greek');
    expect(getScriptName(LanguageId.BELARUSIAN)).toBe('Cyrillic');
    expect(getScriptName(LanguageId.RUSSIAN)).toBe('Cyrillic');
    expect(getScriptName('unknown')).toBe('Cyrillic');
  });
});
