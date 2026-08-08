import { useState } from 'react';
import clsx from 'clsx';

interface LoanwordDecoderProps {
  target: string;
  acceptableAnswers: string[];
  onCorrect: () => void;
  onIncorrect: () => void;
}

export function LoanwordDecoder({ target, acceptableAnswers, onCorrect, onIncorrect }: LoanwordDecoderProps) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const checkAnswer = () => {
    const isCorrect = acceptableAnswers.some(ans => ans.toLowerCase() === input.trim().toLowerCase());
    if (isCorrect) {
      setStatus('success');
      onCorrect();
    } else {
      setStatus('error');
      onIncorrect();
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29]">
      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-8">
        Translate to English
      </h3>
      
      <div className="text-6xl md:text-8xl font-serif font-bold text-vintage-ink mb-12 tracking-wider">
        {target}
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setStatus('idle');
          }}
          placeholder="Type english translation..."
          className={clsx(
            "w-full px-4 py-3 font-mono text-xl border-2 outline-none transition-colors text-center",
            status === 'idle' ? "border-vintage-ink bg-white" : 
            status === 'success' ? "border-green-600 bg-green-50 text-green-800" :
            "border-red-600 bg-red-50 text-red-800"
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              checkAnswer();
            }
          }}
        />
        
        <button
          onClick={checkAnswer}
          disabled={!input.trim() || status === 'success'}
          className={clsx(
            "w-full py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none",
            !input.trim() || status === 'success' ? "opacity-50 cursor-not-allowed bg-gray-200" : "bg-vintage-gold cursor-pointer hover:bg-[#d4a849]"
          )}
        >
          Check Answer
        </button>
      </div>

      {status === 'error' && (
        <div className="mt-6 text-red-600 font-mono text-center bg-red-50 p-4 border border-red-200 w-full max-w-md">
          <p>Incorrect. Acceptable answers:</p>
          <p className="font-bold mt-1">{acceptableAnswers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
