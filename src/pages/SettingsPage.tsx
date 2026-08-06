import { useParams } from 'react-router-dom';
import { useLanguageData } from '../hooks/useLanguageData';
import { useProgress } from '../hooks/useProgress';

export function SettingsPage() {
  const { lang } = useParams();
  const langId = lang || 'ru';
  const { characters } = useLanguageData(langId);
  const { progress, toggleCompleted, completeAll, clearAllData } = useProgress(langId);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
      clearAllData();
    }
  };

  const handleCompleteAll = () => {
    completeAll(characters.map(c => c.id));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl border-b-2 border-vintage-ink pb-4 mb-8">Settings & Progress</h1>
      
      <div className="flex gap-4 mb-8">
        <button onClick={handleCompleteAll} className="vintage-button">
          Complete All
        </button>
        <button onClick={handleClear} className="vintage-button bg-vintage-red hover:bg-red-800">
          Clear All Data
        </button>
      </div>
      
      <div className="bg-[#eae6d5] p-6 border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29]">
        <h2 className="text-2xl mb-4 font-serif">Manual Override Grid</h2>
        <p className="font-mono text-sm mb-6 opacity-70">
          Click any character below to toggle its completion state manually.
        </p>
        
        <div className="flex flex-wrap gap-2">
          {characters.map(char => {
            const isCompleted = progress.completedLetters.includes(char.id);
            return (
              <button
                key={char.id}
                onClick={() => toggleCompleted(char.id)}
                className={`w-12 h-12 flex items-center justify-center font-serif text-2xl border-2 border-vintage-ink font-bold transition-all ${
                  isCompleted ? 'bg-vintage-gold text-vintage-ink' : 'bg-vintage-paper hover:bg-gray-100'
                }`}
              >
                {char.character}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
