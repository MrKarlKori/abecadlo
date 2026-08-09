import readingDataJson from './readingData.json';
import poetryDataJson from './poetryData.json';
import lessonModulesJson from './lessonModulesData.json';
import greekCombinationWordsJson from './greekCombinationWords.json';

export interface ReadingItem {
  id: string;
  cyrillic: string;
  phonetic: string;
  translation: string;
}

export type ReadingLevel = 'easy' | 'medium' | 'hard' | 'combinations';

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

export const READING_DATA = readingDataJson as unknown as Record<string, Record<ReadingLevel, ReadingItem[]>>;

const comboItems: ReadingItem[] = Object.values(greekCombinationWordsJson)
  .flat()
  .map((item, idx) => ({
    id: `el-combo-${idx}`,
    cyrillic: item.native,
    phonetic: item.transliteration,
    translation: item.translation
  }));

if (READING_DATA.el) {
  READING_DATA.el.combinations = comboItems;
}

export const POETRY_DATA = poetryDataJson as Record<string, PoetryItem[]>;
export const LESSON_MODULES_DATA = lessonModulesJson as Record<string, LessonModule[]>;
