import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { getScriptName } from '../../utils/languageMap';
import { LanguageId } from '../../types';

interface TransliterationBuilderProps {
  target: string; // The target word to build
  answer: string; // The English prompt
  distractors: string[];
  langId?: string;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export function TransliterationBuilder({ target, answer, distractors, langId = LanguageId.BELARUSIAN, onCorrect, onIncorrect }: TransliterationBuilderProps) {
  const scriptName = getScriptName(langId);
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [pool, setPool] = useState<{id: string, char: string, used: boolean}[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Initialize slots and pool
    const initialSlots = new Array(target.length).fill(null);
    setSlots(initialSlots);
    setStatus('idle');

    const chars = target.split('');
    const allChars = [...chars, ...distractors];
    // Shuffle pool
    const shuffled = allChars
      .map(char => ({ char, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item, index) => ({ id: `pool-${index}`, char: item.char, used: false }));
    
    setPool(shuffled);
  }, [target, distractors]);

  const handlePoolClick = (poolItem: {id: string, char: string, used: boolean}) => {
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
    if (constructed === target) {
      setStatus('success');
      onCorrect();
    } else {
      setStatus('error');
      onIncorrect();
    }
  };

  const isFull = slots.every(s => s !== null);

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29]">
      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-8">
        Build the {scriptName} word for
      </h3>
      
      <div className="text-4xl md:text-5xl font-serif font-bold text-vintage-ink mb-12">
        "{answer}"
      </div>

      <div className="flex gap-2 mb-12 flex-wrap justify-center min-h-[4rem]">
        {slots.map((poolId, i) => {
          const char = poolId ? pool.find(p => p.id === poolId)?.char : null;
          return (
            <div 
              key={`slot-${i}`}
              onClick={() => handleSlotClick(i)}
              className={clsx(
                "w-12 h-16 md:w-16 md:h-20 border-2 border-dashed border-vintage-ink flex items-center justify-center text-3xl font-bold font-serif cursor-pointer transition-all",
                char ? "bg-white border-solid shadow-[2px_2px_0_0_#2C2A29]" : "bg-transparent",
                status === 'error' && char ? "border-red-500 text-red-600" : "",
                status === 'success' && char ? "border-green-500 text-green-600 bg-green-50" : ""
              )}
            >
              {char}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mb-12 flex-wrap justify-center">
        {pool.map(item => (
          <div
            key={item.id}
            onClick={() => handlePoolClick(item)}
            className={clsx(
              "w-12 h-16 md:w-16 md:h-20 border-2 border-vintage-ink flex items-center justify-center text-3xl font-bold font-serif transition-all",
              item.used ? "opacity-0 cursor-default" : "bg-[#f5ebd6] shadow-[2px_2px_0_0_#2C2A29] cursor-pointer hover:-translate-y-1 hover:bg-white active:translate-y-0 active:shadow-none"
            )}
          >
            {item.char}
          </div>
        ))}
      </div>

      <button
        onClick={checkAnswer}
        disabled={!isFull || status === 'success'}
        className={clsx(
          "w-full max-w-md py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
          !isFull || status === 'success' ? "opacity-50 cursor-not-allowed bg-gray-200" : "bg-vintage-gold cursor-pointer hover:bg-[#d4a849]"
        )}
      >
        Check Answer
      </button>

      {status === 'error' && (
        <div className="mt-6 text-red-600 font-mono text-center">
          <p>Not quite right. Try again!</p>
        </div>
      )}
    </div>
  );
}
