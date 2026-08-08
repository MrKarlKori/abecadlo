import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { READING_DATA } from './ReadingTrainer';
import type { ReadingLevel, ReadingItem } from './ReadingTrainer';

export type PromptMode = 'mirror' | 'eng-translation' | 'ru-translation';

const CYRILLIC_ALPHABET = [
  'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И',
  'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т',
  'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь',
  'Э', 'Ю', 'Я'
];

const ENGLISH_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

export function BuildingTrainer() {
  const [level, setLevel] = useState<ReadingLevel>('easy');
  const [promptMode, setPromptMode] = useState<PromptMode>('mirror');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [pool, setPool] = useState<{ id: string; char: string; used: boolean }[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const currentList = READING_DATA[level];
  const item: ReadingItem = currentList[currentIndex] || currentList[0];

  const getTargetAndAlphabet = (readingItem: ReadingItem, mode: PromptMode) => {
    if (mode === 'ru-translation') {
      const rawEng = readingItem.translation.toUpperCase().replace(/[^A-Z]/g, '');
      const cleanEng = rawEng.length > 0 ? rawEng : 'YES';
      return {
        targetWord: cleanEng,
        alphabet: ENGLISH_ALPHABET,
        promptLabel: "Build English translation for Russian prompt",
        promptDisplay: readingItem.cyrillic.replace(/[-'’]/g, '').toUpperCase()
      };
    }

    const cleanCyr = readingItem.cyrillic.replace(/[-'’]/g, '').toUpperCase();
    if (mode === 'eng-translation') {
      return {
        targetWord: cleanCyr,
        alphabet: CYRILLIC_ALPHABET,
        promptLabel: "Build Cyrillic word for English translation",
        promptDisplay: `"${readingItem.translation.toUpperCase()}"`
      };
    }

    // default: mirror letters (phonetic sound -> Cyrillic word)
    return {
      targetWord: cleanCyr,
      alphabet: CYRILLIC_ALPHABET,
      promptLabel: "Mirror phonetic sound to Cyrillic letters",
      promptDisplay: `[${readingItem.phonetic}]`
    };
  };

  const { targetWord, alphabet, promptLabel, promptDisplay } = getTargetAndAlphabet(item, promptMode);

  // Reset and set up letter tiles pool for the current word and alphabet
  const setupWord = (wordToBuild: string, alphabetSource: string[]) => {
    const chars = wordToBuild.split('');
    const uniqueTargetChars = new Set(chars);

    // Pick 4 distractor letters not in target word
    const availableDistractors = alphabetSource.filter(c => !uniqueTargetChars.has(c));
    const shuffledDistractors = [...availableDistractors].sort(() => Math.random() - 0.5).slice(0, 4);

    const allChars = [...chars, ...shuffledDistractors];
    const shuffledPool = allChars
      .map(char => ({ char, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((itemTile, index) => ({ id: `tile-${index}`, char: itemTile.char, used: false }));

    setSlots(new Array(chars.length).fill(null));
    setPool(shuffledPool);
    setStatus('idle');
  };

  // Pick random word on level or prompt mode change
  useEffect(() => {
    const list = READING_DATA[level];
    const randomIdx = Math.floor(Math.random() * list.length);
    setCurrentIndex(randomIdx);

    const selectedItem = list[randomIdx] || list[0];
    const { targetWord: wordToBuild, alphabet: alphabetSource } = getTargetAndAlphabet(selectedItem, promptMode);
    setupWord(wordToBuild, alphabetSource);
  }, [level, promptMode]);

  const handleNext = () => {
    let nextIdx = Math.floor(Math.random() * currentList.length);
    if (nextIdx === currentIndex && currentList.length > 1) {
      nextIdx = (currentIndex + 1) % currentList.length;
    }
    setCurrentIndex(nextIdx);

    const selectedItem = currentList[nextIdx] || currentList[0];
    const { targetWord: wordToBuild, alphabet: alphabetSource } = getTargetAndAlphabet(selectedItem, promptMode);
    setupWord(wordToBuild, alphabetSource);
  };

  const handleLevelChange = (newLevel: ReadingLevel) => {
    setLevel(newLevel);
  };

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
    } else {
      setStatus('error');
    }
  };

  const isFull = slots.length > 0 && slots.every(s => s !== null);

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
      {/* Level selector tabs */}
      <div className="flex gap-2 mb-4 w-full max-w-md">
        {(['easy', 'medium', 'hard'] as ReadingLevel[]).map((lvl) => (
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
            {lvl === 'easy' ? 'Easy (100)' : lvl === 'medium' ? 'Medium (100)' : 'Hard (100)'}
          </button>
        ))}
      </div>

      {/* Mode setting selector (below complexity levels) */}
      <div className="flex gap-1.5 mb-8 w-full max-w-md bg-white p-2 border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29]">
        <button
          type="button"
          onClick={() => setPromptMode('mirror')}
          className={clsx(
            "flex-1 py-1.5 px-1 font-mono text-[11px] font-bold uppercase transition-all cursor-pointer border border-vintage-ink text-center",
            promptMode === 'mirror'
              ? "bg-vintage-gold text-vintage-ink shadow-[1px_1px_0_0_#2C2A29]"
              : "bg-vintage-paper text-vintage-ink/70 hover:bg-gray-100"
          )}
        >
          Mirror Letters
        </button>
        <button
          type="button"
          onClick={() => setPromptMode('eng-translation')}
          className={clsx(
            "flex-1 py-1.5 px-1 font-mono text-[11px] font-bold uppercase transition-all cursor-pointer border border-vintage-ink text-center",
            promptMode === 'eng-translation'
              ? "bg-vintage-gold text-vintage-ink shadow-[1px_1px_0_0_#2C2A29]"
              : "bg-vintage-paper text-vintage-ink/70 hover:bg-gray-100"
          )}
        >
          English Trans.
        </button>
        <button
          type="button"
          onClick={() => setPromptMode('ru-translation')}
          className={clsx(
            "flex-1 py-1.5 px-1 font-mono text-[11px] font-bold uppercase transition-all cursor-pointer border border-vintage-ink text-center",
            promptMode === 'ru-translation'
              ? "bg-vintage-gold text-vintage-ink shadow-[1px_1px_0_0_#2C2A29]"
              : "bg-vintage-paper text-vintage-ink/70 hover:bg-gray-100"
          )}
        >
          Russian Trans.
        </button>
      </div>

      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-3 text-center">
        {promptLabel}
      </h3>

      <div className="text-4xl md:text-5xl font-serif font-bold text-vintage-ink mb-10 text-center drop-shadow-[2px_2px_0_#D9AD5B]">
        {promptDisplay}
      </div>

      {/* Target letter slots */}
      <div className="flex gap-2 mb-10 flex-wrap justify-center min-h-[4.5rem]">
        {slots.map((poolId, i) => {
          const char = poolId ? pool.find(p => p.id === poolId)?.char : null;
          return (
            <div
              key={`slot-${i}`}
              onClick={() => handleSlotClick(i)}
              className={clsx(
                "w-12 h-16 md:w-16 md:h-20 border-2 border-dashed border-vintage-ink flex items-center justify-center text-3xl font-bold font-serif cursor-pointer transition-all",
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

      {/* Letter tiles pool */}
      <div className="flex gap-2 mb-10 flex-wrap justify-center max-w-md">
        {pool.map(itemTile => (
          <div
            key={itemTile.id}
            onClick={() => handlePoolClick(itemTile)}
            className={clsx(
              "w-12 h-16 md:w-16 md:h-20 border-2 border-vintage-ink flex items-center justify-center text-3xl font-bold font-serif transition-all select-none",
              itemTile.used
                ? "opacity-0 cursor-default"
                : "bg-[#f5ebd6] shadow-[2px_2px_0_0_#2C2A29] cursor-pointer hover:-translate-y-1 hover:bg-white active:translate-y-0 active:shadow-none"
            )}
          >
            {itemTile.char}
          </div>
        ))}
      </div>

      {/* Controls */}
      {status !== 'success' ? (
        <div className="w-full max-w-md flex gap-4">
          <button
            onClick={handleNext}
            className="flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink bg-white hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} /> Skip
          </button>
          <button
            onClick={checkAnswer}
            disabled={!isFull}
            className={clsx(
              "flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
              !isFull ? "opacity-50 cursor-not-allowed bg-gray-200" : "bg-vintage-gold cursor-pointer hover:bg-[#d4a849]"
            )}
          >
            Check
          </button>
        </div>
      ) : (
        <button
          onClick={handleNext}
          className="w-full max-w-md py-3 bg-vintage-ink text-white font-serif font-bold text-xl hover:bg-gray-800 transition-colors cursor-pointer shadow-[4px_4px_0_0_#D9AD5B] flex items-center justify-center gap-2"
        >
          Next Word <ArrowRight size={24} />
        </button>
      )}

      {status === 'error' && (
        <div className="mt-6 text-red-600 font-mono text-center bg-red-50 p-4 border border-red-200 w-full max-w-md animate-in fade-in">
          <p>Not quite right! Try rearranging or checking the letters.</p>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 text-green-700 font-mono text-center bg-green-50 p-4 border border-green-300 w-full max-w-md animate-in fade-in flex flex-col items-center">
          <p className="font-bold text-lg">Correct!</p>
          <p className="text-sm mt-1">{item.cyrillic.replace(/[-'’]/g, '').toUpperCase()} = "{item.translation}" [{item.phonetic}]</p>
          <a 
            href={`https://en.wiktionary.org/wiki/${encodeURIComponent(item.cyrillic.replace(/[-'’]/g, '').toLowerCase())}#Russian`}
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm cursor-pointer"
          >
            View on Wiktionary &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
