import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PenTool, Keyboard, Grid, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguageData } from '../hooks/useLanguageData';
import { HandWritingPad } from '../components/exercises/HandWritingPad';
import { LoanwordDecoder } from '../components/exercises/LoanwordDecoder';
import { TransliterationBuilder } from '../components/exercises/TransliterationBuilder';
import { ReadingTrainer } from '../components/exercises/ReadingTrainer';
import { TypingTrainer } from '../components/exercises/TypingTrainer';
import { BuildingTrainer } from '../components/exercises/BuildingTrainer';
import { PoetryTrainer } from '../components/exercises/PoetryTrainer';
import clsx from 'clsx';

type ExerciseMode = 'drawing' | 'drawing-opposite' | 'reading' | 'typing' | 'building' | 'poetry';

const WORD_ITEMS = [
  { cyrillic: 'КОТ', translation: 'cat', distractors: ['О', 'Т', 'П', 'М'] },
  { cyrillic: 'МАК', translation: 'poppy', distractors: ['А', 'К', 'Л', 'С'] },
  { cyrillic: 'АТОМ', translation: 'atom', distractors: ['Р', 'Н', 'Б', 'В'] },
  { cyrillic: 'РЕСТОРАН', translation: 'restaurant', distractors: ['В', 'Н', 'Х', 'Т'] },
  { cyrillic: 'СУП', translation: 'soup', distractors: ['В', 'Н', 'Х', 'К'] },
  { cyrillic: 'ВАННА', translation: 'bath', distractors: ['О', 'Т', 'Р', 'С'] },
  { cyrillic: 'ФЛАГ', translation: 'flag', distractors: ['Г', 'Д', 'Р', 'М'] },
  { cyrillic: 'ПЛАН', translation: 'plan', distractors: ['Г', 'Д', 'Р', 'Т'] },
  { cyrillic: 'БАНК', translation: 'bank', distractors: ['З', 'Ж', 'Ч', 'О'] },
  { cyrillic: 'ШИП', translation: 'thorn', distractors: ['З', 'Ж', 'Ч', 'К'] },
  { cyrillic: 'АПТЕКА', translation: 'pharmacy', distractors: ['О', 'Т', 'И', 'М'] },
  { cyrillic: 'ДОМ', translation: 'house', distractors: ['А', 'К', 'С', 'В'] },
  { cyrillic: 'ВОДА', translation: 'water', distractors: ['О', 'Т', 'П', 'Р'] },
  { cyrillic: 'ГОРОД', translation: 'city', distractors: ['А', 'Б', 'В', 'С'] },
  { cyrillic: 'ЛИМОН', translation: 'lemon', distractors: ['А', 'К', 'Т', 'Р'] },
  { cyrillic: 'ПАРК', translation: 'park', distractors: ['О', 'С', 'М', 'Т'] },
  { cyrillic: 'КАФЕ', translation: 'cafe', distractors: ['Р', 'Н', 'С', 'У'] },
  { cyrillic: 'ТАКСИ', translation: 'taxi', distractors: ['О', 'П', 'М', 'Р'] }
];

export function ExercisesPage() {
  const { lang } = useParams();
  const langId = lang || 'ru';
  const { characters, loading, error } = useLanguageData(langId);
  const navigate = useNavigate();

  const [activeMode, setActiveMode] = useState<ExerciseMode | null>(null);

  // Drawing practice state
  const [shuffledLetters, setShuffledLetters] = useState<{ id: string; char: string; phonetic: string }[]>([]);
  const [letterIndex, setLetterIndex] = useState(0);
  const [oppositeDirection, setOppositeDirection] = useState<'eng-to-ru' | 'ru-to-eng'>('eng-to-ru');

  // Word practice state (typing and building)
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [completedStep, setCompletedStep] = useState(false);

  useEffect(() => {
    if (characters.length > 0) {
      const list = characters.map(c => ({ id: c.id, char: c.character, phonetic: c.phonetic }));
      setShuffledLetters([...list].sort(() => Math.random() - 0.5));
    }
  }, [characters]);

  const startMode = (mode: ExerciseMode) => {
    setActiveMode(mode);
    setCompletedStep(false);

    if ((mode === 'drawing' || mode === 'drawing-opposite') && characters.length > 0) {
      const list = characters.map(c => ({ id: c.id, char: c.character, phonetic: c.phonetic }));
      setShuffledLetters([...list].sort(() => Math.random() - 0.5));
      setLetterIndex(0);
      setOppositeDirection(Math.random() > 0.5 ? 'eng-to-ru' : 'ru-to-eng');
    } else if (mode === 'typing' || mode === 'building') {
      setCurrentWordIndex(Math.floor(Math.random() * WORD_ITEMS.length));
    }
  };

  const nextItem = () => {
    setCompletedStep(false);
    if (activeMode === 'drawing' || activeMode === 'drawing-opposite') {
      if (letterIndex < shuffledLetters.length - 1) {
        setLetterIndex(prev => prev + 1);
        setOppositeDirection(Math.random() > 0.5 ? 'eng-to-ru' : 'ru-to-eng');
      } else {
        // Reshuffle when finished
        const list = characters.map(c => ({ id: c.id, char: c.character, phonetic: c.phonetic }));
        setShuffledLetters([...list].sort(() => Math.random() - 0.5));
        setLetterIndex(0);
        setOppositeDirection(Math.random() > 0.5 ? 'eng-to-ru' : 'ru-to-eng');
      }
    } else {
      let nextIdx = Math.floor(Math.random() * WORD_ITEMS.length);
      if (nextIdx === currentWordIndex) {
        nextIdx = (currentWordIndex + 1) % WORD_ITEMS.length;
      }
      setCurrentWordIndex(nextIdx);
    }
  };

  if (loading) return <div className="text-center font-serif text-2xl mt-12 animate-pulse">Loading Exercises...</div>;
  if (error) return <div className="text-center font-serif text-vintage-red text-xl mt-12">{error}</div>;

  // Active Practice Session
  if (activeMode) {
    const currentWord = WORD_ITEMS[currentWordIndex];
    const item = shuffledLetters[letterIndex] || { id: 'A', char: 'А', phonetic: 'A' };

    const isEngToRu = oppositeDirection === 'eng-to-ru';
    const oppositePrompt = isEngToRu ? item.phonetic : item.char;
    const oppositeAnswer = isEngToRu ? item.char : item.phonetic;
    const directionHintText = isEngToRu ? 'English → Cyrillic' : 'Cyrillic → English';
    const promptLabelText = isEngToRu
      ? 'Draw the corresponding Cyrillic letter'
      : 'Draw the corresponding English sound/letter';

    return (
      <div className="max-w-2xl mx-auto flex flex-col min-h-[70vh]">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setActiveMode(null)}
            className="text-vintage-ink hover:text-vintage-blue font-serif font-bold underline underline-offset-4 decoration-2 cursor-pointer"
          >
            &larr; Back to Exercises Menu
          </button>

          <span className="font-mono text-sm font-bold text-vintage-ink/70">
            {activeMode === 'drawing' || activeMode === 'drawing-opposite' ? (
              `Letter ${letterIndex + 1} of ${shuffledLetters.length}`
            ) : (
              `Random Word Practice`
            )}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {activeMode === 'drawing' && (
            <HandWritingPad
              key={`drawing-${item.char}-${letterIndex}`}
              target={item.char}
              promptLabel="Trace the Cyrillic letter"
              showGuideOutline={true}
              onSelfAssess={() => setCompletedStep(true)}
            />
          )}

          {activeMode === 'drawing-opposite' && (
            <HandWritingPad
              key={`opposite-${item.id}-${letterIndex}-${oppositeDirection}`}
              target={oppositeAnswer}
              answerTarget={oppositeAnswer}
              promptLabel={promptLabelText}
              promptDisplay={oppositePrompt}
              directionHint={directionHintText}
              showGuideOutline={false}
              onSelfAssess={() => setCompletedStep(true)}
            />
          )}

          {activeMode === 'reading' && (
            <ReadingTrainer key="reading-session" />
          )}

          {activeMode === 'typing' && (
            <TypingTrainer key="typing-session" />
          )}

          {activeMode === 'building' && (
            <BuildingTrainer key="building-session" />
          )}

          {activeMode === 'poetry' && (
            <PoetryTrainer key="poetry-session" />
          )}
        </div>

        {activeMode !== 'reading' && activeMode !== 'typing' && activeMode !== 'building' && activeMode !== 'poetry' && (
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={nextItem}
              className="flex items-center gap-2 px-6 py-3 border-2 border-vintage-ink bg-white font-serif font-bold hover:bg-gray-100 cursor-pointer"
            >
              <RotateCcw size={18} /> Skip / Next Random
            </button>

            {completedStep && (
              <button
                onClick={nextItem}
                className="flex items-center gap-2 px-8 py-3 bg-vintage-ink text-white font-serif font-bold text-xl hover:bg-gray-800 transition-colors cursor-pointer shadow-[4px_4px_0_0_#D9AD5B]"
              >
                Next <ArrowRight size={24} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Main Exercises Selection Dashboard
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl uppercase tracking-widest border-b-2 border-vintage-ink pb-4 inline-block mb-4">
          Practice & Exercises
        </h1>
        <p className="font-serif text-xl italic text-vintage-ink/80">
          Relaxed practice with no scoring. Hone your handwriting, reading, typing, and word building skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Exercise 1: Tracing */}
        <button
          onClick={() => startMode('drawing')}
          className="bg-vintage-paper border-2 border-vintage-ink p-6 flex flex-col shadow-[6px_6px_0_0_#2C2A29] hover:bg-[#eae6d5] transition-all cursor-pointer text-left group"
        >
          <div className="w-12 h-12 bg-vintage-gold border-2 border-vintage-ink flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <PenTool size={24} className="text-vintage-ink" />
          </div>
          <span className="font-mono text-xs font-bold text-vintage-ink/60 mb-1">PRACTICE 1</span>
          <h2 className="text-xl font-bold uppercase tracking-wide text-vintage-ink mb-2">
            Letter Tracing
          </h2>
          <p className="font-serif text-sm text-vintage-ink/80 mb-6 flex-1">
            Draw all Cyrillic letters with a faded outline guide in random order.
          </p>
          <div className="w-full py-3 bg-vintage-gold group-hover:bg-[#d4a849] font-serif font-bold text-base border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] text-center">
            Start Tracing
          </div>
        </button>

        {/* Exercise 2: Opposite Drawing */}
        <button
          onClick={() => startMode('drawing-opposite')}
          className="bg-vintage-paper border-2 border-vintage-ink p-6 flex flex-col shadow-[6px_6px_0_0_#2C2A29] hover:bg-[#eae6d5] transition-all cursor-pointer text-left group"
        >
          <div className="w-12 h-12 bg-[#8B5CF6] text-white border-2 border-vintage-ink flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <PenTool size={24} />
          </div>
          <span className="font-mono text-xs font-bold text-vintage-ink/60 mb-1">PRACTICE 2</span>
          <h2 className="text-xl font-bold uppercase tracking-wide text-vintage-ink mb-2">
            Draw Opposite
          </h2>
          <p className="font-serif text-sm text-vintage-ink/80 mb-6 flex-1">
            Given a letter sound or Cyrillic character, draw its corresponding counterpart without a guide outline.
          </p>
          <div className="w-full py-3 bg-vintage-gold group-hover:bg-[#d4a849] font-serif font-bold text-base border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] text-center">
            Draw Opposite
          </div>
        </button>

        {/* Exercise 3: Reading Trainer */}
        <button
          onClick={() => startMode('reading')}
          className="bg-vintage-paper border-2 border-vintage-ink p-6 flex flex-col shadow-[6px_6px_0_0_#2C2A29] hover:bg-[#eae6d5] transition-all cursor-pointer text-left group"
        >
          <div className="w-12 h-12 bg-[#10B981] text-white border-2 border-vintage-ink flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <BookOpen size={24} />
          </div>
          <span className="font-mono text-xs font-bold text-vintage-ink/60 mb-1">PRACTICE 3</span>
          <h2 className="text-xl font-bold uppercase tracking-wide text-vintage-ink mb-2">
            Reading Practice
          </h2>
          <p className="font-serif text-sm text-vintage-ink/80 mb-6 flex-1">
            Practice reading Cyrillic syllables and words across 3 levels (Easy, Medium, Hard).
          </p>
          <div className="w-full py-3 bg-vintage-gold group-hover:bg-[#d4a849] font-serif font-bold text-base border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] text-center">
            Start Reading
          </div>
        </button>

        {/* Exercise 4: Typing */}
        <button
          onClick={() => startMode('typing')}
          className="bg-vintage-paper border-2 border-vintage-ink p-6 flex flex-col shadow-[6px_6px_0_0_#2C2A29] hover:bg-[#eae6d5] transition-all cursor-pointer text-left group"
        >
          <div className="w-12 h-12 bg-[#3A6B7E] text-white border-2 border-vintage-ink flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Keyboard size={24} />
          </div>
          <span className="font-mono text-xs font-bold text-vintage-ink/60 mb-1">PRACTICE 4</span>
          <h2 className="text-xl font-bold uppercase tracking-wide text-vintage-ink mb-2">
            Typing Word
          </h2>
          <p className="font-serif text-sm text-vintage-ink/80 mb-6 flex-1">
            Read Cyrillic words and type their English translation manually.
          </p>
          <div className="w-full py-3 bg-vintage-gold group-hover:bg-[#d4a849] font-serif font-bold text-base border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] text-center">
            Start Typing
          </div>
        </button>

        {/* Exercise 5: Building */}
        <button
          onClick={() => startMode('building')}
          className="bg-vintage-paper border-2 border-vintage-ink p-6 flex flex-col shadow-[6px_6px_0_0_#2C2A29] hover:bg-[#eae6d5] transition-all cursor-pointer text-left group"
        >
          <div className="w-12 h-12 bg-[#C84B31] text-white border-2 border-vintage-ink flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Grid size={24} />
          </div>
          <span className="font-mono text-xs font-bold text-vintage-ink/60 mb-1">PRACTICE 5</span>
          <h2 className="text-xl font-bold uppercase tracking-wide text-vintage-ink mb-2">
            Building Word
          </h2>
          <p className="font-serif text-sm text-vintage-ink/80 mb-6 flex-1">
            Construct Cyrillic words letter-by-letter using interactive Cyrillic letter tiles.
          </p>
          <div className="w-full py-3 bg-vintage-gold group-hover:bg-[#d4a849] font-serif font-bold text-base border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] text-center">
            Start Building
          </div>
        </button>

        {/* Exercise 6: Rhymes & Sentences */}
        <button
          onClick={() => startMode('poetry')}
          className="bg-vintage-paper border-2 border-vintage-ink p-6 flex flex-col shadow-[6px_6px_0_0_#2C2A29] hover:bg-[#eae6d5] transition-all cursor-pointer text-left group"
        >
          <div className="w-12 h-12 bg-[#D97706] text-white border-2 border-vintage-ink flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <BookOpen size={24} />
          </div>
          <span className="font-mono text-xs font-bold text-vintage-ink/60 mb-1">PRACTICE 6</span>
          <h2 className="text-xl font-bold uppercase tracking-wide text-vintage-ink mb-2">
            Rhymes & Sentences
          </h2>
          <p className="font-serif text-sm text-vintage-ink/80 mb-6 flex-1">
            Practice reading simple sentences and classic 2–4 line children's nursery rhymes out loud.
          </p>
          <div className="w-full py-3 bg-vintage-gold group-hover:bg-[#d4a849] font-serif font-bold text-base border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] text-center">
            Start Rhymes
          </div>
        </button>
      </div>
    </div>
  );
}
