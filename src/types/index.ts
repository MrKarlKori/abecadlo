export enum LanguageId {
  BELARUSIAN = 'be',
  RUSSIAN = 'ru',
  GREEK = 'el',
}

export enum ExerciseMode {
  DRAWING = 'drawing',
  DRAWING_OPPOSITE = 'drawing-opposite',
  READING = 'reading',
  TYPING = 'typing',
  BUILDING = 'building',
  POETRY = 'poetry',
}

export interface Example {
  native: string;
  translation: string;
  transliteration?: string;
}

export interface CharacterData {
  id: string;
  character: string;
  characterLower: string;
  phonetic: string;
  soundsLike: string;
  example: Example;
  asset: string;
}

export interface LanguageRegistryEntry {
  id: string;
  name: string;
  theme: string;
  dataFile: string;
}

export interface ProgressState {
  completedLetters: string[];
  quizHighScore: number;
}

export interface AppState {
  version: number;
  activeLanguage: string;
  progress: Record<string, ProgressState>;
}
