import { useState, useEffect } from 'react';
import { GREEK_COMBINATIONS } from '../../data/greekCombinations';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

export function CombinationQuizTrainer() {
  const [currentCombo, setCurrentCombo] = useState(GREEK_COMBINATIONS[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateQuestion = () => {
    const randomCombo = GREEK_COMBINATIONS[Math.floor(Math.random() * GREEK_COMBINATIONS.length)];
    setCurrentCombo(randomCombo);
    
    // Correct answer
    const correct = randomCombo.phonetic;
    
    // Fake answers - pick from other combinations or some random generic sounds
    const fakePool = [
      'ts', 'dz', 'p', 'b', 'v', 'f', 'g', 'gh', 'k', 'ch', 'm', 'n', 'l', 'r', 's', 'z', 'th', 'dh',
      'a', 'e', 'i', 'o', 'u', 'ou', 'av/af', 'ev/ef', 'ai', 'oi', 'ei', 'ng'
    ].filter(s => s !== correct);
    
    // Shuffle and pick 3 fakes
    const fakes = fakePool.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Mix and shuffle
    const allOptions = [correct, ...fakes].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setSelected(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSelect = (option: string) => {
    if (selected) return; // Prevent multiple clicks
    setSelected(option);
    setIsCorrect(option === currentCombo.phonetic);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative w-full max-w-md mx-auto">
      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-2 text-center">
        Combination Sound Quiz
      </h3>
      <p className="font-serif text-sm italic text-vintage-ink/70 mb-8 text-center">
        Select the correct phonetic sound for the Greek combination below.
      </p>

      <div className="w-full bg-white border-2 border-vintage-ink p-8 flex flex-col items-center justify-center mb-8 shadow-[4px_4px_0_0_#2C2A29]">
        <div className="text-6xl md:text-7xl font-serif font-bold text-vintage-ink tracking-widest text-center">
          {currentCombo.combination}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            disabled={selected !== null}
            className={clsx(
              "py-4 font-mono font-bold text-xl border-2 border-vintage-ink transition-all",
              !selected ? "bg-white hover:bg-gray-100 cursor-pointer shadow-[2px_2px_0_0_#2C2A29] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none" : "",
              selected === opt && isCorrect ? "bg-green-200 text-green-900 border-green-700" : "",
              selected === opt && !isCorrect ? "bg-red-200 text-red-900 border-red-700" : "",
              selected && opt === currentCombo.phonetic && !isCorrect ? "bg-green-100 text-green-800 border-green-600 border-dashed" : "",
              selected && opt !== selected && opt !== currentCombo.phonetic ? "bg-gray-100 text-gray-400 border-gray-300" : ""
            )}
          >
            [{opt}]
          </button>
        ))}
      </div>

      {selected && (
        <div className="w-full animate-in fade-in zoom-in-95 duration-200">
          <div className={clsx(
            "p-4 mb-6 border-2 font-serif text-center font-bold",
            isCorrect ? "bg-green-100 border-green-700 text-green-900" : "bg-red-100 border-red-700 text-red-900"
          )}>
            {isCorrect ? "Correct!" : `Incorrect. The right sound is [${currentCombo.phonetic}].`}
          </div>
          <button
            onClick={generateQuestion}
            className="w-full py-3 bg-vintage-gold border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] font-serif font-bold text-lg flex justify-center items-center gap-2 hover:bg-[#d4a849] transition-colors cursor-pointer"
          >
            Next Question <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
