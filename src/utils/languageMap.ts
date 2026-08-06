export interface LanguageMeta {
  id: string;
  name: string;
  script: string;
  targetScript: string;
}

export const LANGUAGE_SCRIPT_MAP: Record<string, LanguageMeta> = {
  ru: {
    id: 'ru',
    name: 'Russian',
    script: 'Russian Cyrillic',
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
