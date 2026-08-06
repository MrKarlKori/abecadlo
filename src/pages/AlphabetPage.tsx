import { useParams, useNavigate } from 'react-router-dom';
import { useLanguageData } from '../hooks/useLanguageData';
import { useProgress } from '../hooks/useProgress';

export function AlphabetPage() {
  const { lang } = useParams();
  const langId = lang || 'ru';
  const { characters, loading, error } = useLanguageData(langId);
  const { progress } = useProgress(langId);
  const navigate = useNavigate();

  if (loading) return <div className="text-center font-serif text-2xl mt-12 animate-pulse">Loading Archive...</div>;
  if (error) return <div className="text-center font-serif text-vintage-red text-xl mt-12">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl md:text-5xl text-center mb-8 uppercase tracking-widest border-b-2 border-vintage-ink pb-4">
        The Alphabet
      </h1>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-4">
        {characters.map(char => {
          const isCompleted = progress.completedLetters.includes(char.id);
          
          return (
            <button
              key={char.id}
              onClick={() => navigate(`/${langId}/lesson/${char.id}`)}
              className="vintage-card relative flex flex-col items-center justify-center min-h-24 md:min-h-32 group hover:bg-[#eae6d5]"
            >
              <div className="text-3xl md:text-4xl font-serif font-bold text-vintage-ink mb-1 group-hover:scale-110 transition-transform">
                {char.character}
              </div>
              <div className="text-sm md:text-base font-mono text-vintage-ink/70">
                [{char.phonetic}]
              </div>
              
              {isCompleted && (
                <div className="vintage-stamp text-[10px] md:text-xs py-0.5 px-1 md:px-2 border-2 -rotate-12 absolute z-10 top-2 md:top-4 bg-vintage-paper shadow-sm">
                  PASSED
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
