import { useState, useRef, useEffect } from 'react';

interface HandWritingPadProps {
  target: string; // Background outline guide (if any) or answer to reveal
  answerTarget?: string; // Optional target letter to reveal if target is prompt
  promptLabel?: string; // Optional title/instruction header
  promptDisplay?: string; // Optional prompt character to show prominently (e.g. English letter)
  directionHint?: string; // Optional direction hint badge (e.g. "English → Cyrillic")
  showGuideOutline?: boolean; // Whether to show faded guide outline before reveal
  onSelfAssess: (success: boolean) => void;
}

export function HandWritingPad({
  target,
  answerTarget,
  promptLabel = 'Trace the letter',
  promptDisplay,
  directionHint,
  showGuideOutline = true,
  onSelfAssess
}: HandWritingPadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const finalAnswer = answerTarget || target;
  
  // Resize canvas for sharp rendering on retina displays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset state on target change
    setShowAnswer(false);
    clearCanvas(canvas, ctx);

    // Setup canvas resolution
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Set drawing style
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#2C2A29'; // vintage-ink

  }, [target, answerTarget]);

  const clearCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    clearCanvas(canvas, ctx);
    setShowAnswer(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (showAnswer) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || showAnswer) return;
    e.preventDefault(); // Prevent scrolling on touch
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] relative">
      {directionHint && (
        <div className="mb-4 inline-block bg-vintage-gold/30 border border-vintage-ink px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-vintage-ink">
          {directionHint}
        </div>
      )}

      <h3 className="font-bold text-vintage-blue uppercase tracking-widest text-sm mb-4 text-center">
        {promptLabel}
      </h3>

      {promptDisplay && (
        <div className="mb-6 flex flex-col items-center">
          <span className="text-6xl md:text-7xl font-serif font-bold text-vintage-ink drop-shadow-[2px_2px_0_#D9AD5B]">
            {promptDisplay}
          </span>
        </div>
      )}

      <div className="relative mb-8 select-none touch-none">
        {/* Background guide */}
        {showGuideOutline && !promptDisplay && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[150px] font-serif text-gray-300 opacity-50">
            {target}
          </div>
        )}
        
        {/* Answer overlay */}
        {showAnswer && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[150px] font-serif text-vintage-blue opacity-80 animate-pulse">
            {finalAnswer}
          </div>
        )}

        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-64 h-64 border-2 border-dashed border-vintage-ink bg-transparent cursor-crosshair relative z-10"
        />
      </div>

      {!showAnswer ? (
        <div className="w-full max-w-md flex gap-4">
          <button
            onClick={handleClear}
            className="flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink bg-white hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={() => setShowAnswer(true)}
            className="flex-1 py-3 font-serif font-bold text-lg border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29] bg-vintage-gold hover:bg-[#d4a849] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none cursor-pointer"
          >
            Reveal Answer
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md text-center">
          <h4 className="text-center font-serif text-xl mb-4">How did you do?</h4>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => onSelfAssess(false)}
              className="flex-1 py-3 font-serif font-bold text-lg border-2 border-red-800 bg-red-100 text-red-900 hover:bg-red-200 transition-colors cursor-pointer"
            >
              Needs Practice
            </button>
            <button
              onClick={() => onSelfAssess(true)}
              className="flex-1 py-3 font-serif font-bold text-lg border-2 border-green-800 bg-green-100 text-green-900 hover:bg-green-200 transition-colors shadow-[2px_2px_0_0_#166534] cursor-pointer"
            >
              I got it!
            </button>
          </div>
          <a 
            href={`https://en.wiktionary.org/wiki/${encodeURIComponent(finalAnswer.toLowerCase())}#Russian`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm cursor-pointer"
          >
            View on Wiktionary &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
