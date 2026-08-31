import { LESSON_MODULES_DATA } from './exercises';
import { LanguageId } from '../types';

export type ExerciseType = 'drawing' | 'drawing-opposite' | 'reading-easy' | 'building-mirror' | 'combination-quiz';

export interface ReadingTask {
  id: string;
  cyrillic: string;
  phonetic: string;
  translation: string;
}

export interface ExerciseStep {
  id: string;
  type: ExerciseType;
  charId?: string;
  character?: string;
  phonetic?: string;
  oppositeDirection?: 'eng-to-ru' | 'ru-to-eng';
  readingTask?: ReadingTask;
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  letters: string[];
}

export const getLessonModules = (langId: string): LessonModule[] => {
  return LESSON_MODULES_DATA[langId] || LESSON_MODULES_DATA[LanguageId.BELARUSIAN];
};

export const lessonModules: LessonModule[] = getLessonModules(LanguageId.BELARUSIAN);

