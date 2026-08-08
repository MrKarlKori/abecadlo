import { useParams } from 'react-router-dom';
import { useLanguageData } from '../hooks/useLanguageData';
import { useProgress } from '../hooks/useProgress';
import { useExercisesProgress } from '../hooks/useExercisesProgress';
import { getLessonModules } from '../data/mockLessonsData';
import { Lock, Unlock, Plus, Minus, Check, Code } from 'lucide-react';
import clsx from 'clsx';
import { LanguageId } from '../types';

export function SettingsPage() {
  const { lang } = useParams();
  const langId = lang || LanguageId.BELARUSIAN;
  const modules = getLessonModules(langId);
  const { characters } = useLanguageData(langId);
  const { progress, toggleCompleted, completeAll, clearAllData } = useProgress(langId);
  const { progress: moduleProgress, setModuleSessions, unlockModule, resetProgress: resetModuleProgress } = useExercisesProgress(langId);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all letter & quiz progress? This cannot be undone.')) {
      clearAllData();
      resetModuleProgress();
    }
  };

  const handleCompleteAll = () => {
    completeAll(characters.map(c => c.id));
    modules.forEach(m => setModuleSessions(m.id, 10));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-wrap items-center justify-between border-b-2 border-vintage-ink pb-4 mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl">Settings & Progress</h1>
        <a 
          href="https://github.com/MrKarlKori/abecadlo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 border-2 border-vintage-ink bg-vintage-paper hover:bg-gray-100 shadow-[2px_2px_0_0_#2C2A29] transition-all cursor-pointer text-vintage-ink"
          title="View Source Code on GitHub"
        >
          <Code size={24} />
        </a>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={handleCompleteAll} className="vintage-button">
          Complete All Progress
        </button>
        <button onClick={handleClear} className="vintage-button bg-vintage-red hover:bg-red-800">
          Clear All Data
        </button>
      </div>

      {/* Lesson Modules Manual Override */}
      <div className="bg-[#eae6d5] p-6 border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29]">
        <h2 className="text-2xl mb-2 font-serif font-bold">Lesson Modules Progress Override</h2>
        <p className="font-mono text-sm mb-6 opacity-80">
          Manually adjust completed sessions (0 to 10) for each module. Reaching 10 sessions unlocks the next module.
        </p>

        <div className="space-y-4">
          {modules.map((module, idx) => {
            const isUnlocked = moduleProgress.unlockedModules.includes(module.id);
            const completedSessions = moduleProgress.moduleSessions[module.id] || 0;
            const isCompleted = completedSessions >= 10;

            return (
              <div 
                key={module.id} 
                className="bg-vintage-paper border-2 border-vintage-ink p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[2px_2px_0_0_#2C2A29]"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-vintage-ink/60">MODULE {idx + 1}</span>
                    {isUnlocked ? (
                      <span className="text-xs font-mono font-bold text-green-700 flex items-center gap-1">
                        <Unlock size={12} /> Unlocked
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-bold text-gray-500 flex items-center gap-1">
                        <Lock size={12} /> Locked
                      </span>
                    )}
                    {isCompleted && (
                      <span className="bg-vintage-gold text-vintage-ink font-mono text-[10px] font-bold px-1.5 py-0.5 border border-vintage-ink">
                        MASTERED (10/10)
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-vintage-ink">
                    {module.title}
                  </h3>
                  <p className="font-serif text-sm italic text-vintage-blue">
                    {module.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  {/* Sessions Stepper */}
                  <div className="flex items-center border-2 border-vintage-ink bg-white">
                    <button
                      onClick={() => setModuleSessions(module.id, completedSessions - 1)}
                      disabled={completedSessions <= 0}
                      className="p-2 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                      title="Decrease completed sessions"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-mono font-bold text-sm px-4 min-w-[5rem] text-center">
                      {completedSessions} / 10
                    </span>
                    <button
                      onClick={() => setModuleSessions(module.id, completedSessions + 1)}
                      disabled={completedSessions >= 10}
                      className="p-2 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                      title="Increase completed sessions"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => setModuleSessions(module.id, 10)}
                    disabled={isCompleted}
                    className={clsx(
                      "px-3 py-2 font-mono text-xs font-bold border-2 border-vintage-ink transition-all cursor-pointer flex items-center gap-1",
                      isCompleted 
                        ? "bg-gray-200 opacity-50 cursor-not-allowed" 
                        : "bg-vintage-gold hover:bg-[#d4a849] text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]"
                    )}
                  >
                    <Check size={14} /> Master (10/10)
                  </button>

                  {!isUnlocked && (
                    <button
                      onClick={() => unlockModule(module.id)}
                      className="px-3 py-2 font-mono text-xs font-bold border-2 border-vintage-ink bg-vintage-blue text-white hover:bg-blue-800 shadow-[2px_2px_0_0_#2C2A29] cursor-pointer"
                    >
                      Unlock
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Character Manual Override */}
      <div className="bg-[#eae6d5] p-6 border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29]">
        <h2 className="text-2xl mb-4 font-serif font-bold">Alphabet Manual Override Grid</h2>
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
                className={`w-12 h-12 flex items-center justify-center font-serif text-2xl border-2 border-vintage-ink font-bold transition-all cursor-pointer ${
                  isCompleted ? 'bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]' : 'bg-vintage-paper hover:bg-gray-100'
                }`}
              >
                {char.character}
              </button>
            );
          })}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-[#eae6d5] p-6 border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-serif font-bold text-vintage-ink text-center">About Abecadło</h2>
        <a 
          href="https://github.com/MrKarlKori/abecadlo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 font-mono font-bold text-sm px-4 py-2 border-2 border-vintage-ink bg-vintage-paper hover:bg-[#f4f1ea] shadow-[2px_2px_0_0_#2C2A29] transition-all cursor-pointer text-vintage-ink w-full sm:w-auto text-center"
        >
          <Code size={18} /> View Source Code on GitHub
        </a>
      </div>
    </div>
  );
}
