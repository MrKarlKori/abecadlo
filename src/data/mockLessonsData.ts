export type ExerciseType = 'drawing' | 'drawing-opposite' | 'reading-easy';

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

export const lessonModules: LessonModule[] = [
  {
    id: 'module-1',
    title: 'The Identical Twins',
    description: 'А, К, М, О, Т',
    letters: ['А', 'К', 'М', 'О', 'Т']
  },
  {
    id: 'module-2',
    title: 'The False Friends',
    description: 'В, Н, Р, С, У, Х',
    letters: ['В', 'Н', 'Р', 'С', 'У', 'Х']
  },
  {
    id: 'module-3',
    title: 'The Greek Cousins',
    description: 'Г, Д, Л, П, Ф',
    letters: ['Г', 'Д', 'Л', 'П', 'Ф']
  },
  {
    id: 'module-4',
    title: 'The Completely New',
    description: 'Б, Ж, З, И, Ч, Ш, etc.',
    letters: ['Б', 'Ж', 'З', 'И', 'Ч', 'Ш']
  }
];
