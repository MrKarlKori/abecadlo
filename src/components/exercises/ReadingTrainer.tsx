import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';
import clsx from 'clsx';
import { READING_DATA } from '../../data/exercises';
import type { ReadingItem, ReadingLevel } from '../../data/exercises';
import { getLanguageName, getScriptName } from '../../utils/languageMap';
import { LanguageId } from '../../types';

export type { ReadingItem, ReadingLevel };
export { READING_DATA };

interface ReadingTrainerProps {
  langId?: string;
}

export function ReadingTrainer({ langId: langIdProp }: ReadingTrainerProps = {}) {
  const { lang } = useParams();
  const langId = langIdProp || lang || LanguageId.BELARUSIAN;
  
  const [level, setLevel] = useState<ReadingLevel>('easy');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const currentList = READING_DATA[langId]?.[level] || READING_DATA[LanguageId.BELARUSIAN][level];
  const item: ReadingItem = currentList[currentIndex] || currentList[0];

  // Pick a random index when level changes or component mounts
  useEffect(() => {
    const list = READING_DATA[langId]?.[level] || READING_DATA[LanguageId.BELARUSIAN][level];
    const randomIdx = Math.floor(Math.random() * list.length);
    setCurrentIndex(randomIdx);
    setRevealed(false);
  }, [level, langId]);

  const handleNext = () => {
    setRevealed(false);
    let nextIdx = Math.floor(Math.random() * currentList.length);
    if (nextIdx === currentIndex && currentList.length > 1) {
      nextIdx = (currentIndex + 1) % currentList.length;
    }
    setCurrentIndex(nextIdx);
  };

  const handleLevelChange = (newLevel: ReadingLevel) => {
    setLevel(newLevel);
  };

  const wiktionaryLang = getLanguageName(langId);
  const scriptName = getScriptName(langId);

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
      {/* Level selector tabs */}
      <div className="flex gap-2 mb-8 w-full max-w-md">
        {(['easy', 'medium', 'hard', ...(langId === LanguageId.GREEK ? ['combinations'] : [])] as ReadingLevel[]).map((lvl) => {
          const count = (READING_DATA[langId]?.[lvl] || READING_DATA[LanguageId.BELARUSIAN][lvl] || []).length;
          return (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={clsx(
                "flex-1 py-2 font-mono text-xs font-bold uppercase tracking-wider border-2 border-vintage-ink transition-all cursor-pointer",
                level === lvl
                  ? "bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]"
                  : "bg-white text-vintage-ink/70 hover:bg-gray-100"
              )}
            >
              {lvl === 'easy' ? `Easy (${count})` : lvl === 'medium' ? `Medium (${count})` : lvl === 'hard' ? `Hard (${count})` : `Combos (${count})`}
            </button>
          );
        })}
      </div>

      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-2 text-center">
        Read the {scriptName} out loud
      </h3>
      <p className="font-serif text-sm italic text-vintage-ink/70 mb-8 text-center max-w-md">
        Sound out the syllables below, then click Reveal to check your pronunciation and translation.
      </p>

      {/* Main Cyrillic Card */}
      <div className="w-full max-w-md bg-white border-2 border-vintage-ink p-8 flex flex-col items-center justify-center mb-8 shadow-[4px_4px_0_0_#2C2A29]">
        <div className="text-5xl md:text-6xl font-serif font-bold text-vintage-ink tracking-widest mb-4 text-center">
          {item.cyrillic}
        </div>

        {/* Revealed Details */}
        {revealed && (
          <div className="mt-6 pt-6 border-t-2 border-vintage-ink border-dashed w-full text-center">
            <div className="text-2xl font-mono font-bold text-vintage-blue mb-1">
              [{item.phonetic}]
            </div>
            <div className="text-xl font-serif italic text-vintage-red mb-3">
              "{item.translation}"
            </div>
            <a 
              href={`https://en.wiktionary.org/wiki/${encodeURIComponent(item.cyrillic.replace(/[-'’]/g, '').toLowerCase())}#${wiktionaryLang}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm cursor-pointer"
            >
              View on Wiktionary &rarr;
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
            Skip Word
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
            Next Word <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
