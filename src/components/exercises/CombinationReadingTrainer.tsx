import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';
import clsx from 'clsx';
import { getLanguageName, getScriptName } from '../../utils/languageMap';
import { LanguageId } from '../../types';
import GREEK_COMBINATION_WORDS from '../../data/exercises/greekCombinationWords.json';

interface ReadingItem {
  native: string;
  translation: string;
  transliteration: string;
}

interface CombinationReadingTrainerProps {
  langId?: string;
}

export function CombinationReadingTrainer({ langId: langIdProp }: CombinationReadingTrainerProps = {}) {
  const { lang } = useParams();
  const langId = langIdProp || lang || LanguageId.GREEK;
  
  const combos = Object.keys(GREEK_COMBINATION_WORDS) as (keyof typeof GREEK_COMBINATION_WORDS)[];
  const [activeCombo, setActiveCombo] = useState<string>(combos[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const currentList = (GREEK_COMBINATION_WORDS as Record<string, ReadingItem[]>)[activeCombo] || [];
  const item = currentList[currentIndex] || { native: '', translation: '', transliteration: '' };

  useEffect(() => {
    const list = (GREEK_COMBINATION_WORDS as Record<string, ReadingItem[]>)[activeCombo] || [];
    if (list.length > 0) {
      const randomIdx = Math.floor(Math.random() * list.length);
      setCurrentIndex(randomIdx);
    }
    setRevealed(false);
  }, [activeCombo]);

  const handleNext = () => {
    setRevealed(false);
    if (currentList.length === 0) return;
    
    let nextIdx = Math.floor(Math.random() * currentList.length);
    if (nextIdx === currentIndex && currentList.length > 1) {
      nextIdx = (currentIndex + 1) % currentList.length;
    }
    setCurrentIndex(nextIdx);
  };

  const wiktionaryLang = getLanguageName(langId);
  const scriptName = getScriptName(langId);

  if (currentList.length === 0) {
    return <div className="text-center font-serif text-xl mt-12 text-vintage-red">No combination words found.</div>;
  }

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-xl bg-[#F9F6EE] border-2 border-vintage-ink shadow-[6px_6px_0_0_#2C2A29] p-8 md:p-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {combos.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCombo(c)}
              className={clsx(
                "px-4 py-2 font-serif font-bold text-lg border-2 border-vintage-ink transition-colors",
                activeCombo === c
                  ? "bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29] translate-y-[2px]"
                  : "bg-vintage-paper hover:bg-[#eae6d5]"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="text-center min-h-[160px] flex flex-col justify-center mb-8">
          <div className="text-5xl md:text-7xl font-serif font-bold text-vintage-ink mb-6">
            {item.native}
          </div>
          
          {revealed ? (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="text-2xl font-mono text-vintage-ink/80 mb-2">
                [{item.transliteration}]
              </div>
              <div className="text-xl font-serif italic text-vintage-red font-bold">
                {item.translation}
              </div>
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center">
              <span className="text-vintage-ink/40 font-mono text-sm border-b border-dashed border-vintage-ink/40 pb-1">
                Translation hidden
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-8 border-t-2 border-vintage-ink border-dashed">
          <a 
            href={`https://en.wiktionary.org/wiki/${encodeURIComponent(item.native)}#${wiktionaryLang}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm md:text-base cursor-pointer"
          >
            Wiktionary &rarr;
          </a>
          
          <div className="flex gap-4">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="vintage-button flex items-center gap-2"
              >
                <Eye size={20} /> Reveal
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="vintage-button bg-vintage-gold flex items-center gap-2"
              >
                Next Word <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
