import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PenTool, Keyboard, Grid, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguageData } from '../hooks/useLanguageData';
import { HandWritingPad } from '../components/exercises/HandWritingPad';
import { ReadingTrainer } from '../components/exercises/ReadingTrainer';
import { TypingTrainer } from '../components/exercises/TypingTrainer';
import { BuildingTrainer } from '../components/exercises/BuildingTrainer';
import { PoetryTrainer } from '../components/exercises/PoetryTrainer';

type ExerciseMode = 'drawing' | 'drawing-opposite' | 'reading' | 'typing' | 'building' | 'poetry';

export function ExercisesPage() {
  const { lang } = useParams();
  const langId = lang || 'ru';
  const { characters, loading, error } = useLanguageData(langId);

  const [activeMode, setActiveMode] = useState<ExerciseMode | null>(null);

  // Drawing practice state
  const [shuffledLetters, setShuffledLetters] = useState<{ id: string; char: string; phonetic: string }[]>([]);
  const [letterIndex, setLetterIndex] = useState(0);
  const [oppositeDirection, setOppositeDirection] = useState<'eng-to-ru' | 'ru-to-eng'>('eng-to-ru');

  useEffect(() => {
    if (characters.length > 0) {
      const validChars = characters.filter(c => !['Ъ', 'Ь'].includes(c.character));
      const pool = (validChars.length > 0 ? validChars : characters).map(c => ({
        id: c.id,
        char: c.character,
        phonetic: c.phonetic
      }));
      setShuffledLetters([...pool].sort(() => Math.random() - 0.5));
    }
  }, [characters]);

  const startMode = (mode: ExerciseMode) => {
    setActiveMode(mode);
    setLetterIndex(0);
    setOppositeDirection(Math.random() > 0.5 ? 'eng-to-ru' : 'ru-to-eng');
    if (shuffledLetters.length > 0) {
      setShuffledLetters(prev => [...prev].sort(() => Math.random() - 0.5));
    }
  };

  const handleNextLetter = () => {
    if (letterIndex < shuffledLetters.length - 1) {
      setLetterIndex(prev => prev + 1);
    } else {
      setShuffledLetters(prev => [...prev].sort(() => Math.random() - 0.5));
      setLetterIndex(0);
    }
    setOppositeDirection(Math.random() > 0.5 ? 'eng-to-ru' : 'ru-to-eng');
  };

  if (loading) return <div className="text-center font-serif text-2xl mt-12 animate-pulse">Loading Exercises...</div>;
  if (error) return <div className="text-center font-serif text-vintage-red text-xl mt-12">{error}</div>;

  // Active Practice Session
  if (activeMode) {
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
            &larr; Back to Exercises Dashboard
          </button>
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-vintage-ink/70">
            {activeMode === 'drawing' && `Letter ${letterIndex + 1} of ${shuffledLetters.length}`}
            {activeMode === 'drawing-opposite' && `Letter ${letterIndex + 1} of ${shuffledLetters.length}`}
            {activeMode === 'reading' && 'Reading Practice'}
            {activeMode === 'typing' && 'Typing Word'}
            {activeMode === 'building' && 'Building Word'}
            {activeMode === 'poetry' && 'Rhymes & Sentences'}
          </span>
        </div>

        {/* Practice Mode 1: Letter Tracing */}
        {activeMode === 'drawing' && (
          <div className="flex-1 flex flex-col justify-center">
            <HandWritingPad
              key={item.id}
              target={item.char}
              showGuideOutline={true}
              promptLabel="Trace the Cyrillic letter"
              onSelfAssess={() => {}}
            />
            <div className="mt-8 flex justify-between">
              <button
                onClick={handleNextLetter}
                className="vintage-button flex items-center gap-2"
              >
                <RotateCcw size={18} /> Skip Letter
              </button>
              <button
                onClick={handleNextLetter}
                className="vintage-button flex items-center gap-2 bg-vintage-gold text-vintage-ink"
              >
                Next Letter <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Practice Mode 2: Draw Opposite */}
        {activeMode === 'drawing-opposite' && (
          <div className="flex-1 flex flex-col justify-center">
            <HandWritingPad
              key={`${item.id}-${oppositeDirection}`}
              target={oppositeAnswer}
              answerTarget={oppositeAnswer}
              promptLabel={promptLabelText}
              promptDisplay={oppositePrompt}
              directionHint={directionHintText}
              showGuideOutline={false}
              onSelfAssess={() => {}}
            />
            <div className="mt-8 flex justify-between">
              <button
                onClick={handleNextLetter}
                className="vintage-button flex items-center gap-2"
              >
                <RotateCcw size={18} /> Skip Letter
              </button>
              <button
                onClick={handleNextLetter}
                className="vintage-button flex items-center gap-2 bg-vintage-gold text-vintage-ink"
              >
                Next Letter <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Practice Mode 3: Reading Practice */}
        {activeMode === 'reading' && (
          <div className="flex-1 flex flex-col justify-center">
            <ReadingTrainer langId={langId} />
          </div>
        )}

        {/* Practice Mode 4: Typing Word */}
        {activeMode === 'typing' && (
          <div className="flex-1 flex flex-col justify-center">
            <TypingTrainer langId={langId} />
          </div>
        )}

        {/* Practice Mode 5: Building Word */}
        {activeMode === 'building' && (
          <div className="flex-1 flex flex-col justify-center">
            <BuildingTrainer langId={langId} />
          </div>
        )}

        {/* Practice Mode 6: Rhymes & Sentences */}
        {activeMode === 'poetry' && (
          <div className="flex-1 flex flex-col justify-center">
            <PoetryTrainer langId={langId} />
          </div>
        )}
      </div>
    );
  }

  // Dashboard View (6 Interactive Cards)
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
