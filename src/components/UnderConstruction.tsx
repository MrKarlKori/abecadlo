interface UnderConstructionProps {
  description?: string;
}

export function UnderConstruction({ description }: UnderConstructionProps) {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] p-12 w-full transform -rotate-2">
        <h1 className="text-4xl md:text-5xl font-serif text-vintage-red font-bold mb-4 uppercase tracking-widest border-b-4 border-vintage-ink pb-4">
          Under Construction
        </h1>
        <div className="text-xl md:text-2xl font-mono text-vintage-ink my-8">
          By Order of the Technical Bureau
        </div>
        <p className="font-serif italic text-lg opacity-80">
          {description ||
            'This facility is currently being upgraded. Please report back during Phase 2 for new features.'}
        </p>
        <div className="mt-8 border-t-2 border-dashed border-vintage-ink pt-4">
          <div className="vintage-stamp text-sm relative rotate-0 inline-block pointer-events-none">
            AUTHORIZED PERSONNEL ONLY
          </div>
        </div>
      </div>
    </div>
  );
}
