import { useState, useEffect } from 'react';
import { X, ArrowRight, Eye } from 'lucide-react';
import { useParams } from 'react-router-dom';
import type { LessonModule, ExerciseStep, ReadingTask } from '../../data/mockLessonsData';
import { HandWritingPad } from './HandWritingPad';
import { READING_DATA } from './ReadingTrainer';
import { useLanguageData } from '../../hooks/useLanguageData';
import { useExercisesProgress } from '../../hooks/useExercisesProgress';
import { getAlphabetForLang } from '../../utils/alphabets';
import { getLanguageName, getScriptName } from '../../utils/languageMap';
import { LanguageId } from '../../types';
import { GREEK_COMBINATIONS } from '../../data/greekCombinations';
import clsx from 'clsx';

interface ExerciseSessionProps {
  module: LessonModule;
  onClose: () => void;
  onComplete?: () => void;
}

function CombinationQuizStep({ combination, phonetic, onCorrect }: { combination: string, phonetic: string, onCorrect: () => void }) {
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const fakePool = [
      'ts', 'dz', 'p', 'b', 'v', 'f', 'g', 'gh', 'k', 'ch', 'm', 'n', 'l', 'r', 's', 'z', 'th', 'dh',
      'a', 'e', 'i', 'o', 'u', 'ou', 'av/af', 'ev/ef', 'ai', 'oi', 'ei', 'ng'
    ].filter(s => s !== phonetic);
    const fakes = fakePool.sort(() => 0.5 - Math.random()).slice(0, 3);
    setOptions([phonetic, ...fakes].sort(() => 0.5 - Math.random()));
  }, [phonetic]);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === phonetic) {
      onCorrect();
    } else {
      // Just mark incorrect, allow them to proceed after seeing correct answer
      onCorrect(); 
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative w-full max-w-md mx-auto">
      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-2 text-center">
        Combination Sound Quiz
      </h3>
      <p className="font-serif text-sm italic text-vintage-ink/70 mb-8 text-center">
        Select the correct phonetic sound for the Greek combination below.
      </p>

      <div className="w-full bg-white border-2 border-vintage-ink p-8 flex flex-col items-center justify-center mb-8 shadow-[4px_4px_0_0_#2C2A29]">
        <div className="text-6xl md:text-7xl font-serif font-bold text-vintage-ink tracking-widest text-center">
          {combination}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        {options.map((opt, i) => {
          const isCorrectChoice = opt === phonetic;
          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              className={clsx(
                "py-4 font-mono font-bold text-xl border-2 border-vintage-ink transition-all",
                !selected ? "bg-white hover:bg-gray-100 cursor-pointer shadow-[2px_2px_0_0_#2C2A29] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none" : "",
                selected === opt && isCorrectChoice ? "bg-green-200 text-green-900 border-green-700" : "",
                selected === opt && !isCorrectChoice ? "bg-red-200 text-red-900 border-red-700" : "",
                selected && isCorrectChoice && selected !== opt ? "bg-green-100 text-green-800 border-green-600 border-dashed" : "",
                selected && opt !== selected && !isCorrectChoice ? "bg-gray-100 text-gray-400 border-gray-300" : ""
              )}
            >
              [{opt}]
            </button>
          );
        })}
      </div>
      
      {selected && selected !== phonetic && (
        <div className="p-4 w-full border-2 font-serif text-center font-bold bg-red-100 border-red-700 text-red-900">
          Incorrect! The right sound is [{phonetic}].
        </div>
      )}
      {selected && selected === phonetic && (
        <div className="p-4 w-full border-2 font-serif text-center font-bold bg-green-100 border-green-700 text-green-900">
          Correct!
        </div>
      )}
    </div>
  );
}

function LessonBuildingStep({ readingTask, onCorrect }: { readingTask: ReadingTask; onCorrect: () => void }) {
  const { lang } = useParams();
  const langId = lang || LanguageId.BELARUSIAN;
  const alphabet = getAlphabetForLang(langId);
  const scriptName = getScriptName(langId);
  const langName = getLanguageName(langId);

  const targetWord = readingTask.cyrillic.replace(/[-'’ ]/g, '').toUpperCase();
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [pool, setPool] = useState<{ id: string; char: string; used: boolean }[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const chars = targetWord.split('');
    const uniqueTargetChars = new Set(chars);
    // Pick 4 distractor letters not in target word
    const availableDistractors = alphabet.filter(c => !uniqueTargetChars.has(c));
    const shuffledDistractors = [...availableDistractors].sort(() => Math.random() - 0.5).slice(0, 4);

    const allChars = [...chars, ...shuffledDistractors];
    const shuffledPool = allChars
      .map(char => ({ char, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item, index) => ({ id: `tile-${index}`, char: item.char, used: false }));

    setSlots(new Array(chars.length).fill(null));
    setPool(shuffledPool);
    setStatus('idle');
  }, [readingTask]);

  const handlePoolClick = (poolItem: { id: string; char: string; used: boolean }) => {
    if (poolItem.used || status === 'success') return;
    const firstEmptySlot = slots.findIndex(s => s === null);
    if (firstEmptySlot !== -1) {
      const newSlots = [...slots];
      newSlots[firstEmptySlot] = poolItem.id;
      setSlots(newSlots);
      setPool(prev => prev.map(p => p.id === poolItem.id ? { ...p, used: true } : p));
      setStatus('idle');
    }
  };

  const handleSlotClick = (index: number) => {
    if (status === 'success') return;
    const poolId = slots[index];
    if (poolId) {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setPool(prev => prev.map(p => p.id === poolId ? { ...p, used: false } : p));
      setStatus('idle');
    }
  };

  const checkAnswer = () => {
    const constructed = slots.map(id => pool.find(p => p.id === id)?.char || '').join('');
    if (constructed === targetWord) {
      setStatus('success');
      onCorrect();
    } else {
      setStatus('error');
    }
  };

  const isFull = slots.length > 0 && slots.every(s => s !== null);

  return (
    <div className="flex flex-col items-center p-6 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-2 text-center">
        Build {scriptName} word from sound (Word Mirroring)
      </h3>
      <p className="font-serif text-sm italic text-vintage-ink/70 mb-6 text-center max-w-md">
        Select letter tiles in order to construct the {scriptName} word matching the sound prompt below.
      </p>

      <div className="text-4xl md:text-5xl font-serif font-bold text-vintage-ink mb-8 text-center drop-shadow-[2px_2px_0_#D9AD5B]">
        [{readingTask.phonetic}]
      </div>

      {/* Target slots */}
      <div className="flex gap-2 mb-8 flex-wrap justify-center min-h-[4rem]">
        {slots.map((poolId, i) => {
          const char = poolId ? pool.find(p => p.id === poolId)?.char : null;
          return (
            <div
              key={`slot-${i}`}
              onClick={() => handleSlotClick(i)}
              className={clsx(
                "w-12 h-16 border-2 border-dashed border-vintage-ink flex items-center justify-center text-3xl font-bold font-serif cursor-pointer transition-all",
                char ? "bg-white border-solid shadow-[2px_2px_0_0_#2C2A29]" : "bg-transparent",
                status === 'error' && char ? "border-red-500 text-red-600 bg-red-50" : "",
                status === 'success' && char ? "border-green-500 text-green-600 bg-green-50" : ""
              )}
            >
              {char}
            </div>
          );
        })}
      </div>

      {/* Tile Pool */}
      <div className="flex gap-2 mb-8 flex-wrap justify-center max-w-md">
        {pool.map(item => (
          <div
            key={item.id}
            onClick={() => handlePoolClick(item)}
            className={clsx(
              "w-12 h-16 border-2 border-vintage-ink flex items-center justify-center text-3xl font-bold font-serif transition-all select-none",
              item.used
                ? "opacity-0 cursor-default"
                : "bg-[#f5ebd6] shadow-[2px_2px_0_0_#2C2A29] cursor-pointer hover:-translate-y-1 hover:bg-white active:translate-y-0 active:shadow-none"
            )}
          >
            {item.char}
          </div>
        ))}
      </div>

      {/* Check Answer Button */}
      {status !== 'success' ? (
        <button
          onClick={checkAnswer}
          disabled={!isFull}
          className={clsx(
            "w-full max-w-md py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] transition-all",
            !isFull ? "opacity-50 cursor-not-allowed bg-gray-200" : "bg-vintage-gold hover:bg-[#d4a849] cursor-pointer"
          )}
        >
          Check Built Word
        </button>
      ) : (
        <div className="text-green-700 font-mono text-center bg-green-50 p-4 border border-green-300 w-full max-w-md flex flex-col items-center">
          <p className="font-bold text-lg">Correct!</p>
          <p className="text-sm mt-1">{targetWord} = "{readingTask.translation}" [{readingTask.phonetic}]</p>
          <a 
            href={`https://en.wiktionary.org/wiki/${encodeURIComponent(targetWord.toLowerCase())}#${langName}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm cursor-pointer"
          >
            View on Wiktionary &rarr;
          </a>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 text-red-600 font-mono text-center bg-red-50 p-3 border border-red-200 w-full max-w-md text-xs">
          Not quite right! Rearrange tiles and check again.
        </div>
      )}
    </div>
  );
}

export function ExerciseSession({ module, onClose, onComplete }: ExerciseSessionProps) {
  const { lang } = useParams();
  const langId = lang || LanguageId.BELARUSIAN;
  const scriptName = getScriptName(langId);
  const langName = getLanguageName(langId);
  const { characters } = useLanguageData(langId);
  const { recordCompletedSession } = useExercisesProgress(langId);

  const [steps, setSteps] = useState<ExerciseStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStatus, setStepStatus] = useState<'idle' | 'success'>('idle');
  const [readingRevealed, setReadingRevealed] = useState(false);

  // Generate 10 exercise steps: 4 drawing (2 tracing + 2 draw opposite) + 3 reading easy + 3 building mirror
  useEffect(() => {
    if (!module || !characters.length) return;

    // Special generation for Greek combination module (module-4)
    if (langId === LanguageId.GREEK && module.id === 'module-4') {
      const generated: ExerciseStep[] = [];
      const combos = ['μπ', 'ντ', 'γκ', 'γγ', 'τσ', 'τζ', 'αι', 'ει', 'οι', 'ου', 'αυ', 'ευ'];
      const comboWords = READING_DATA['el']?.['combinations'] || [];
      
      // 3 Combination Quizzes
      for (let i = 0; i < 3; i++) {
        const randomComboStr = combos[Math.floor(Math.random() * combos.length)];
        const comboObj = GREEK_COMBINATIONS.find(c => c.combination === randomComboStr);
        if (comboObj) {
          generated.push({
            id: `step-combo-quiz-${i}-${Date.now()}-${Math.random()}`,
            type: 'combination-quiz',
            character: comboObj.combination,
            phonetic: comboObj.phonetic
          });
        }
      }

      // 4 Combination Reading Practice
      for (let i = 0; i < 4; i++) {
        const rItem = comboWords[Math.floor(Math.random() * comboWords.length)];
        if (rItem) {
          generated.push({
            id: `step-read-combo-${i}-${Date.now()}-${Math.random()}`,
            type: 'reading-easy',
            readingTask: rItem
          });
        }
      }

      // 3 Building Word Combinations
      for (let i = 0; i < 3; i++) {
        const rItem = comboWords[Math.floor(Math.random() * comboWords.length)];
        if (rItem) {
          generated.push({
            id: `step-build-combo-${i}-${Date.now()}-${Math.random()}`,
            type: 'building-mirror',
            readingTask: rItem
          });
        }
      }
      
      generated.sort(() => Math.random() - 0.5);
      setSteps(generated);
      setCurrentStepIndex(0);
      setStepStatus('idle');
      setReadingRevealed(false);
      return;
    }

    // Normal module generation
    const moduleChars = characters.filter(c => 
      module.letters.some(l => l.toUpperCase() === c.character.toUpperCase())
    );
    const charPool = moduleChars.length > 0 ? moduleChars : characters;

    // 2. Scoped word pool for reading & building (lessons use only words from category Simple)
    const langReadingData = READING_DATA[langId] || READING_DATA[LanguageId.BELARUSIAN];
    const allReadingItems = langReadingData.easy;

    const exampleReadingItems: ReadingTask[] = characters
      .filter(c => module.letters.some(l => l.toUpperCase() === c.character.toUpperCase()) && c.example)
      .map(c => ({
        id: `example-${c.id}`,
        cyrillic: c.example.native.toUpperCase(),
        phonetic: c.example.transliteration.toUpperCase(),
        translation: c.example.translation
      }));

    const combinedItems = [...allReadingItems, ...exampleReadingItems];

    const matchingReadingItems = combinedItems.filter(item => {
      const cleanWord = item.cyrillic.replace(/[-'’ ]/g, '').toUpperCase();
      return module.letters.some(l => cleanWord.includes(l.toUpperCase()));
    });
    const readingPool = matchingReadingItems.length > 0 ? matchingReadingItems : combinedItems;

    const generated: ExerciseStep[] = [];

    // Part A: EXACTLY 4 Drawing Tasks Total
    // 2 Letter Tracing tasks
    for (let i = 0; i < 2; i++) {
      const randomChar = charPool[Math.floor(Math.random() * charPool.length)];
      generated.push({
        id: `step-draw-${i}-${Date.now()}-${Math.random()}`,
        type: 'drawing',
        charId: randomChar.id,
        character: randomChar.character,
        phonetic: randomChar.phonetic
      });
    }

    // 2 Draw Opposite tasks (1 Eng -> Ru, 1 Ru -> Eng)
    const oppositeDirs: ('eng-to-ru' | 'ru-to-eng')[] = ['eng-to-ru', 'ru-to-eng'];
    oppositeDirs.forEach((dir, i) => {
      const randomChar = charPool[Math.floor(Math.random() * charPool.length)];
      generated.push({
        id: `step-opp-${i}-${Date.now()}-${Math.random()}`,
        type: 'drawing-opposite',
        charId: randomChar.id,
        character: randomChar.character,
        phonetic: randomChar.phonetic,
        oppositeDirection: dir
      });
    });

    // Part B: 3 Reading Tasks (Easy Level)
    for (let i = 0; i < 3; i++) {
      const rItem = readingPool[Math.floor(Math.random() * readingPool.length)];
      generated.push({
        id: `step-read-${i}-${Date.now()}-${Math.random()}`,
        type: 'reading-easy',
        readingTask: rItem
      });
    }

    // Part C: 3 Building Word Mirroring Tasks (Easy Level)
    for (let i = 0; i < 3; i++) {
      const rItem = readingPool[Math.floor(Math.random() * readingPool.length)];
      generated.push({
        id: `step-build-${i}-${Date.now()}-${Math.random()}`,
        type: 'building-mirror',
        readingTask: rItem
      });
    }

    // Shuffle all 10 tasks for a dynamic, interspersed lesson flow
    generated.sort(() => Math.random() - 0.5);

    setSteps(generated);
    setCurrentStepIndex(0);
    setStepStatus('idle');
    setReadingRevealed(false);
  }, [module, characters]);

  const currentStep = steps[currentStepIndex];
  const progressPercent = steps.length > 0 ? (currentStepIndex / steps.length) * 100 : 0;

  const handleCorrect = () => {
    setStepStatus('success');
  };

  const handleNext = () => {
    setStepStatus('idle');
    setReadingRevealed(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Completed full session of the module
      recordCompletedSession(module.id);
      if (onComplete) {
        onComplete();
      } else {
        onClose();
      }
    }
  };

  if (!currentStep) {
    return <div className="text-center font-serif text-2xl mt-12 animate-pulse">Generating Module Session...</div>;
  }

  const renderExercise = () => {
    const key = currentStep.id;

    if (currentStep.type === 'drawing') {
      return (
        <HandWritingPad
          key={key}
          target={currentStep.character || 'А'}
          showGuideOutline={true}
          promptLabel={`Trace the ${scriptName} letter`}
          onSelfAssess={(success) => {
            if (success) handleCorrect();
            else handleCorrect();
          }}
        />
      );
    }

    if (currentStep.type === 'drawing-opposite') {
      const isEngToRu = currentStep.oppositeDirection === 'eng-to-ru';
      const promptLabel = isEngToRu
        ? `Draw the corresponding ${scriptName} letter`
        : 'Draw the corresponding English sound/letter';
      const promptDisplay = isEngToRu ? currentStep.phonetic : currentStep.character;
      const answerTarget = isEngToRu ? currentStep.character : currentStep.phonetic;
      const directionHint = isEngToRu ? `English → ${scriptName}` : `${scriptName} → English`;

      return (
        <HandWritingPad
          key={key}
          target={answerTarget || 'A'}
          answerTarget={answerTarget || 'A'}
          promptLabel={promptLabel}
          promptDisplay={promptDisplay}
          directionHint={directionHint}
          showGuideOutline={false}
          onSelfAssess={(success) => {
            if (success) handleCorrect();
            else handleCorrect();
          }}
        />
      );
    }

    if (currentStep.type === 'reading-easy' && currentStep.readingTask) {
      const rItem = currentStep.readingTask;
      return (
        <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
          <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-2 text-center">
            Read the {scriptName} out loud (Easy Level)
          </h3>
          <p className="font-serif text-sm italic text-vintage-ink/70 mb-8 text-center max-w-md">
            Sound out the syllable or word below, then click Reveal to check your pronunciation.
          </p>

          <div className="w-full max-w-md bg-white border-2 border-vintage-ink p-8 flex flex-col items-center justify-center mb-8 shadow-[4px_4px_0_0_#2C2A29]">
            <div className="text-5xl md:text-6xl font-serif font-bold text-vintage-ink tracking-widest mb-4 text-center">
              {rItem.cyrillic}
            </div>

            {readingRevealed && (
              <div className="mt-6 pt-6 border-t-2 border-vintage-ink border-dashed w-full text-center animate-in fade-in">
                <div className="text-2xl font-mono font-bold text-vintage-blue mb-1">
                  [{rItem.phonetic}]
                </div>
                <div className="text-xl font-serif italic text-vintage-red mb-3">
                  "{rItem.translation}"
                </div>
                <a 
                  href={`https://en.wiktionary.org/wiki/${encodeURIComponent(rItem.cyrillic.replace(/[-'’]/g, '').toLowerCase())}#${langName}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm cursor-pointer"
                >
                  View on Wiktionary &rarr;
                </a>
              </div>
            )}
          </div>

          {!readingRevealed ? (
            <button
              onClick={() => {
                setReadingRevealed(true);
                handleCorrect();
              }}
              className="w-full max-w-md py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] bg-vintage-gold hover:bg-[#d4a849] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Eye size={20} /> Reveal Answer
            </button>
          ) : (
            <div className="font-mono text-sm text-green-700 font-bold">
              ✓ Pronunciation revealed! Click Continue below.
            </div>
          )}
        </div>
      );
    }

    if (currentStep.type === 'building-mirror' && currentStep.readingTask) {
      return (
        <LessonBuildingStep
          key={key}
          readingTask={currentStep.readingTask}
          onCorrect={handleCorrect}
        />
      );
    }

    if (currentStep.type === 'combination-quiz' && currentStep.character && currentStep.phonetic) {
      return (
        <CombinationQuizStep
          key={key}
          combination={currentStep.character}
          phonetic={currentStep.phonetic}
          onCorrect={handleCorrect}
        />
      );
    }

    return null;
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col min-h-[70vh]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-vintage-ink transition-colors"
          title="Exit Session"
        >
          <X size={24} />
        </button>
        <div className="flex-1 h-4 bg-gray-200 border-2 border-vintage-ink overflow-hidden">
          <div 
            className="h-full bg-vintage-gold transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-center">
        {renderExercise()}
      </div>

      {/* Footer / Continue button that appears on success */}
      {stepStatus === 'success' && (
        <div className="mt-8 flex justify-end animate-in fade-in slide-in-from-bottom-4">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-vintage-ink text-white font-serif font-bold text-xl hover:bg-gray-800 transition-colors cursor-pointer shadow-[4px_4px_0_0_#D9AD5B]"
          >
            {currentStepIndex < steps.length - 1 ? 'Continue' : 'Finish Lesson'}
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
