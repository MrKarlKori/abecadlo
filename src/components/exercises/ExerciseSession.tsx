import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { LessonModule } from '../../data/mockLessonsData';
import { LoanwordDecoder } from './LoanwordDecoder';
import { TransliterationBuilder } from './TransliterationBuilder';
import { HandWritingPad } from './HandWritingPad';
import { useExercisesProgress } from '../../hooks/useExercisesProgress';

interface ExerciseSessionProps {
  module: LessonModule;
  onClose: () => void;
}

export function ExerciseSession({ module, onClose }: ExerciseSessionProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStatus, setStepStatus] = useState<'idle' | 'success'>('idle');
  const { updateModuleProgress } = useExercisesProgress();

  const currentStep = module.exercises[currentStepIndex];
  const progressPercent = ((currentStepIndex) / module.exercises.length) * 100;

  const handleCorrect = () => {
    setStepStatus('success');
  };

  const handleIncorrect = () => {
    // Optionally handle score or health decrement here
  };

  const handleNext = () => {
    setStepStatus('idle');
    if (currentStepIndex < module.exercises.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      // update partial progress
      updateModuleProgress(module.id, ((currentStepIndex + 1) / module.exercises.length) * 100);
    } else {
      // Completed module
      updateModuleProgress(module.id, 100);
      onClose(); // go back to dashboard
    }
  };

  const renderExercise = () => {
    if (!currentStep) return null;

    // Resetting keys forces component to remount and clear state for the new step
    const key = currentStep.id;

    switch (currentStep.type) {
      case 'loanword':
        return (
          <LoanwordDecoder
            key={key}
            target={currentStep.target}
            acceptableAnswers={currentStep.answer as string[]}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        );
      case 'transliteration':
        return (
          <TransliterationBuilder
            key={key}
            target={currentStep.target}
            answer={currentStep.answer as string}
            distractors={currentStep.distractors || []}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        );
      case 'handwriting':
        return (
          <HandWritingPad
            key={key}
            target={currentStep.target}
            onSelfAssess={(success) => {
              if (success) {
                handleCorrect();
              } else {
                // If they need practice, they still proceed for now in the MVP, 
                // but we could track this to repeat the exercise later.
                handleCorrect();
              }
            }}
          />
        );
      default:
        return <div>Unknown exercise type</div>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col min-h-[70vh]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-vintage-ink transition-colors"
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
            {currentStepIndex < module.exercises.length - 1 ? 'Continue' : 'Finish Lesson'}
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
