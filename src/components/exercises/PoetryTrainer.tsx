import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';
import { POETRY_DATA } from '../../data/exercises';
import type { PoetryItem } from '../../data/exercises';
import { getLanguageName } from '../../utils/languageMap';
import { LanguageId } from '../../types';

export type { PoetryItem };
export { POETRY_DATA };

interface PoetryTrainerProps {
  langId?: string;
}

export function PoetryTrainer({ langId: langIdProp }: PoetryTrainerProps = {}) {
  const { lang } = useParams();
  const langId = langIdProp || lang || LanguageId.BELARUSIAN;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const currentList = POETRY_DATA[langId] || POETRY_DATA[LanguageId.BELARUSIAN];

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * currentList.length);
    setCurrentIndex(randomIdx);
    setRevealed(false);
  }, []);

  const item = currentList[currentIndex] || currentList[0];

  const handleNext = () => {
    let nextIdx = Math.floor(Math.random() * currentList.length);
    if (nextIdx === currentIndex && currentList.length > 1) {
      nextIdx = (currentIndex + 1) % currentList.length;
    }
    setCurrentIndex(nextIdx);
    setRevealed(false);
  };

  const langName = getLanguageName(langId);

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-2 text-center">
        Read the sentence or poem out loud
      </h3>
      <p className="font-serif text-sm italic text-vintage-ink/70 mb-8 text-center max-w-md">
        Practice reading simple sentences and short 2–4 line rhymes, then click Reveal to check the English translation.
      </p>

      {/* Main Cyrillic Rhyme Card */}
      <div className="w-full max-w-lg bg-white border-2 border-vintage-ink p-6 md:p-8 flex flex-col items-center justify-center mb-8 shadow-[4px_4px_0_0_#2C2A29]">
        <div className="text-xs font-mono font-bold text-vintage-ink/60 uppercase tracking-widest mb-4 border-b border-vintage-ink/20 pb-1">
          {item.title}
        </div>

        <div className="space-y-3 text-center my-2">
          {item.lines.map((line, idx) => (
            <div key={idx} className="text-2xl md:text-3xl font-serif font-bold text-vintage-ink tracking-wide">
              {line}
            </div>
          ))}
        </div>

        {/* Revealed Details */}
        {revealed && (
          <div className="mt-6 pt-6 border-t-2 border-vintage-ink border-dashed w-full text-center animate-in fade-in">
            <div className="space-y-1.5 text-center mb-4">
              {item.translationLines.map((tLine, idx) => (
                <div key={idx} className="text-base md:text-lg font-serif italic text-vintage-red">
                  {tLine}
                </div>
              ))}
            </div>
            <a 
              href={`https://en.wiktionary.org/wiki/${encodeURIComponent(item.mainWord.toLowerCase())}#${langName}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm cursor-pointer"
            >
              View key word "{item.mainWord}" on Wiktionary &rarr;
            </a>
          </div>
        )}
      </div>

      {/* Controls */}
      {!revealed ? (
        <div className="w-full max-w-md flex gap-4">
          <button
            onClick={handleNext}
            className="flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink bg-white hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Skip Rhyme
          </button>
          <button
            onClick={() => setRevealed(true)}
            className="flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] bg-vintage-gold hover:bg-[#d4a849] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none cursor-pointer flex items-center justify-center gap-2"
          >
            <Eye size={20} /> Reveal
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md flex justify-between gap-4">
          <button
            onClick={handleNext}
            className="w-full py-3 bg-vintage-ink text-white font-serif font-bold text-xl hover:bg-gray-800 transition-colors cursor-pointer shadow-[4px_4px_0_0_#D9AD5B] flex items-center justify-center gap-2"
          >
            Next Rhyme <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
