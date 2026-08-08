import readingDataJson from './readingData.json';
import poetryDataJson from './poetryData.json';
import lessonModulesJson from './lessonModulesData.json';

export interface ReadingItem {
  id: string;
  cyrillic: string;
  phonetic: string;
  translation: string;
}

export type ReadingLevel = 'easy' | 'medium' | 'hard';

export interface PoetryItem {
  id: string;
  title: string;
  lines: string[];
  translationLines: string[];
  mainWord: string;
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  letters: string[];
}

export const READING_DATA = readingDataJson as Record<string, Record<ReadingLevel, ReadingItem[]>>;
export const POETRY_DATA = poetryDataJson as Record<string, PoetryItem[]>;
export const LESSON_MODULES_DATA = lessonModulesJson as Record<string, LessonModule[]>;
