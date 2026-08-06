import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useLanguageData } from '../hooks/useLanguageData';
import { useProgress } from '../hooks/useProgress';
import clsx from 'clsx';

export function LessonsPage() {
  const { lang, id } = useParams();
  const langId = lang || 'ru';
  const { characters, loading, error } = useLanguageData(langId);
  const { progress, markCompleted, toggleCompleted } = useProgress(langId);
  const navigate = useNavigate();

  // State for swipe gestures
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    if (id && characters.length > 0) {
      // Mark as completed merely by visiting, as per PRD "automatically marks as viewed/completed"
      // Or we can let the toggle handle "Mastered". Let's auto-mark it as viewed if we wanted, 
      // but PRD says "automatically marks the letter as viewed/completed in localStorage upon visiting" 
      // AND "offer a manual 'Mastered' toggle". 
      // Let's mark it on visit.
      markCompleted(id);
    }
  }, [id, characters, markCompleted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!characters.length) return;
      const currentIndex = characters.findIndex(c => c.id === id);
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigate(`/${langId}/lesson/${characters[currentIndex - 1].id}`);
      } else if (e.key === 'ArrowRight' && currentIndex < characters.length - 1) {
        navigate(`/${langId}/lesson/${characters[currentIndex + 1].id}`);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id, characters, navigate, langId]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    const currentIndex = characters.findIndex(c => c.id === id);

    if (isLeftSwipe && currentIndex < characters.length - 1) {
      navigate(`/${langId}/lesson/${characters[currentIndex + 1].id}`);
    } else if (isRightSwipe && currentIndex > 0) {
      navigate(`/${langId}/lesson/${characters[currentIndex - 1].id}`);
    }
  };

  if (loading) return <div className="text-center font-serif text-2xl mt-12 animate-pulse">Fetching Primer...</div>;
  if (error) return <div className="text-center font-serif text-vintage-red text-xl mt-12">{error}</div>;

  if (!id) {
    return <Navigate to={`/${langId}/lesson/${characters[0]?.id}`} replace />;
  }

  const currentIndex = characters.findIndex(c => c.id === id);
  if (currentIndex === -1) {
    return <div className="text-center font-serif mt-12">Character not found in archive.</div>;
  }

  const char = characters[currentIndex];
  const isCompleted = progress.completedLetters.includes(char.id);

  return (
    <div 
      className="max-w-2xl mx-auto flex flex-col min-h-[70vh]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(`/${langId}/alphabet`)}
          className="text-vintage-ink hover:text-vintage-blue font-serif font-bold underline underline-offset-4 decoration-2"
        >
          &larr; Back to Alphabet
        </button>
        <span className="font-mono text-sm">
          {currentIndex + 1} / {characters.length}
        </span>
      </div>

      <div className="vintage-card flex-1 flex flex-col p-8 md:p-12 relative bg-[#F9F6EE] border-4">
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
            <div className="text-2xl font-mono border-t-2 border-vintage-ink pt-2 inline-block">
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

        <div className="mt-auto pt-8 border-t-2 border-vintage-ink border-dashed flex justify-between items-center">
           <button
            onClick={() => toggleCompleted(char.id)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 border-2 border-vintage-ink font-bold font-serif transition-colors",
              isCompleted 
                ? "bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]" 
                : "bg-transparent hover:bg-gray-100"
            )}
          >
            <Check size={20} />
            {isCompleted ? "Mastered" : "Mark Mastered"}
          </button>
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
