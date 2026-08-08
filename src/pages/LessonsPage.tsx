import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Lock, Play, RotateCcw, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { getLessonModules } from '../data/mockLessonsData';
import { useExercisesProgress } from '../hooks/useExercisesProgress';
import { useLanguageData } from '../hooks/useLanguageData';
import { useProgress } from '../hooks/useProgress';
import { ExerciseSession } from '../components/exercises/ExerciseSession';
import { getLanguageName } from '../utils/languageMap';
import { LanguageId } from '../types';

export function LessonsPage() {
  const { lang, id } = useParams();
  const langId = lang || LanguageId.BELARUSIAN;
  const modules = getLessonModules(langId);
  const { characters, loading, error, registryEntry } = useLanguageData(langId);
  const { progress: letterProgress, toggleCompleted } = useProgress(langId);
  const { progress: moduleProgressData, recordCompletedSession } = useExercisesProgress(langId);
  const navigate = useNavigate();

  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  useEffect(() => {
    setActiveModuleId(null);
  }, [langId]);

  // Touch swipe state for letter detail view
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const location = useLocation();
  const basePath = location.pathname.includes('/alphabet') ? 'alphabet' : 'lesson';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!id || !characters.length) return;
      const currentIndex = characters.findIndex(c => c.id === id);
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigate(`/${langId}/${basePath}/${characters[currentIndex - 1].id}`);
      } else if (e.key === 'ArrowRight' && currentIndex < characters.length - 1) {
        navigate(`/${langId}/${basePath}/${characters[currentIndex + 1].id}`);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id, characters, navigate, langId, basePath]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!id || !touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    const currentIndex = characters.findIndex(c => c.id === id);

    if (isLeftSwipe && currentIndex < characters.length - 1) {
      navigate(`/${langId}/${basePath}/${characters[currentIndex + 1].id}`);
    } else if (isRightSwipe && currentIndex > 0) {
      navigate(`/${langId}/${basePath}/${characters[currentIndex - 1].id}`);
    }
  };

  if (loading) return <div className="text-center font-serif text-2xl mt-12 animate-pulse">Loading Lessons...</div>;
  if (error) return <div className="text-center font-serif text-vintage-red text-xl mt-12">{error}</div>;

  // Single Letter Detail View (when :id is passed)
  if (id) {
    const currentIndex = characters.findIndex(c => c.id === id);
    if (currentIndex === -1) {
      return <div className="text-center font-serif mt-12">Character not found in archive.</div>;
    }

    const char = characters[currentIndex];
    const isCompleted = letterProgress.completedLetters.includes(char.id);

    return (
      <div 
        className="max-w-2xl mx-auto flex flex-col min-h-[70vh]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate(`/${langId}/${basePath}`)}
            className="text-vintage-ink hover:text-vintage-blue font-serif font-bold underline underline-offset-4 decoration-2 cursor-pointer"
          >
            &larr; {basePath === 'alphabet' ? 'Back to Alphabet' : 'Back to Lessons'}
          </button>
          <span className="font-mono text-sm">
            {currentIndex + 1} / {characters.length}
          </span>
        </div>

        <div className="bg-[#F9F6EE] border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] flex-1 flex flex-col p-8 md:p-12 relative">
          {isCompleted && (
            <div className="vintage-stamp text-xl md:text-2xl py-2 px-6 border-4 right-4 top-4 z-10 pointer-events-none shadow-sm">
              ПРОЙДЕНО
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
            <div className="text-center">
              <div className="text-8xl md:text-[120px] font-serif font-bold leading-none mb-2 text-vintage-ink drop-shadow-[4px_4px_0_#D9AD5B]">
                {char.character}{char.characterLower}
              </div>
              <div className="text-2xl font-mono border-t-2 border-vintage-ink pt-2 inline-block mt-3">
                [{char.phonetic}]
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="bg-vintage-paper border-2 border-vintage-ink p-4 shadow-[4px_4px_0_0_#3A6B7E]">
                <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-1">Pronunciation</h3>
                <p className="font-serif text-xl italic">"{char.soundsLike}"</p>
              </div>
              
              <div className="bg-vintage-paper border-2 border-vintage-ink p-4 shadow-[4px_4px_0_0_#C84B31]">
                <h3 className="font-bold text-vintage-red uppercase tracking-widest text-sm mb-1">Example</h3>
                <p className="font-serif text-3xl font-bold mb-1">{char.example.native}</p>
                <p className="font-mono text-lg">{char.example.translation}</p>
                {char.example.transliteration && (
                  <p className="font-mono text-sm text-vintage-ink/70">({char.example.transliteration})</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t-2 border-vintage-ink border-dashed flex justify-between items-center gap-6">
            <button
              onClick={() => toggleCompleted(char.id)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 border-2 border-vintage-ink font-bold font-serif cursor-pointer",
                isCompleted 
                  ? "bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]" 
                  : "bg-transparent hover:bg-gray-100"
              )}
            >
              <Check size={20} />
              {isCompleted ? "Mastered" : "Mark Mastered"}
            </button>
            <a 
              href={`https://en.wiktionary.org/wiki/${encodeURIComponent(char.characterLower)}#${registryEntry?.name || getLanguageName(langId)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-lg cursor-pointer"
            >
              View on Wiktionary &rarr;
            </a>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            disabled={currentIndex === 0}
            onClick={() => navigate(`/${langId}/lesson/${characters[currentIndex - 1].id}`)}
            className="vintage-button flex items-center gap-2"
          >
            <ChevronLeft size={20} /> Previous
          </button>
          <button
            disabled={currentIndex === characters.length - 1}
            onClick={() => navigate(`/${langId}/lesson/${characters[currentIndex + 1].id}`)}
            className="vintage-button flex items-center gap-2"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // Active Module Session
  if (activeModuleId) {
    const module = modules.find(m => m.id === activeModuleId);
    if (module) {
      return (
        <ExerciseSession 
          module={module} 
          onClose={() => setActiveModuleId(null)} 
          onComplete={() => {
            setActiveModuleId(null);
          }}
        />
      );
    }
  }

  // Lesson Modules Dashboard
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl uppercase tracking-widest border-b-2 border-vintage-ink pb-4 inline-block mb-4">
          Lesson Modules
        </h1>
        <p className="font-serif text-xl italic text-vintage-ink/80">
          A structured learning path based on the "Divide and Conquer" method.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((module, index) => {
          const isUnlocked = moduleProgressData.unlockedModules.includes(module.id);
          const completedSessions = moduleProgressData.moduleSessions[module.id] || 0;
          const isCompleted = completedSessions >= 10;
          const progressPercent = Math.min(100, Math.round((completedSessions / 10) * 100));

          return (
            <div 
              key={module.id}
              className={clsx(
                "relative bg-vintage-paper border-2 border-vintage-ink p-6 flex flex-col transition-all",
                isUnlocked 
                  ? "shadow-[6px_6px_0_0_#2C2A29] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#2C2A29]" 
                  : "opacity-75 grayscale bg-gray-100 shadow-[4px_4px_0_0_#9CA3AF]"
              )}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] flex items-center justify-center z-10 p-4 text-center">
                  <div className="bg-vintage-paper border-2 border-vintage-ink p-4 shadow-[4px_4px_0_0_#2C2A29] max-w-xs">
                    <Lock size={32} className="text-vintage-ink mx-auto mb-2" />
                    <p className="font-mono text-xs font-bold text-vintage-ink">
                      Complete 10 sessions in Module {index} to unlock
                    </p>
                  </div>
                </div>
              )}

              {isCompleted && isUnlocked && (
                <div className="vintage-stamp text-xs py-1 px-3 border-2 right-4 top-4 z-10 pointer-events-none shadow-sm text-vintage-blue border-vintage-blue">
                  MASTERED (10/10)
                </div>
              )}

              <div className="mb-4">
                <span className="font-mono text-sm font-bold text-vintage-ink/60 block mb-1">
                  MODULE {index + 1}
                </span>
                <h2 className="text-2xl font-bold uppercase tracking-wide text-vintage-ink mb-2">
                  {module.title}
                </h2>
                <div className="font-serif text-xl text-vintage-blue tracking-widest">
                  {module.description}
                </div>
              </div>

              <div className="mt-auto pt-6">
                {isUnlocked ? (
                  <>
                    <div className="flex justify-between items-center mb-2 font-mono text-xs font-bold uppercase tracking-wider">
                      <span>Sessions Completed</span>
                      <span>{completedSessions} / 10 ({progressPercent}%)</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 border-2 border-vintage-ink mb-6">
                      <div 
                        className="h-full bg-vintage-gold transition-all duration-500" 
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="mb-6 pt-4 text-center font-mono text-xs text-gray-500 italic border-t border-dashed border-gray-300">
                    Complete 10 sessions in Module {index} to unlock
                  </div>
                )}

                <button
                  onClick={() => setActiveModuleId(module.id)}
                  disabled={!isUnlocked}
                  className={clsx(
                    "w-full flex items-center justify-center gap-2 py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] transition-all",
                    isUnlocked 
                      ? "bg-vintage-gold hover:bg-[#d4a849] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none cursor-pointer" 
                      : "bg-gray-300 text-gray-600 cursor-not-allowed border-gray-400 shadow-none"
                  )}
                >
                  {!isUnlocked ? (
                    <><Lock size={20} /> Module Locked</>
                  ) : isCompleted ? (
                    <><RotateCcw size={20} /> Review Lesson</>
                  ) : completedSessions > 0 ? (
                    <><Play size={20} /> Continue ({completedSessions}/10)</>
                  ) : (
                    <><Play size={20} /> Start Lesson</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
