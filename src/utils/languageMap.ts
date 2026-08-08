import { LanguageId } from '../types';

export interface LanguageMeta {
  id: string;
  name: string;
  script: string;
  targetScript: string;
}

export const LANGUAGE_SCRIPT_MAP: Record<string, LanguageMeta> = {
  [LanguageId.RUSSIAN]: {
    id: LanguageId.RUSSIAN,
    name: 'Russian',
    script: 'Russian Cyrillic',
    targetScript: 'English Latin'
  },
  [LanguageId.BELARUSIAN]: {
    id: LanguageId.BELARUSIAN,
    name: 'Belarusian',
    script: 'Belarusian Cyrillic',
    targetScript: 'English Latin'
  },
  [LanguageId.GREEK]: {
    id: LanguageId.GREEK,
    name: 'Greek',
    script: 'Greek',
    targetScript: 'English Latin'
  }
};

export function getLanguageMeta(langId: string): LanguageMeta {
  return (
    LANGUAGE_SCRIPT_MAP[langId] || {
      id: langId,
      name: langId.toUpperCase(),
      script: `${langId.toUpperCase()} Script`,
      targetScript: 'English Latin'
    }
  );
}

export function getQuestionDirectionHint(
  langId: string,
  questionType: 'target-to-english' | 'english-to-target'
): string {
  const meta = getLanguageMeta(langId);
  if (questionType === 'target-to-english') {
    return `${meta.script} \u2192 ${meta.targetScript}`;
  } else {
    return `${meta.targetScript} \u2192 ${meta.script}`;
  }
}

export function getLanguageName(langId: string): string {
  switch (langId) {
    case LanguageId.BELARUSIAN:
      return 'Belarusian';
    case LanguageId.GREEK:
      return 'Greek';
    case LanguageId.RUSSIAN:
      return 'Russian';
    default:
      return 'Belarusian';
  }
}

export function getScriptName(langId: string): string {
  switch (langId) {
    case LanguageId.GREEK:
      return 'Greek';
    case LanguageId.BELARUSIAN:
    case LanguageId.RUSSIAN:
    default:
      return 'Cyrillic';
  }
}
