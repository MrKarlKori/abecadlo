import { useParams, useNavigate } from 'react-router-dom';
import { useLanguageData } from '../hooks/useLanguageData';
import { useProgress } from '../hooks/useProgress';
import { getLanguageName, getPassedStampText } from '../utils/languageMap';
import { LanguageId } from '../types';
import { GREEK_COMBINATIONS, LetterCombination } from '../data/greekCombinations';

function CombinationCard({ combo }: { combo: LetterCombination }) {
  const { lang } = useParams();
  const langId = lang || LanguageId.BELARUSIAN;
  const navigate = useNavigate();
  const { progress } = useProgress(langId);
  const isCompleted = progress.completedLetters.includes(combo.id);

  return (
    <button 
      onClick={() => navigate(`/${langId}/alphabet/${combo.id}`)}
      className="bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] p-4 relative flex flex-col items-center justify-center min-h-24 md:min-h-32 group hover:bg-[#eae6d5] cursor-pointer w-full transition-all duration-300"
    >
      <div className="text-3xl md:text-4xl font-serif font-bold text-vintage-ink mb-1 group-hover:scale-110 transition-transform">
        {combo.combination}
      </div>
      <div className="text-sm md:text-base font-mono text-vintage-ink/70 mt-1">
        [{combo.phonetic}]
      </div>
      
      {isCompleted && (
        <div className="vintage-stamp text-[10px] md:text-xs py-0.5 px-1 md:px-2 border-2 -rotate-12 absolute z-10 top-2 md:top-4 bg-vintage-paper shadow-sm">
          {getPassedStampText(langId)}
        </div>
      )}
    </button>
  );
}

export function AlphabetPage() {
  const { lang } = useParams();
  const langId = lang || LanguageId.BELARUSIAN;
  const { characters, loading, error, registryEntry } = useLanguageData(langId);
  const { progress } = useProgress(langId);
  const navigate = useNavigate();

  if (loading) return <div className="text-center font-serif text-2xl mt-12 animate-pulse">Loading Archive...</div>;
  if (error) return <div className="text-center font-serif text-vintage-red text-xl mt-12">{error}</div>;

  const langName = registryEntry?.name || getLanguageName(langId);
  const wikiUrl = langId === LanguageId.BELARUSIAN
    ? 'https://en.wikipedia.org/wiki/Belarusian_alphabet'
    : langId === LanguageId.GREEK
    ? 'https://en.wikipedia.org/wiki/Greek_alphabet'
    : 'https://en.wikipedia.org/wiki/Russian_alphabet';

  return (
    <div>
      <div className="flex flex-col items-center mb-8 border-b-2 border-vintage-ink pb-4">
        <h1 className="text-4xl md:text-5xl text-center uppercase tracking-widest">
          The {langName} Alphabet
        </h1>
        <a
          href={wikiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-vintage-blue hover:text-vintage-red underline font-serif font-bold text-sm md:text-base cursor-pointer transition-colors"
        >
          View {langName} Alphabet on Wikipedia &rarr;
        </a>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-4">
        {characters.map(char => {
          const isCompleted = progress.completedLetters.includes(char.id);
          
          return (
            <button
              key={char.id}
              onClick={() => navigate(`/${langId}/alphabet/${char.id}`)}
              className="bg-vintage-paper border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] p-4 relative flex flex-col items-center justify-center min-h-24 md:min-h-32 group hover:bg-[#eae6d5] cursor-pointer"
            >
              <div className="text-3xl md:text-4xl font-serif font-bold text-vintage-ink mb-1 group-hover:scale-110 transition-transform">
                {char.character}
              </div>
              <div className="text-sm md:text-base font-mono text-vintage-ink/70 mt-1">
                [{char.phonetic}]
              </div>
              
              {isCompleted && (
                <div className="vintage-stamp text-[10px] md:text-xs py-0.5 px-1 md:px-2 border-2 -rotate-12 absolute z-10 top-2 md:top-4 bg-vintage-paper shadow-sm">
                  {getPassedStampText(langId)}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {langId === LanguageId.GREEK && (
        <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col items-center mb-8 border-b-2 border-vintage-ink pb-4">
            <h2 className="text-3xl md:text-4xl text-center uppercase tracking-widest">
              Letter Combinations
            </h2>
            <p className="mt-2 text-center text-vintage-ink/80 max-w-2xl font-serif">
              Greek features special consonant and vowel combinations (diphthongs) that create unique sounds. Pay attention to these when reading!
            </p>
          </div>
          
          <div className="mb-12">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 text-vintage-ink flex items-center gap-2">
              <span className="w-8 h-0.5 bg-vintage-red inline-block"></span>
              Consonant Combinations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {GREEK_COMBINATIONS.filter(c => c.type === 'consonant').map(combo => (
                <CombinationCard key={combo.id} combo={combo} />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 text-vintage-ink flex items-center gap-2 mt-8">
              <span className="w-8 h-0.5 bg-vintage-red inline-block"></span>
              Vowel Combinations (Diphthongs)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {GREEK_COMBINATIONS.filter(c => c.type === 'vowel').map(combo => (
                <CombinationCard key={combo.id} combo={combo} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
