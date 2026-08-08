import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { READING_DATA } from './ReadingTrainer';
import type { ReadingLevel } from './ReadingTrainer';

interface TypingTrainerProps {
  langId?: string;
}

export function TypingTrainer({ langId: langIdProp }: TypingTrainerProps = {}) {
  const { lang } = useParams();
  const langId = langIdProp || lang || 'ru';

  const [level, setLevel] = useState<ReadingLevel>('easy');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const currentList = READING_DATA[langId]?.[level] || READING_DATA['ru'][level];
  const item = currentList[currentIndex] || currentList[0];

  const displayWord = item.cyrillic.replace(/[-'’ ]/g, '');

  // Generate acceptable answers list
  const acceptableAnswers = [
    item.translation.toLowerCase(),
    item.phonetic.toLowerCase(),
    item.phonetic.replace(/[-'’]/g, '').toLowerCase()
  ];

  // Pick random index when level changes or component mounts
  useEffect(() => {
    const list = READING_DATA[langId]?.[level] || READING_DATA['ru'][level];
    const randomIdx = Math.floor(Math.random() * list.length);
    setCurrentIndex(randomIdx);
    setInput('');
    setStatus('idle');
  }, [level, langId]);

  const handleNext = () => {
    setInput('');
    setStatus('idle');
    let nextIdx = Math.floor(Math.random() * currentList.length);
    if (nextIdx === currentIndex && currentList.length > 1) {
      nextIdx = (currentIndex + 1) % currentList.length;
    }
    setCurrentIndex(nextIdx);
  };

  const handleLevelChange = (newLevel: ReadingLevel) => {
    setLevel(newLevel);
  };

  const checkAnswer = () => {
    const userInput = input.trim().toLowerCase();
    const isCorrect = acceptableAnswers.some(ans => {
      if (ans === userInput) return true;
      const parts = ans.split('/').map(p => p.trim());
      return parts.includes(userInput);
    });

    if (isCorrect) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
      {/* Level selector tabs */}
      <div className="flex gap-2 mb-8 w-full max-w-md">
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
            {lvl === 'easy' ? 'Easy (Short)' : lvl === 'medium' ? 'Medium (Words)' : 'Hard (Complex)'}
          </button>
        ))}
      </div>

      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-4 text-center">
        Type the English translation or sound
      </h3>

      {/* Target Cyrillic Word */}
      <div className="text-5xl md:text-7xl font-serif font-bold text-vintage-ink mb-10 tracking-wider text-center drop-shadow-[2px_2px_0_#D9AD5B]">
        {displayWord}
      </div>

      {/* Input Form */}
      <div className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setStatus('idle');
          }}
          placeholder="Type English translation or sound..."
          className={clsx(
            "w-full px-4 py-3 font-mono text-xl border-2 outline-none transition-colors text-center",
            status === 'idle' ? "border-vintage-ink bg-white" : 
            status === 'success' ? "border-green-600 bg-green-50 text-green-800" :
            "border-red-600 bg-red-50 text-red-800"
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim() && status !== 'success') {
              checkAnswer();
            }
          }}
        />

        {status !== 'success' ? (
          <div className="flex gap-4">
            <button
              onClick={handleNext}
              className="flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink bg-white hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> Skip
            </button>
            <button
              onClick={checkAnswer}
              disabled={!input.trim()}
              className={clsx(
                "flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
                !input.trim() ? "opacity-50 cursor-not-allowed bg-gray-200" : "bg-vintage-gold cursor-pointer hover:bg-[#d4a849]"
              )}
            >
              Check
            </button>
          </div>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-vintage-ink text-white font-serif font-bold text-xl hover:bg-gray-800 transition-colors cursor-pointer shadow-[4px_4px_0_0_#D9AD5B] flex items-center justify-center gap-2"
          >
            Next Word <ArrowRight size={24} />
          </button>
        )}
      </div>

      {status === 'error' && (
        <div className="mt-6 text-red-600 font-mono text-center bg-red-50 p-4 border border-red-200 w-full max-w-md animate-in fade-in flex flex-col items-center">
          <p>Not quite right!</p>
          <p className="font-bold mt-1 text-vintage-ink">
            Translation: "{item.translation}" [{item.phonetic}]
          </p>
          <a 
            href={`https://en.wiktionary.org/wiki/${encodeURIComponent(displayWord.toLowerCase())}#${langId === 'be' ? 'Belarusian' : 'Russian'}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm cursor-pointer"
          >
            View on Wiktionary &rarr;
          </a>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 text-green-700 font-mono text-center bg-green-50 p-4 border border-green-300 w-full max-w-md animate-in fade-in flex flex-col items-center">
          <p className="font-bold text-lg">Correct!</p>
          <p className="text-sm mt-1">{item.cyrillic} = "{item.translation}" [{item.phonetic}]</p>
          <a 
            href={`https://en.wiktionary.org/wiki/${encodeURIComponent(displayWord.toLowerCase())}#${langId === 'be' ? 'Belarusian' : 'Russian'}`}
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
