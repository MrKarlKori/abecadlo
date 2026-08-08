import { useState, useEffect } from 'react';
import { X, ArrowRight, Eye } from 'lucide-react';
import { useParams } from 'react-router-dom';
import type { LessonModule, ExerciseStep } from '../../data/mockLessonsData';
import { HandWritingPad } from './HandWritingPad';
import { READING_DATA } from './ReadingTrainer';
import { useLanguageData } from '../../hooks/useLanguageData';
import { useExercisesProgress } from '../../hooks/useExercisesProgress';

interface ExerciseSessionProps {
  module: LessonModule;
  onClose: () => void;
  onComplete?: () => void;
}

export function ExerciseSession({ module, onClose, onComplete }: ExerciseSessionProps) {
  const { lang } = useParams();
  const langId = lang || 'ru';
  const { characters } = useLanguageData(langId);
  const { recordCompletedSession } = useExercisesProgress();

  const [steps, setSteps] = useState<ExerciseStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStatus, setStepStatus] = useState<'idle' | 'success'>('idle');
  const [readingRevealed, setReadingRevealed] = useState(false);

  // Generate 10 exercise steps: ALWAYS EXACTLY 4 drawing tasks (2 tracing + 2 draw-opposite) and 6 reading tasks
  useEffect(() => {
    if (!characters.length) return;

    // 1. Scoped character pool for module letters
    const moduleChars = characters.filter(c => 
      module.letters.some(l => l.toUpperCase() === c.character.toUpperCase())
    );
    const charPool = moduleChars.length > 0 ? moduleChars : characters;

    // 2. Scoped word pool for reading practice (must contain at least 1 module letter)
    const matchingReadingItems = READING_DATA.easy.filter(item => {
      const cleanWord = item.cyrillic.replace(/[-'’]/g, '').toUpperCase();
      return module.letters.some(l => cleanWord.includes(l.toUpperCase()));
    });
    const readingPool = matchingReadingItems.length > 0 ? matchingReadingItems : READING_DATA.easy;

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

    // Part B: EXACTLY 6 Reading Tasks
    for (let i = 0; i < 6; i++) {
      const rItem = readingPool[Math.floor(Math.random() * readingPool.length)];
      generated.push({
        id: `step-read-${i}-${Date.now()}-${Math.random()}`,
        type: 'reading-easy',
        readingTask: rItem
      });
    }

    // Shuffle the 10 tasks for a dynamic, interspersed lesson flow
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
          promptLabel="Trace the Cyrillic letter"
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
        ? 'Draw the corresponding Cyrillic letter'
        : 'Draw the corresponding English sound/letter';
      const promptDisplay = isEngToRu ? currentStep.phonetic : currentStep.character;
      const answerTarget = isEngToRu ? currentStep.character : currentStep.phonetic;
      const directionHint = isEngToRu ? 'English → Cyrillic' : 'Cyrillic → English';

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
            Read the Cyrillic out loud (Easy Level)
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
                  href={`https://en.wiktionary.org/wiki/${encodeURIComponent(rItem.cyrillic.replace(/[-'’]/g, '').toLowerCase())}#Russian`}
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
