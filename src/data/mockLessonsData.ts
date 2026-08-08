export type ExerciseType = 'loanword' | 'transliteration' | 'handwriting';

export interface ExerciseStep {
  id: string;
  type: ExerciseType;
  target: string;
  answer: string | string[];
  distractors?: string[];
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  letters: string[];
  exercises: ExerciseStep[];
}

export const lessonModules: LessonModule[] = [
  {
    id: 'module-1',
    title: 'The Identical Twins',
    description: 'А, К, М, О, Т',
    letters: ['А', 'К', 'М', 'О', 'Т'],
    exercises: [
      { id: 'm1-1', type: 'handwriting', target: 'А', answer: 'А' },
      { id: 'm1-2', type: 'loanword', target: 'КОТ', answer: ['cat', 'kot'] },
      { id: 'm1-3', type: 'transliteration', target: 'МАК', answer: 'MAC', distractors: ['О', 'Т', 'П'] },
      { id: 'm1-4', type: 'handwriting', target: 'Т', answer: 'Т' },
      { id: 'm1-5', type: 'loanword', target: 'АТОМ', answer: ['atom'] }
    ]
  },
  {
    id: 'module-2',
    title: 'The False Friends',
    description: 'В, Н, Р, С, У, Х',
    letters: ['В', 'Н', 'Р', 'С', 'У', 'Х'],
    exercises: [
      { id: 'm2-1', type: 'handwriting', target: 'Р', answer: 'Р' },
      { id: 'm2-2', type: 'loanword', target: 'РЕСТОРАН', answer: ['restaurant'] },
      { id: 'm2-3', type: 'transliteration', target: 'СУП', answer: 'SOUP', distractors: ['В', 'Н', 'Х'] },
      { id: 'm2-4', type: 'loanword', target: 'ВАННА', answer: ['bath', 'vanna'] }
    ]
  },
  {
    id: 'module-3',
    title: 'The Greek Cousins',
    description: 'Г, Д, Л, П, Ф',
    letters: ['Г', 'Д', 'Л', 'П', 'Ф'],
    exercises: [
      { id: 'm3-1', type: 'handwriting', target: 'Д', answer: 'Д' },
      { id: 'm3-2', type: 'loanword', target: 'ФЛАГ', answer: ['flag'] },
      { id: 'm3-3', type: 'transliteration', target: 'ПЛАН', answer: 'PLAN', distractors: ['Г', 'Д', 'Р'] }
    ]
  },
  {
    id: 'module-4',
    title: 'The Completely New',
    description: 'Б, Ж, З, И, Ч, Ш, etc.',
    letters: ['Б', 'Ж', 'З', 'И', 'Ч', 'Ш'],
    exercises: [
      { id: 'm4-1', type: 'handwriting', target: 'Ж', answer: 'Ж' },
      { id: 'm4-2', type: 'loanword', target: 'БАНК', answer: ['bank'] },
      { id: 'm4-3', type: 'transliteration', target: 'ШИП', answer: 'SHIP', distractors: ['З', 'Ж', 'Ч'] }
    ]
  }
];
