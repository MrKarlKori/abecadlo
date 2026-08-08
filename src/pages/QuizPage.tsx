import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguageData } from '../hooks/useLanguageData';
import { useProgress } from '../hooks/useProgress';
import { getQuestionDirectionHint, getScriptName } from '../utils/languageMap';
import { READING_DATA } from '../components/exercises/ReadingTrainer';
import type { ReadingItem } from '../components/exercises/ReadingTrainer';
import clsx from 'clsx';
import { XCircle, Award, BookOpen, PenTool } from 'lucide-react';
import { LanguageId } from '../types';

export type QuizType = 'alphabet' | 'practice';
export type QuizDirection = 'random' | 'eng-to-target' | 'target-to-eng';

interface UnifiedQuestion {
  type: 'target-to-english' | 'english-to-target';
  promptText: string;
  correctAnswer: string;
  options: string[];
}

const getPracticeHighScore = (langId: string): number => {
  try {
    const val = localStorage.getItem(`abecadlo_practice_quiz_highscore_${langId}`);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
};

const savePracticeHighScore = (langId: string, score: number) => {
  try {
    const key = `abecadlo_practice_quiz_highscore_${langId}`;
    const current = parseInt(localStorage.getItem(key) || '0', 10) || 0;
    if (score > current) {
      localStorage.setItem(key, score.toString());
    }
  } catch (e) {
    console.error(e);
  }
};

export function QuizPage() {
  const { lang } = useParams();
  const langId = (lang as LanguageId) || LanguageId.BELARUSIAN;
  const { characters: allCharacters, loading } = useLanguageData(langId);
  const characters = allCharacters.filter(c => !['Ъ', 'Ь'].includes(c.character));
  const { progress, updateQuizScore } = useProgress(langId);

  const [practiceHighScore, setPracticeHighScore] = useState(0);
  const [activeQuizType, setActiveQuizType] = useState<QuizType>('alphabet');
  const [direction, setDirection] = useState<QuizDirection>('random');

  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<'start' | 'playing' | 'finished'>('start');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    setPracticeHighScore(getPracticeHighScore(langId));
    setQuizState('start');
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  }, [langId]);

  // Generate 10 questions for Alphabet Quiz
  const generateAlphabetQuiz = () => {
    if (characters.length < 4) return;
    const newQuestions: UnifiedQuestion[] = [];

    for (let i = 0; i < 10; i++) {
      let type: 'target-to-english' | 'english-to-target';
      if (direction === 'random') {
        type = Math.random() > 0.5 ? 'target-to-english' : 'english-to-target';
      } else if (direction === 'eng-to-target') {
        type = 'english-to-target';
      } else {
        type = 'target-to-english';
      }

      const target = characters[Math.floor(Math.random() * characters.length)];
      const otherChars = characters.filter(c => c.id !== target.id);
      const wrongOptions = [...otherChars].sort(() => 0.5 - Math.random()).slice(0, 3);

      if (type === 'target-to-english') {
        const promptText = target.character;
        const correctAnswer = `[${target.phonetic}]`;
        const options = [target, ...wrongOptions]
          .sort(() => 0.5 - Math.random())
          .map(c => `[${c.phonetic}]`);
        newQuestions.push({ type, promptText, correctAnswer, options });
      } else {
        const promptText = `[${target.phonetic}]`;
        const correctAnswer = target.character;
        const options = [target, ...wrongOptions]
          .sort(() => 0.5 - Math.random())
          .map(c => c.character);
        newQuestions.push({ type, promptText, correctAnswer, options });
      }
    }

    setActiveQuizType('alphabet');
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setQuizState('playing');
    setSelectedAnswer(null);
  };

  // Generate 10 questions for Practice Mastery Quiz (random direction)
  const generatePracticeQuiz = () => {
    const langData = READING_DATA[langId] || READING_DATA[LanguageId.BELARUSIAN];
    const allPracticeItems = [...langData.easy, ...langData.medium, ...langData.hard];
    if (allPracticeItems.length < 4) return;

    const newQuestions: UnifiedQuestion[] = [];

    for (let i = 0; i < 10; i++) {
      const type: 'target-to-english' | 'english-to-target' = Math.random() > 0.5 ? 'target-to-english' : 'english-to-target';

      const target = allPracticeItems[Math.floor(Math.random() * allPracticeItems.length)];
      // Filter out items that have the exact same cyrillic or english translation as the target
      const otherItems = allPracticeItems.filter(item => 
        item.id !== target.id && 
        item.translation !== target.translation && 
        item.cyrillic.replace(/[-'’ ]/g, '') !== target.cyrillic.replace(/[-'’ ]/g, '')
      );
      
      // Deduplicate the remaining items so we don't get two identical wrong options
      const uniqueWrongItems = Array.from(new Map(otherItems.map(item => [item.translation, item])).values());
      const wrongOptions = [...uniqueWrongItems].sort(() => 0.5 - Math.random()).slice(0, 3);

      const targetCyrillic = target.cyrillic.replace(/[-'’ ]/g, '');

      if (type === 'target-to-english') {
        const promptText = targetCyrillic;
        const correctAnswer = target.translation;
        const options = [target, ...wrongOptions]
          .sort(() => 0.5 - Math.random())
          .map(item => item.translation);
        newQuestions.push({ type, promptText, correctAnswer, options });
      } else {
        const promptText = target.translation;
        const correctAnswer = targetCyrillic;
        const options = [target, ...wrongOptions]
          .sort(() => 0.5 - Math.random())
          .map(item => item.cyrillic.replace(/[-'’ ]/g, ''));
        newQuestions.push({ type, promptText, correctAnswer, options });
      }
    }

    setActiveQuizType('practice');
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setQuizState('playing');
    setSelectedAnswer(null);
  };

  const dropQuiz = () => {
    setQuizState('start');
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (currentIndex < 9) {
        setCurrentIndex(c => c + 1);
        setSelectedAnswer(null);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        if (activeQuizType === 'alphabet') {
          updateQuizScore(finalScore);
        } else {
          savePracticeHighScore(langId, finalScore);
          setPracticeHighScore(getPracticeHighScore(langId));
        }
        setQuizState('finished');
      }
    }, 1500);
  };

  const getFeedbackMessage = (finalScore: number) => {
    if (langId === 'be') {
      if (finalScore === 10) return "Flawless! You carry the torch of our awakening. The Belarusian word shines brightly!";
      if (finalScore >= 8) return "Splendid! Our heritage lives on through your dedication to the native tongue.";
      if (finalScore >= 5) return "Fair, but our young nation needs you to master the language of our ancestors.";
      return "Do not let the Belarusian word perish! Study harder for the sake of our motherland.";
    }
    
    if (langId === 'el') {
      if (finalScore === 10) return "By Zeus! You possess the wisdom of Athena and the brilliance of Apollo!";
      if (finalScore >= 8) return "Excellent! The Muses sing praises of your knowledge on Mount Olympus.";
      if (finalScore >= 5) return "Acceptable, mortal, but you must train harder to impress the gods.";
      return "By Hades! A cyclops could read better. Consult the Oracle and try again.";
    }

    // Default (Russian)
    if (finalScore === 10) return "Comrade! KGB level perfection!";
    if (finalScore >= 8) return "Excellent! The Party is pleased.";
    if (finalScore >= 5) return "Acceptable, but you must study harder for the motherland.";
    return "A bear in Siberia reads better. Try again.";
  };

  const scriptName = getScriptName(langId);

  if (loading) return <div className="text-center font-serif text-2xl mt-12 animate-pulse">Preparing Quizzes...</div>;
  if (characters.length < 4) return <div className="text-center">Not enough data to generate quiz.</div>;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b-2 border-vintage-ink pb-4 gap-4">
        <div>
          <h1 className="text-4xl text-vintage-ink m-0">Quizzes</h1>
          <p className="font-serif italic text-sm text-vintage-ink/70 mt-1">
            Test your {scriptName} alphabet and practice vocabulary mastery under exam evaluation.
          </p>
        </div>
        <div className="flex gap-4 font-mono text-xs font-bold text-vintage-red flex-wrap">
          <div className="bg-vintage-paper border border-vintage-ink px-3 py-1.5 flex items-center gap-1.5 shadow-[2px_2px_0_0_#2C2A29]">
            <Award size={14} /> Alphabet High: {progress.quizHighScore}/10
          </div>
          <div className="bg-vintage-paper border border-vintage-ink px-3 py-1.5 flex items-center gap-1.5 shadow-[2px_2px_0_0_#2C2A29]">
            <Award size={14} /> Practice High: {practiceHighScore}/10
          </div>
        </div>
      </div>

      {/* Main Quizzes Selection Dashboard (Single Quiz per Row) */}
      {quizState === 'start' && (
        <div className="flex flex-col gap-8">
          {/* Quiz 1: Alphabet Test */}
          <div className="vintage-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs font-bold text-vintage-ink/60 flex items-center gap-1">
                  <PenTool size={14} /> QUIZ 1
                </span>
                <span className="font-mono text-xs font-bold text-vintage-red">
                  High Score: {progress.quizHighScore}/10
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold uppercase tracking-wide text-vintage-ink mb-2">
                Alphabet Test
              </h2>
              <p className="font-serif text-sm text-vintage-ink/80 mb-6">
                Test your knowledge across 10 single {scriptName} alphabet letters and phonetic sounds.
              </p>

              {/* Direction Selector */}
              <div className="mb-6 bg-white p-4 border-2 border-vintage-ink shadow-[2px_2px_0_0_#2C2A29]">
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-vintage-ink/80 mb-2 text-center">
                  Direction of Translation
                </label>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDirection('random')}
                    className={clsx(
                      "flex-1 py-1.5 px-1 font-mono text-[11px] font-bold uppercase border-2 border-vintage-ink transition-all cursor-pointer text-center",
                      direction === 'random'
                        ? "bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]"
                        : "bg-white text-vintage-ink/70 hover:bg-gray-100"
                    )}
                  >
                    Random
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirection('eng-to-target')}
                    className={clsx(
                      "flex-1 py-1.5 px-1 font-mono text-[11px] font-bold uppercase border-2 border-vintage-ink transition-all cursor-pointer text-center",
                      direction === 'eng-to-target'
                        ? "bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]"
                        : "bg-white text-vintage-ink/70 hover:bg-gray-100"
                    )}
                  >
                    Eng → Cyr
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirection('target-to-eng')}
                    className={clsx(
                      "flex-1 py-1.5 px-1 font-mono text-[11px] font-bold uppercase border-2 border-vintage-ink transition-all cursor-pointer text-center",
                      direction === 'target-to-eng'
                        ? "bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]"
                        : "bg-white text-vintage-ink/70 hover:bg-gray-100"
                    )}
                  >
                    Cyr → Eng
                  </button>
                </div>
              </div>
            </div>

            <button onClick={generateAlphabetQuiz} className="vintage-button w-full text-lg">
              Start Alphabet Test
            </button>
          </div>

          {/* Quiz 2: Practice Mastery Test */}
          <div className="vintage-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs font-bold text-vintage-ink/60 flex items-center gap-1">
                  <BookOpen size={14} /> QUIZ 2
                </span>
                <span className="font-mono text-xs font-bold text-vintage-red">
                  High Score: {practiceHighScore}/10
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold uppercase tracking-wide text-vintage-ink mb-2">
                Practice Mastery Test
              </h2>
              <p className="font-serif text-sm text-vintage-ink/80 mb-6">
                Test your vocabulary mastery across random words and syllables from the practice suite.
              </p>
            </div>

            <button onClick={generatePracticeQuiz} className="vintage-button w-full text-lg">
              Start Practice Test
            </button>
          </div>
        </div>
      )}

      {/* Active Playing Mode */}
      {quizState === 'playing' && questions.length > 0 && (
        <div className="vintage-card p-8 relative">
          <div className="flex justify-between items-center font-mono text-sm mb-8 border-b border-vintage-ink/20 pb-3">
            <span className="font-bold">
              {activeQuizType === 'alphabet' ? 'Alphabet Quiz' : 'Practice Quiz'} &bull; Question {currentIndex + 1} of 10
            </span>
            <div className="flex items-center gap-4">
              <span>Score: {score}</span>
              <button
                onClick={dropQuiz}
                className="flex items-center gap-1 text-xs text-vintage-red hover:underline font-bold uppercase cursor-pointer"
                title="Drop Test and return to main menu"
              >
                <XCircle size={14} /> Drop Test
              </button>
            </div>
          </div>

          <div className="text-center mb-10">
            <h3 className="font-serif italic text-lg mb-4">
              {questions[currentIndex].type === 'target-to-english'
                ? 'Select the English translation / sound for:'
                : `Select the ${scriptName} word / letter for:`}
            </h3>

            <div className="text-5xl md:text-7xl font-serif font-bold text-vintage-ink p-6 md:p-8 border-2 border-vintage-ink inline-block bg-[#F9F6EE] shadow-[4px_4px_0_0_#2C2A29] select-none">
              {questions[currentIndex].promptText}
            </div>

            <div className="mt-4 font-mono text-xs text-vintage-ink/70 uppercase tracking-wider">
              {getQuestionDirectionHint(langId, questions[currentIndex].type)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {questions[currentIndex].options.map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              const isCorrectAnswer = questions[currentIndex].correctAnswer === opt;

              let btnClass = "vintage-button-secondary text-lg md:text-xl py-4 flex items-center justify-center cursor-pointer";
              if (selectedAnswer) {
                if (isCorrectAnswer) btnClass = "bg-green-600 text-white border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] px-4 py-4 font-serif font-bold text-lg md:text-xl";
                else if (isSelected) btnClass = "bg-vintage-red text-white border-2 border-vintage-ink shadow-[4px_4px_0_0_#2C2A29] px-4 py-4 font-serif font-bold text-lg md:text-xl";
                else btnClass = "vintage-button-secondary text-lg md:text-xl py-4 opacity-50";
              }

              return (
                <button
                  key={`${opt}-${idx}`}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(opt)}
                  className={btnClass}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Finished State */}
      {quizState === 'finished' && (
        <div className="vintage-card text-center p-12">
          <h2 className="text-4xl mb-2 text-vintage-red font-bold">Evaluation Complete</h2>
          <span className="font-mono text-xs font-bold text-vintage-ink/60 uppercase tracking-widest block mb-4">
            {activeQuizType === 'alphabet' ? 'Alphabet Test' : 'Practice Mastery Test'}
          </span>
          <div className="text-6xl font-serif my-6">{score}/10</div>
          <p className="font-mono text-lg mb-8 italic border-y-2 py-4 border-vintage-ink/20">
            "{getFeedbackMessage(score)}"
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={dropQuiz} className="vintage-button-secondary">
              Back to Quizzes
            </button>
            <button
              onClick={activeQuizType === 'alphabet' ? generateAlphabetQuiz : generatePracticeQuiz}
              className="vintage-button"
            >
              Re-take Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
